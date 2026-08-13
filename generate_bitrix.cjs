const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const regex = /(<main class="">)([\s\S]*?)(<\/main>)/;

const bitrixMain = `
    <main class="pt-[100px] lg:pt-[150px]">
      <section class="prime-container px-4 lg:px-8 py-10 lg:py-20 flex flex-col xl:flex-row justify-between items-center gap-10">
        <div class="flex flex-col justify-center w-full xl:w-[60%] relative z-10">
          <h1 class="font-semibold leading-[1.1] text-4xl md:text-5xl lg:text-6xl 2xl:text-[76px] montserrat mb-6 text-left">
            Внедрение и настройка<br />
            <span class="italic font-normal">Битрикс24</span>
          </h1>
          <p class="max-w-xl text-lg lg:text-xl font-medium leading-[1.5] text-gray-800 mb-10">
            Оцифруйте ваши продажи, автоматизируйте бизнес-процессы и объедините команду в едином рабочем пространстве. Мы поможем вам раскрыть весь потенциал Битрикс24 для роста вашего бизнеса.
          </p>
          <button class="black-btn w-fit" data-popup="project">
            Заказать внедрение
          </button>
        </div>
        <div class="w-full xl:w-[40%] flex justify-center xl:justify-end">
          <img src="/main-assets/hero_image.png" alt="Битрикс24 Интеграция" class="w-full max-w-lg xl:max-w-2xl object-contain" />
        </div>
      </section>
    </main>
`;

if (regex.test(html)) {
    const bitrixHtml = html.replace(regex, `$1${bitrixMain}$3`);
    // update title and active links if needed, but not strictly necessary for a stub
    fs.writeFileSync('bitrix24.html', bitrixHtml, 'utf8');
    console.log("bitrix24.html created successfully.");
} else {
    console.log("Could not find main tag.");
}
