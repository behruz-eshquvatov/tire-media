const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="border-t border-black\/20 pt-6 mb-10 lg:mb-\[80px\] flex flex-col lg:flex-row justify-between gap-6 lg:gap-12">[\s\S]*?<\/div>\s*<\/div>/;

const newTitleHtml = `
          <div class="mb-10 lg:mb-[80px] flex flex-col lg:flex-row justify-between gap-6 lg:gap-12">
              <div class="w-full lg:w-1/4">
                  <div class="border-t border-black/30 pt-3">
                      <p class="text-base lg:text-lg font-semibold text-black">Наши направления</p>
                  </div>
              </div>
              <div class="w-full lg:w-3/4">
                  <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-[56px] font-semibold leading-[1.1] max-w-4xl text-black">
                      Внедряем передовые <span class="italic font-normal text-gray-700">IT-продукты</span> и автоматизируем рутинные процессы вашего бизнеса
                  </h2>
              </div>
          </div>
`;

if (regex.test(html)) {
    html = html.replace(regex, newTitleHtml.trim());
    fs.writeFileSync('index.html', html, 'utf8');
    console.log("Updated title section in index.html");
} else {
    console.log("Could not find the title to replace.");
}
