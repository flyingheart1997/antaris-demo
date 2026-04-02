import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SVG_DIR = path.resolve(__dirname, 'svg');
const OUTPUT_DIR = path.resolve(__dirname, 'src');

/**
 * ICON BUILD ENGINE
 * 1. Optimizes SVGs using SVGO
 * 2. Converts SVGs to React Components using SVGR
 * 3. Generates index.ts exports
 */

async function build() {
    console.log('🎨 Building Icon Library...');

    // Clean output directory selectively to preserve index.css
    if (fs.existsSync(OUTPUT_DIR)) {
        console.log('🧹 Cleaning existing components (preserving index.css)...');
        const files = fs.readdirSync(OUTPUT_DIR);
        for (const file of files) {
            if (file !== 'index.css') {
                fs.rmSync(path.join(OUTPUT_DIR, file), { recursive: true, force: true });
            }
        }
    }
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    if (!fs.existsSync(SVG_DIR)) {
        console.error('❌ svg/ folder not found. Please add your SVG files there.');
        return;
    }

    // 1. Pre-process SVGs to strip hardcoded styles and colors
    console.log('🧹 Pre-processing SVGs (stripping hardcoded styles)...');
    try {
        const svgFiles = fs.readdirSync(SVG_DIR).filter(f => f.endsWith('.svg'));
        for (const file of svgFiles) {
            const filePath = path.join(SVG_DIR, file);
            let content = fs.readFileSync(filePath, 'utf8');

            // Strip style attributes entirely
            content = content.replace(/style="[^"]*"/g, '');
            // Strip display-p3 color attributes if they exist
            content = content.replace(/fill="color\(display-p3[^"]+"\)/g, '');

            fs.writeFileSync(filePath, content);
        }
    } catch (error) {
        console.error('⚠️ Pre-processing failed:', error.message);
    }

    // 2. Run SVGR
    console.log('🚜 Running SVGR transformation...');
    try {
        // Using npx for independence from node_modules/.bin path
        execSync(`npx @svgr/cli --out-dir "${OUTPUT_DIR}" --icon --typescript --ref --svg-props className="antaris-icon" --replace-attr-values "#000=currentColor" --replace-attr-values "black=currentColor" --replace-attr-values "#EEEEEE=currentColor" --replace-attr-values "#eee=currentColor" --replace-attr-values "#EEE=currentColor" "${SVG_DIR}"`, { stdio: 'inherit' });
    } catch (error) {
        console.error('❌ SVGR failed:', error.message);
        return;
    }

    // 3. Post-process: Rename components to include "Icon" suffix and generate index.ts
    console.log('🔧 Finalizing component naming and index generation...');
    try {
        const componentFiles = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.tsx'));
        const exports = [];

        for (const file of componentFiles) {
            const oldPath = path.join(OUTPUT_DIR, file);
            const componentName = file.replace('.tsx', '');
            
            // Handle name conversion from kebab-case or pascal-case to Icon suffix
            // SVGR usually generates PascalCase for the filename
            const newComponentName = componentName.endsWith('Icon') ? componentName : `${componentName}Icon`;
            const newFileName = `${newComponentName}.tsx`;
            const newPath = path.join(OUTPUT_DIR, newFileName);

            let content = fs.readFileSync(oldPath, 'utf8');

            // Replace component name in content
            content = content.replace(new RegExp(`Svg${componentName}`, 'g'), `Svg${newComponentName}`);
            content = content.replace(new RegExp(`${componentName}_default`, 'g'), `${newComponentName}_default`);
            
            if (content.includes(`ForwardRef = forwardRef(Svg${newComponentName})`)) {
                 content = content.replace(/const ForwardRef = forwardRef\(Svg[a-zA-Z0-0]+\)/, `const ${newComponentName} = forwardRef(Svg${newComponentName}) as any`);
                 content = content.replace('export default ForwardRef;', `export default ${newComponentName};`);
            }

            fs.writeFileSync(newPath, content);
            if (oldPath !== newPath) {
                fs.unlinkSync(oldPath);
            }
            exports.push(`export { default as ${newComponentName} } from "./src/${newComponentName}";`);
        }

        fs.writeFileSync(path.join(__dirname, 'index.ts'), exports.join('\n') + '\n');
    } catch (error) {
        console.error('❌ Post-processing failed:', error.message);
    }

    console.log(`✨ Icon library built successfully in ${path.relative(process.cwd(), OUTPUT_DIR)}`);
}

build().catch(console.error);
