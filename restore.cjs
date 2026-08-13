const fs = require('fs');

const current = fs.readFileSync('index.html', 'utf8');
const orig = fs.readFileSync('index_original.html', 'utf8');

// The original file probably had everything up to `</section>` of Directions, 
// then `<!-- Задачи -->`, then many sections, then `<footer ...>` with Middle Section.

// Let's extract the part that's missing from `index_original.html`.
// The missing part starts from `<!-- Задачи -->` down to `<!--  cookies-->`
const missingBodyMatch = orig.match(/(<!-- Задачи -->[\s\S]*?)<!--\s*cookies-->/);
const missingBody = missingBodyMatch ? missingBodyMatch[1] : '';

// Also, the footer middle section was deleted?
// Let's see original footer
const origFooterMatch = orig.match(/(<footer class="bg-black text-white text-sm">[\s\S]*?<\/footer>)/);
const origFooter = origFooterMatch ? origFooterMatch[1] : '';

// My current index.html:
// I need to insert `missingBody` right before `<!--  cookies-->`
let newHtml = current;
if (missingBody) {
    newHtml = newHtml.replace('<!--  cookies-->', missingBody + '<!--  cookies-->');
}

// And replace my broken footer with original footer
if (origFooter) {
    newHtml = newHtml.replace(/<footer class="bg-black text-white text-sm">[\s\S]*?<\/footer>/, origFooter);
}

fs.writeFileSync('index.html', newHtml, 'utf8');
console.log('Restored missing sections and footer.');
