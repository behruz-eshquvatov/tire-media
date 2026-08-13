const fs = require('fs');

let css = fs.readFileSync('src/style.css', 'utf8');
const newCss = `
/* Direction Card Hover Animation */
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
}
`;
if (!css.includes('.direction-card::before')) {
    fs.appendFileSync('src/style.css', '\n' + newCss);
}

let js = fs.readFileSync('src/js/main.js', 'utf8');
const newJs = `
document.addEventListener('DOMContentLoaded', () => {
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
});
`;
if (!js.includes('.direction-card')) {
    fs.appendFileSync('src/js/main.js', '\n' + newJs);
}
console.log('Restored missing code');
