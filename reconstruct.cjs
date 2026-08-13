const fs = require('fs');
const orig = fs.readFileSync('index_original.html', 'utf8');
const lines = orig.split('\n');

const current = fs.readFileSync('index.html', 'utf8');

// Find the section close in original file that corresponds to directions
const directionsStartIdx = lines.findIndex(l => l.includes('class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8"'));
console.log("Directions start:", directionsStartIdx);

let directionsEndIdx = -1;
for (let i = directionsStartIdx; i < lines.length; i++) {
    if (lines[i].includes('</section>')) {
        directionsEndIdx = i;
        break;
    }
}
console.log("Directions end:", directionsEndIdx);

const cookiesIdx = lines.findIndex(l => l.includes('<!--  cookies-->'));
console.log("Cookies:", cookiesIdx);

// Extract the missing body
let missingBody = '';
if (directionsEndIdx !== -1 && cookiesIdx !== -1) {
    missingBody = lines.slice(directionsEndIdx + 1, cookiesIdx).join('\n') + '\n';
}

// Extract the original footer
const footerStartIdx = lines.findIndex(l => l.includes('<footer class="bg-black text-white text-sm">'));
const footerEndIdx = lines.findIndex(l => l.includes('</footer>'));
console.log("Footer:", footerStartIdx, footerEndIdx);
let origFooter = '';
if (footerStartIdx !== -1 && footerEndIdx !== -1) {
    origFooter = lines.slice(footerStartIdx, footerEndIdx + 1).join('\n');
}

// Update current index.html
let newCurrent = current;
// 1. Insert missingBody before cookies
if (missingBody) {
    // Current file has `</section>` and then `<!--  cookies-->`
    newCurrent = newCurrent.replace('<!--  cookies-->', missingBody + '<!--  cookies-->');
}

// 2. Replace current footer
if (origFooter) {
    newCurrent = newCurrent.replace(/<footer class="bg-black text-white text-sm">[\s\S]*?<\/footer>/, origFooter);
}

fs.writeFileSync('index.html', newCurrent, 'utf8');
console.log("Reconstructed index.html.");
