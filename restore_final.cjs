const fs = require('fs');

const orig = fs.readFileSync('index_original.html', 'utf8');
const origLines = orig.split('\n');
const origGridIdx = origLines.findIndex(l => l.includes('gap-4 lg:gap-8') && l.includes('grid-cols-1'));
let origSectionEndIdx = -1;
for (let i = origGridIdx; i < origLines.length; i++) {
    if (origLines[i].includes('</section>')) {
        origSectionEndIdx = i;
        break;
    }
}
const origRest = origLines.slice(origSectionEndIdx + 1).join('\n');

const current = fs.readFileSync('index.html', 'utf8');
const currentLines = current.split('\n');
const currentGridIdx = currentLines.findIndex(l => l.includes('gap-4 lg:gap-8') && l.includes('grid-cols-1'));
console.log("Current grid idx:", currentGridIdx);
let currentSectionEndIdx = -1;
for (let i = currentGridIdx; i < currentLines.length; i++) {
    if (currentLines[i].includes('</section>')) {
        currentSectionEndIdx = i;
        break;
    }
}
console.log("Current section end idx:", currentSectionEndIdx);
const currentKeep = currentLines.slice(0, currentSectionEndIdx + 1).join('\n');

const newHtml = currentKeep + '\n' + origRest;
fs.writeFileSync('index.html', newHtml, 'utf8');
console.log("Restored index.html length:", newHtml.split('\n').length);
