const fs = require('fs');

const htmlPath = 'C:\\Users\\user\\Desktop\\1C\\index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const regex = /(<div\s+class="mt-\[60px\] lg:mt-\[100px\] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8"\s*>)([\s\S]*?)(<\/section>\s*<section\s+id="faq")/i;

const match = html.match(regex);
if (match) {
  html = html.replace(regex, `$1\n            <!-- Пакеты загружаются динамически -->\n          </div>\n        </div>\n      $3`);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log("HTML successfully updated.");
} else {
  console.log("Could not find boundaries.");
}
