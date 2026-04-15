/**
 * ANTARIS DESIGN TOKEN BUILD — Style Dictionary v4
 *
 * Replaces the custom styles/build.js script.
 * Source files (styles/figma/*.json) are unchanged — this config reads the
 * same Figma-exported DTCG tokens ($value / $type) and produces identical
 * outputs to the previous build:
 *
 *   styles/src/index.css           ← :root { CSS custom properties }
 *   styles/src/antaris-theme.css   ← Tailwind v4 @theme block
 *   styles/src/tokens.generated.ts ← typed JS object (Framer Motion etc.)
 *   styles/src/fonts.generated.tsx ← Next.js Google Font loader (via action)
 *
 * Run: node styles/sd.config.mjs
 */

import StyleDictionary from 'style-dictionary'
import fs from 'fs'
import path from 'path'

// ---------------------------------------------------------------------------
// 1. OKLCH COLOR MATH (same formulas as the old build.js)
// ---------------------------------------------------------------------------

function srgbToLinear(c) {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

function rgbToOklab(r, g, b) {
    const lR = srgbToLinear(r)
    const lG = srgbToLinear(g)
    const lB = srgbToLinear(b)
    const l = 0.4122214708 * lR + 0.5363325363 * lG + 0.0514459929 * lB
    const m = 0.2119034982 * lR + 0.6748334002 * lG + 0.1132631016 * lB
    const s = 0.0883024619 * lR + 0.2817188501 * lG + 0.6299787032 * lB
    const l_ = Math.cbrt(l)
    const m_ = Math.cbrt(m)
    const s_ = Math.cbrt(s)
    return {
        L: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720403 * s_,
        a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
        b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
    }
}

function figmaColorToOklch(colorObj) {
    if (!colorObj || typeof colorObj !== 'object' || !colorObj.components) return null
    const [r, g, b] = colorObj.components
    const { L, a: okA, b: okB } = rgbToOklab(r, g, b)
    const C = Math.sqrt(okA * okA + okB * okB)
    const H = (Math.atan2(okB, okA) * 180) / Math.PI
    const L_pct = (L * 100).toFixed(3)
    const C_val = C.toFixed(5)
    const H_val = H < 0 ? (H + 360).toFixed(3) : H.toFixed(3)
    return colorObj.alpha < 1
        ? `oklch(${L_pct}% ${C_val} ${H_val} / ${colorObj.alpha})`
        : `oklch(${L_pct}% ${C_val} ${H_val})`
}

// ---------------------------------------------------------------------------
// 2. HELPER: px → rem
// ---------------------------------------------------------------------------

const DIMENSION_TYPES = ['borderRadius', 'dimension', 'borderWidth', 'spacing', 'sizing']
const UNITLESS_KEYWORDS = ['opacity', 'font-weight', 'zIndex', 'line-height']

function isUnitless(name) {
    return UNITLESS_KEYWORDS.some(k => name.toLowerCase().includes(k))
}

function pxToRem(value) {
    const num = parseFloat(value)
    if (isNaN(num)) return value
    if (num > 1000) return '9999px'
    if (num === 0) return '0'
    return `${num / 16}rem`
}

// ---------------------------------------------------------------------------
// 3. REGISTER CUSTOM TRANSFORMS
// ---------------------------------------------------------------------------

// 3a. Color: Figma color object { hex, components, alpha } → oklch(...)
StyleDictionary.registerTransform({
    name: 'color/figma-oklch',
    type: 'value',
    filter: token => (token.$type ?? token.type) === 'color',
    transform: token => {
        const val = token.$value ?? token.value
        // Resolved value is already an OKLCH string (chained reference) — pass through
        if (typeof val === 'string') return val
        // Figma color object
        if (typeof val === 'object' && val !== null && val.components) {
            return figmaColorToOklch(val) ?? val
        }
        return val
    },
})

// 3b. Dimension / size: numeric px values → rem
StyleDictionary.registerTransform({
    name: 'size/figma-rem',
    type: 'value',
    filter: token => {
        const type = token.$type ?? token.type ?? ''
        return DIMENSION_TYPES.includes(type)
    },
    transform: token => {
        const val = token.$value ?? token.value
        if (isUnitless(token.name ?? '')) return val
        if (typeof val === 'number') return pxToRem(val)
        if (typeof val === 'string') {
            const n = parseFloat(val.trim())
            if (!isNaN(n) && String(n) === val.trim()) return pxToRem(n)
        }
        return val
    },
})

// 3c. Opacity: Figma stores 0-100; CSS expects 0-1
StyleDictionary.registerTransform({
    name: 'opacity/figma-decimal',
    type: 'value',
    filter: token => (token.$type ?? token.type) === 'opacity',
    transform: token => {
        const val = token.$value ?? token.value
        if (typeof val === 'number') return val > 1 ? (val / 100).toFixed(2) : val
        return val
    },
})

// 3d. Font family: wrap with CSS var fallback so Next.js font vars work
StyleDictionary.registerTransform({
    name: 'fontFamily/css-var-wrap',
    type: 'value',
    filter: token => (token.$type ?? token.type) === 'fontFamily' || token.name?.includes('font-family'),
    transform: token => {
        const val = token.$value ?? token.value
        if (typeof val !== 'string') return val
        const slug = val.toLowerCase().replace(/[\s./,]/g, '-')
        return `var(--font-${slug}, ${val})`
    },
})

// ---------------------------------------------------------------------------
// 4. REGISTER CUSTOM FORMAT: Tailwind v4 @theme block
// ---------------------------------------------------------------------------

StyleDictionary.registerFormat({
    name: 'css/tailwind-v4-theme',
    format: ({ dictionary }) => {
        const seen = new Set()
        let block = '@theme {\n'

        for (const token of dictionary.allTokens) {
            const name = token.name
            const cssVar = `var(--${name})`
            let themeKey = null

            if (/font-size/i.test(name)) {
                themeKey = `--text-${name.replace(/.*font-size-/i, '')}`
            } else if (/font-weight/i.test(name)) {
                themeKey = `--font-weight-${name.replace(/.*font-weight-/i, '')}`
            } else if (/font-family/i.test(name)) {
                themeKey = `--font-${name.replace(/.*font-family-/i, '')}`
            } else if (/line-height/i.test(name)) {
                themeKey = `--leading-${name.replace(/.*line-height-/i, '')}`
            } else if (/letter-spacing/i.test(name)) {
                themeKey = `--tracking-${name.replace(/.*letter-spacing-/i, '')}`
            } else if (/color/i.test(name)) {
                // Gradient tokens → background-image utilities
                const resolvedVal = token.value ?? ''
                if (typeof resolvedVal === 'string' && resolvedVal.includes('linear-gradient')) {
                    themeKey = `--background-image-${name.replace(/^color-/i, '')}`
                } else {
                    themeKey = `--color-${name.replace(/^color-/i, '')}`
                }
            } else if (/spacing|sizing|dim/i.test(name)) {
                const key = name.replace(/^(spacing|sizing|dim)-/i, '')
                if (key) themeKey = `--spacing-${key}`
            } else if (/radius/i.test(name)) {
                themeKey = `--radius-${name.replace(/^radius-/i, '')}`
            } else if (/opacity/i.test(name)) {
                themeKey = `--opacity-${name.replace(/^opacity-/i, '')}`
            } else if (/effects-bg_blur/i.test(name)) {
                themeKey = `--blur-${name.replace(/.*bg_blur-/i, '')}`
            }

            if (themeKey && !seen.has(themeKey)) {
                block += `  ${themeKey}: ${cssVar};\n`
                seen.add(themeKey)
            }
        }

        block += '}\n'
        return block
    },
})

// ---------------------------------------------------------------------------
// 5. REGISTER ACTION: Generate fonts.generated.tsx
//    (Re-implements the font generation logic from old build.js as an SD action)
// ---------------------------------------------------------------------------

const FONT_COMPAT = {
    mono: { isStatic: true, safeWeights: [400, 500, 700] },
    variable: { isVariable: true },
    default: { isStatic: true, safeWeights: [300, 400, 500, 700] },
}

StyleDictionary.registerAction({
    name: 'generate-fonts-tsx',
    do: (dictionary) => {
        const families = new Set()
        const globalWeights = new Set()

        for (const token of dictionary.allTokens) {
            if (token.name.includes('font-family') && typeof token.value === 'string') {
                // Extract raw family name (strip the CSS var wrapper if present)
                const match = token.value.match(/var\(.*?,\s*(.+?)\)/)
                families.add(match ? match[1].trim() : token.value)
            }
            if (token.name.includes('font-weight') && !isNaN(parseInt(token.value))) {
                globalWeights.add(parseInt(token.value))
            }
        }

        const familyList = Array.from(families)
        const weightList = Array.from(globalWeights).sort((a, b) => a - b)

        let content = `import { ${familyList.map(f => f.replace(/\s+/g, '_')).join(', ')} } from 'next/font/google';\n\n`

        for (const family of familyList) {
            const varName = family.toLowerCase().replace(/\s+/g, '')
            const importName = family.replace(/\s+/g, '_')
            const lower = family.toLowerCase()

            const isVariable = lower.includes('grotesk') || lower.includes('montserrat') || lower.includes('inter')
            const isMono = lower.includes('mono')
            const strategy = isVariable ? FONT_COMPAT.variable : isMono ? FONT_COMPAT.mono : FONT_COMPAT.default

            let weightValue
            if (strategy.isVariable) {
                weightValue = "'variable'"
            } else {
                const safe = weightList.filter(w => strategy.safeWeights.includes(w))
                weightValue = JSON.stringify(safe.map(String))
            }

            content += `const ${varName} = ${importName}({\n  subsets: ['latin'],\n  variable: '--font-${lower.replace(/\s+/g, '-')}',\n  weight: ${weightValue},\n});\n\n`
        }

        content += `export const fonts = {\n${familyList.map(f => {
            const varName = f.toLowerCase().replace(/\s+/g, '')
            return `  ${varName}: ${varName}.variable,\n`
        }).join('')}};\n`

        fs.mkdirSync('styles/src', { recursive: true })
        fs.writeFileSync(path.join('styles/src', 'fonts.generated.tsx'), content)
        console.log('✅  fonts.generated.tsx written')
    },
    undo: () => {},
})

// ---------------------------------------------------------------------------
// 6. INJECT MANUAL TOKEN (separator gradient — same as old build.js)
// ---------------------------------------------------------------------------

const SEPARATOR_GRADIENT =
    'linear-gradient(270deg, rgba(240, 240, 240, 0.10) 0%, rgba(240, 240, 240, 0.40) 50%, rgba(240, 240, 240, 0.10) 100%)'

// ---------------------------------------------------------------------------
// 7. STYLE DICTIONARY CONFIG
// ---------------------------------------------------------------------------

const TRANSFORMS = [
    'name/kebab',         // SD built-in: path → kebab-case CSS var name
    'color/figma-oklch',  // Figma color object → oklch(...)
    'size/figma-rem',     // px numbers → rem
    'opacity/figma-decimal', // 0-100 → 0-1
    'fontFamily/css-var-wrap',
]

const sd = new StyleDictionary({
    usesDtcg: true, // Read $value / $type (W3C DTCG format, same as Figma Tokens)

    source: [
        'styles/figma/global.tokens.json',
        'styles/figma/semantic.tokens.json',
    ],

    // Inject the persistent manual token that doesn't come from Figma
    preprocessors: [],
    hooks: {
        preprocessors: {
            'inject-manual-tokens': {
                preprocessor: (dictionary) => {
                    // Add the separator gradient token to the raw dictionary
                    if (!dictionary.color) dictionary.color = {}
                    if (!dictionary.color.stroke) dictionary.color.stroke = {}
                    dictionary.color.stroke.separator = {
                        $value: SEPARATOR_GRADIENT,
                        $type: 'color',
                    }
                    return dictionary
                },
            },
        },
    },

    platforms: {
        // Platform A: :root { --token-name: value; }
        css: {
            transforms: TRANSFORMS,
            buildPath: 'styles/src/',
            files: [
                {
                    destination: 'index.css',
                    format: 'css/variables',
                    options: {
                        selector: ':root',
                        outputReferences: false, // fully resolved values (no var() references)
                    },
                },
            ],
        },

        // Platform B: @theme { --tailwind-key: var(--token-name); }
        tailwind: {
            transforms: TRANSFORMS,
            buildPath: 'styles/src/',
            files: [
                {
                    destination: 'antaris-theme.css',
                    format: 'css/tailwind-v4-theme',
                },
            ],
        },

        // Platform C: export const tokens = { ... } as const  (TypeScript)
        typescript: {
            transforms: TRANSFORMS,
            buildPath: 'styles/src/',
            files: [
                {
                    destination: 'tokens.generated.ts',
                    format: 'javascript/es6',
                },
            ],
        },

        // Platform D: Generate fonts.generated.tsx via registered action
        fonts: {
            transforms: TRANSFORMS,
            buildPath: 'styles/src/',
            files: [], // no file output — handled entirely by the action
            actions: ['generate-fonts-tsx'],
        },
    },
})

await sd.buildAllPlatforms()
console.log('✨  Style Dictionary build complete — styles/src/ updated')
