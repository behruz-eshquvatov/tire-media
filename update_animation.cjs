const fs = require('fs');

let css = fs.readFileSync('src/style.css', 'utf8');

// Replace the old direction-card CSS
const oldCssRegex = /\/\* Direction Card Hover Animation \*\/[\s\S]*?clip-path: circle\(150% at 0% 0%\);\s*\}/;

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
  /* Default: top-left */
  -webkit-clip-path: circle(0% at 0% 0%);
  clip-path: circle(0% at 0% 0%);
  transition: -webkit-clip-path 0.7s cubic-bezier(0.4, 0, 0.2, 1), clip-path 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

.direction-card:hover::before {
  -webkit-clip-path: circle(150% at 0% 0%);
  clip-path: circle(150% at 0% 0%);
}

.direction-card.reverse::before {
  /* Reversed: bottom-right */
  -webkit-clip-path: circle(0% at 100% 100%);
  clip-path: circle(0% at 100% 100%);
}

.direction-card.reverse:hover::before {
  -webkit-clip-path: circle(150% at 100% 100%);
  clip-path: circle(150% at 100% 100%);
}`;

if (oldCssRegex.test(css)) {
    css = css.replace(oldCssRegex, newCss);
} else {
    css += '\n' + newCss;
}

fs.writeFileSync('src/style.css', css, 'utf8');

// Append JS to main.js
const jsAppend = `
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.direction-card').forEach(card => {
        card.addEventListener('mouseleave', () => {
            card.classList.toggle('reverse');
        });
    });
});
`;

fs.appendFileSync('src/js/main.js', jsAppend, 'utf8');
console.log("CSS and JS updated.");
