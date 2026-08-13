const fs = require('fs');

// Update index.html
let html = fs.readFileSync('index.html', 'utf8');

const regex = /(<div class="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto delay-100">)([\s\S]*?)(<\/div>)/;

const newLinkHtml = `
                      <a href="bitrix24.html" class="magnetic-link text-white text-lg lg:text-xl font-medium flex items-center gap-2 hover:opacity-80 transition-transform duration-75 ease-out">
                          Перейти
                          <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10"></path></svg>
                      </a>
`;

if (regex.test(html)) {
    html = html.replace(regex, `$1${newLinkHtml}$3`);
    fs.writeFileSync('index.html', html, 'utf8');
}

// Update main.js
let js = fs.readFileSync('src/js/main.js', 'utf8');

// Find the previously added JS and replace it
const jsRegex = /document\.addEventListener\('DOMContentLoaded', \(\) => \{\s*document\.querySelectorAll\('\.direction-card'\)\.forEach\(card => \{\s*card\.addEventListener\('mouseleave', \(\) => \{\s*card\.classList\.toggle\('reverse'\);\s*\}\);\s*\}\);\s*\}\);/;

const newJs = `
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.direction-card').forEach(card => {
        const link = card.querySelector('.magnetic-link');
        
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
            card.classList.toggle('reverse');
            if (link) {
                // Reset transform smoothly
                link.style.transform = 'translate(0px, 0px)';
            }
        });
    });
});
`;

if (jsRegex.test(js)) {
    js = js.replace(jsRegex, newJs);
} else {
    js += '\n' + newJs;
}

fs.writeFileSync('src/js/main.js', js, 'utf8');
console.log("Updated HTML and JS.");
