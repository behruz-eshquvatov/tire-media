const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace the old simple title:
// <p class="text-left indent-0 text-black big-text mb-10 lg:mb-[60px]">Наши направления</p>
const oldTitleRegex = /<p class="text-left indent-0 text-black big-text mb-10 lg:mb-\[60px\]">Наши направления<\/p>/;

const newTitleHtml = `
          <div class="border-t border-black/20 pt-6 mb-10 lg:mb-[80px] flex flex-col lg:flex-row justify-between gap-6 lg:gap-12">
              <div class="w-full lg:w-1/4">
                  <p class="text-sm lg:text-base uppercase tracking-wider font-semibold text-gray-500">Наши направления</p>
              </div>
              <div class="w-full lg:w-3/4">
                  <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-[56px] font-semibold leading-[1.1] max-w-4xl">
                      Внедряем передовые IT-продукты и автоматизируем рутинные процессы вашего бизнеса
                  </h2>
              </div>
          </div>
`;

if (oldTitleRegex.test(html)) {
    html = html.replace(oldTitleRegex, newTitleHtml.trim());
    fs.writeFileSync('index.html', html, 'utf8');
    console.log("Updated title section in index.html");
} else {
    console.log("Could not find the title to replace.");
}
