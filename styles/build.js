import fs from 'fs';
import path from 'path';

/**
 * PROJECT DESIGN TOKEN BUILD SYSTEM
 */

const INPUT_DIR = 'styles/figma';
const OUTPUT_DIR = 'styles/src';

// --- COLOR CONVERSION (OKLCH) ---
function srgbToLinear(c) {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function rgbToOklab(r, g, b) {
    const lR = srgbToLinear(r);
    const lG = srgbToLinear(g);
    const lB = srgbToLinear(b);
    const l = 0.4122214708 * lR + 0.5363325363 * lG + 0.0514459929 * lB;
    const m = 0.2119034982 * lR + 0.6748334002 * lG + 0.1132631016 * lB;
    const s = 0.0883024619 * lR + 0.2817188501 * lG + 0.6299787032 * lB;
    const l_ = Math.cbrt(l);
    const m_ = Math.cbrt(m);
    const s_ = Math.cbrt(s);
    return {
        L: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720403 * s_,
        a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
        b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
    };
}

function formatOklch(color) {
    if (!color || typeof color !== 'object' || !color.components) return color;
    const [r, g, b] = color.components;
    const { L, a: okA, b: okB } = rgbToOklab(r, g, b);
    const C = Math.sqrt(okA * okA + okB * okB);
    const H = (Math.atan2(okB, okA) * 180) / Math.PI;
    const L_pct = (L * 100).toFixed(3);
    const C_val = C.toFixed(5);
    const H_val = H < 0 ? (H + 360).toFixed(3) : H.toFixed(3);
    return color.alpha < 1
        ? `oklch(${L_pct}% ${C_val} ${H_val} / ${color.alpha})`
        : `oklch(${L_pct}% ${C_val} ${H_val})`;
}

// --- UNIT CONVERSION ---
const toRem = (px) => `${px / 16}rem`;

function isUnitless(path) {
    const unitlessKeywords = ['opacity', 'font-weight', 'zIndex', 'line-height'];
    return unitlessKeywords.some(keyword => path.toLowerCase().includes(keyword.toLowerCase()));
}

function sanitizeName(name) {
    return name.replace(/[\.\/,\s]/g, '-');
}

function resolveValue(token, path, allFlattened) {
    const val = token.$value;
    const type = token.$type;

    if (val === null || val === undefined) return null;

    // Handle Figma Ref Style: {color.blue.500}
    if (typeof val === 'string' && val.startsWith('{') && val.endsWith('}')) {
        const refPath = val.slice(1, -1).replace(/\./g, '-').replace(/,/g, '-');
        return allFlattened[refPath] || val;
    }

    if (type === 'color' && typeof val === 'object' && val.hex) {
        return formatOklch(val);
    }

    if (typeof val === 'number') {
        if (path.toLowerCase().includes('opacity')) {
            // Convert Figma 0-100 to CSS 0-1
            return val > 1 ? (val / 100).toFixed(2) : val;
        }
        if (isUnitless(path)) return val;
        if (type === 'dimension' || type === 'number') {
            if (val > 1000) return '9999px';
            if (val === 0) return '0';
            return toRem(val);
        }
    }
    return val;
}

function flatten(obj, path = '', result = {}) {
    for (const key in obj) {
        if (key.startsWith('$')) continue;
        const currentPath = path ? `${path}-${key}` : key;
        const node = obj[key];
        if (node && typeof node === 'object' && ('$value' in node)) {
            result[sanitizeName(currentPath)] = node;
        } else if (node && typeof node === 'object') {
            flatten(node, currentPath, result);
        }
    }
    return result;
}

function setNested(obj, path, value) {
    if (!path) return;
    const parts = path.split('-');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part] || typeof current[part] !== 'object') {
            const oldValue = current[part];
            current[part] = oldValue ? { 'DEFAULT': oldValue } : {};
        }
        current = current[part];
    }
    const lastPart = parts[parts.length - 1];
    if (typeof current[lastPart] === 'object' && current[lastPart] !== null) {
        current[lastPart]['DEFAULT'] = value;
    } else {
        current[lastPart] = value;
    }
}

async function build() {
    console.log('🏗️  Building Design Tokens (Expert Mode)...');

    // 1. Load Source Files
    const globalRaw = JSON.parse(fs.readFileSync(path.join(INPUT_DIR, 'global.tokens.json'), 'utf8'));
    const semanticRaw = JSON.parse(fs.readFileSync(path.join(INPUT_DIR, 'semantic.tokens.json'), 'utf8'));

    // 2. Flatten for Resolution
    const globalFlat = flatten(globalRaw);
    const semanticFlat = flatten(semanticRaw);
    const allFlat = { ...globalFlat, ...semanticFlat };

    // 3. Resolve actual values
    const allResolvedFlat = {};
    for (const [name, token] of Object.entries(allFlat)) {
        allResolvedFlat[name] = resolveValue(token, name, allResolvedFlat);
    }
    // Inject persistent manual tokens
    const separatorGradient = 'linear-gradient(270deg, rgba(240, 240, 240, 0.10) 0%, rgba(240, 240, 240, 0.40) 50%, rgba(240, 240, 240, 0.10) 100%)';
    allFlat['color-stroke-separator'] = { $value: separatorGradient, $type: 'color' };
    allResolvedFlat['color-stroke-separator'] = separatorGradient;
    
    // Deep resolution for aliases
    for (let i = 0; i < 2; i++) {
        for (const [name, token] of Object.entries(allFlat)) {
            allResolvedFlat[name] = resolveValue(token, name, allResolvedFlat);
        }
    }

    // 4. Generate CSS Variables
    let cssVars = ':root {\n';
    for (const [name, val] of Object.entries(allResolvedFlat)) {
        if (val !== null) {
            let finalVal = val;
            if (name.includes('font-family')) {
                const slug = val.toString().toLowerCase().replace(/[\s\./,]/g, '-');
                finalVal = `var(--font-${slug}, ${val})`;
            }
            cssVars += `  --${name}: ${finalVal};\n`;
        }
    }
    cssVars += '}\n';

    // 5. Build Tailwind 4 @theme block
    let themeVars = '@theme {\n';
    const seenThemeKeys = new Set();

    for (const name of Object.keys(allFlat)) {
        const cssVar = `var(--${name})`;
        let themeKey = null;

        if (/font-size/i.test(name)) {
            themeKey = `--text-${name.replace(/.*font-size-/i, '')}`;
        } else if (/font-weight/i.test(name)) {
            themeKey = `--font-weight-${name.replace(/.*font-weight-/i, '')}`;
        } else if (/font-family/i.test(name)) {
            themeKey = `--font-${name.replace(/.*font-family-/i, '')}`;
        } else if (/line-height/i.test(name)) {
            themeKey = `--leading-${name.replace(/.*line-height-/i, '')}`;
        } else if (/letter-spacing/i.test(name)) {
            themeKey = `--tracking-${name.replace(/.*letter-spacing-/i, '')}`;
        } else if (/color/i.test(name)) {
            const val = allResolvedFlat[name];
            if (val && val.includes('linear-gradient')) {
                themeKey = `--background-image-${name.replace(/^color-/i, '')}`;
            } else {
                themeKey = `--color-${name.replace(/^color-/i, '')}`;
            }
        } else if (/spacing/i.test(name) || /sizing/i.test(name) || /dim/i.test(name)) {
            const key = name.replace(/^(spacing|sizing|dim)-/i, '');
            if (key) themeKey = `--spacing-${key}`;
        } else if (/radius/i.test(name)) {
            themeKey = `--radius-${name.replace(/^radius-/i, '')}`;
        } else if (/opacity/i.test(name)) {
            themeKey = `--opacity-${name.replace(/^opacity-/i, '')}`;
        } else if (/effects-bg_blur/i.test(name)) {
            themeKey = `--blur-${name.replace(/.*bg_blur-/i, '')}`;
        }

        if (themeKey && !seenThemeKeys.has(themeKey)) {
            themeVars += `  ${themeKey}: ${cssVar};\n`;
            seenThemeKeys.add(themeKey);
        }
    }
    themeVars += '}\n';

    // 6. Generate fonts.generated.tsx (Professional Registry-Based Font Loader)
    const FONT_COMPATIBILITY_MAP = {
        // Registry for optimized font loading strategies
        'mono': {
            isStatic: true,
            safeWeights: [400, 500, 700]
        },
        'variable': {
            isVariable: true,
            axes: ['wght']
        },
        'default': {
            isStatic: true,
            safeWeights: [300, 400, 500, 700]
        }
    };

    const families = new Set();
    const globalWeights = new Set();

    Object.entries(allResolvedFlat).forEach(([name, val]) => {
        if (name.includes('font-family') && typeof val === 'string') families.add(val);
        if (name.includes('font-weight') && !isNaN(parseInt(val))) globalWeights.add(parseInt(val));
    });

    const familyList = Array.from(families);
    
    let fontsContent = `import { ${familyList.map(f => f.replace(/\s+/g, '_')).join(', ')} } from 'next/font/google';\n\n`;
    
    familyList.forEach(f => {
        const varName = f.toLowerCase().replace(/\s+/g, '');
        const importName = f.replace(/\s+/g, '_');
        const familyLower = f.toLowerCase();

        // Determine Strategy: Variable vs Static
        // Most modern fonts (Space Grotesk, Montserrat) are variable
        const isVariable = familyLower.includes('grotesk') || familyLower.includes('montserrat') || familyLower.includes('inter');
        const isMono = familyLower.includes('mono');

        const strategy = isVariable ? FONT_COMPATIBILITY_MAP.variable : 
                         isMono ? FONT_COMPATIBILITY_MAP.mono : 
                         FONT_COMPATIBILITY_MAP.default;

        let weightValue;
        if (strategy.isVariable) {
            weightValue = "'variable'";
        } else {
            const weights = Array.from(globalWeights)
                .sort((a, b) => a - b)
                .filter(w => strategy.safeWeights.includes(w));
            weightValue = JSON.stringify(weights.map(String));
        }

        fontsContent += `const ${varName} = ${importName}({\n  subsets: ['latin'],\n  variable: '--font-${f.toLowerCase().replace(/\s+/g, '-')}',\n  weight: ${weightValue},\n});\n\n`;
    });

    fontsContent += `export const fonts = {\n${familyList.map(f => {
        const varName = f.toLowerCase().replace(/\s+/g, '');
        const keyName = f.toLowerCase().replace(/\s+/g, '');
        return `  ${keyName}: ${varName}.variable,\n`;
    }).join('')}};\n`;

    fs.writeFileSync(path.join(OUTPUT_DIR, 'fonts.generated.tsx'), fontsContent);

    // 7. Output Generation
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.css'), cssVars);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'antaris-theme.css'), themeVars);

    // Generate TS for React (Framer Motion, etc.)
    const tokensExport = {};
    for (const [name, val] of Object.entries(allResolvedFlat)) {
        setNested(tokensExport, name, val);
    }
    const genContent = `export const tokens = ${JSON.stringify(tokensExport, null, 2).replace(/"/g, "'")} as const;\n\nexport type DesignTokens = typeof tokens;\n`;
    fs.writeFileSync(path.join(OUTPUT_DIR, 'tokens.generated.ts'), genContent);

    // 7. DEEP CLEAN: Remove legacy/unused files
    const filesToDelete = [
        'tailwind.tokens.ts',
        'tailwind.tokens.js',
        'tailwind.tokens.config.js',
        'tokens.generated.js'
    ];

    filesToDelete.forEach(file => {
        const fullPath = path.join(OUTPUT_DIR, file);
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            console.log(`🧹 Deleted legacy file: ${file}`);
        }
    });

    console.log(`✨ Build Complete! Expert architecture ready in: ${path.join(process.cwd(), OUTPUT_DIR)}`);
}

build().catch(console.error);
