const fs = require('fs');

// 1. Update CSS
let css = fs.readFileSync('src/style.css', 'utf8');
const oldCssRegex = /\/\* Direction Card Hover Animation \*\/[\s\S]*?\.direction-card\.reverse:hover::before\s*\{[\s\S]*?\}/;
const newCss = `/* Direction Card Hover Animation */
.direction-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: 0;
  -webkit-clip-path: var(--clip, circle(0% at 0% 0%));
  clip-path: var(--clip, circle(0% at 0% 0%));
  transition: -webkit-clip-path 0.7s cubic-bezier(0.4, 0, 0.2, 1), clip-path 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

.direction-card.no-transition::before {
  transition: none !important;
}`;

if (oldCssRegex.test(css)) {
    css = css.replace(oldCssRegex, newCss);
} else {
    css += '\n' + newCss;
}
fs.writeFileSync('src/style.css', css, 'utf8');

// 2. Update JS
let js = fs.readFileSync('src/js/main.js', 'utf8');

// We need to replace the exact DOMContentLoaded block for direction-card.
// It's the last DOMContentLoaded block in main.js.
const oldJsRegex = /document\.addEventListener\('DOMContentLoaded',\s*\(\)\s*=>\s*\{\s*document\.querySelectorAll\('\.direction-card'\)[\s\S]*?\}\);\s*\}\);\s*\}\);/;

const newJs = `document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.direction-card').forEach(card => {
        const link = card.querySelector('.magnetic-link');
        let isReverse = false;
        
        card.addEventListener('mouseenter', () => {
            card.classList.add('no-transition');
            card.style.setProperty('--clip', isReverse ? 'circle(0% at 100% 100%)' : 'circle(0% at 0% 0%)');
            card.offsetHeight; // force reflow
            card.classList.remove('no-transition');
            card.style.setProperty('--clip', isReverse ? 'circle(150% at 100% 100%)' : 'circle(150% at 0% 0%)');
        });
        
        card.addEventListener('mousemove', (e) => {
            if (!link) return;
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const diffX = e.clientX - centerX;
            const diffY = e.clientY - centerY;
            
            const moveX = diffX * 0.25;
            const moveY = diffY * 0.25;
            
            link.style.transform = \`translate(\${moveX}px, \${moveY}px)\`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.add('no-transition');
            // Instant swap origin to opposite corner
            card.style.setProperty('--clip', isReverse ? 'circle(150% at 0% 0%)' : 'circle(150% at 100% 100%)');
            card.offsetHeight; // force reflow
            card.classList.remove('no-transition');
            // Shrink to that corner
            card.style.setProperty('--clip', isReverse ? 'circle(0% at 0% 0%)' : 'circle(0% at 100% 100%)');
            
            isReverse = !isReverse;
            
            if (link) {
                // Reset transform smoothly
                link.style.transform = 'translate(0px, 0px)';
            }
        });
    });
});`;

if (oldJsRegex.test(js)) {
    js = js.replace(oldJsRegex, newJs);
} else {
    // If regex fails, let's just use string replace on the known block
    const fallbackRegex = /document\.addEventListener\('DOMContentLoaded',\s*\(\)\s*=>\s*\{\s*document\.querySelectorAll\('\.direction-card'\)[\s\S]*?\n\}\);\n$/;
    if (fallbackRegex.test(js)) {
        js = js.replace(fallbackRegex, newJs + '\n');
    } else {
        console.log("Could not find JS block to replace!");
    }
}
fs.writeFileSync('src/js/main.js', js, 'utf8');

console.log("CSS and JS replaced.");
