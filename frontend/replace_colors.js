const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function replaceColors(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceColors(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            
            if (content.includes('purple')) {
                content = content.replace(/purple/g, 'rose');
                modified = true;
            }
            if (content.includes('pink')) {
                content = content.replace(/pink/g, 'orange');
                modified = true;
            }
            
            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    });
}

replaceColors(directoryPath);
console.log('Color replacement complete!');
