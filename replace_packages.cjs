const fs = require('fs');

const htmlPath = 'C:\\Users\\user\\Desktop\\1C\\index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const startStr = `<div
            class="mt-[60px] lg:mt-[100px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8"
          >`;
const endStr = `          </div>
        </div>
      </section>
      <section
        id="faq"`;

const startIndex = html.indexOf(startStr);
const endIndex = html.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
  const newHtml = html.substring(0, startIndex) + `<div
            id="packages-grid"
            class="mt-[60px] lg:mt-[100px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8"
          >
            <!-- Пакеты загружаются динамически -->
` + html.substring(endIndex);
  fs.writeFileSync(htmlPath, newHtml, 'utf8');
  console.log("HTML successfully updated.");
} else {
  console.log("Could not find boundaries.");
}
