const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /(<div\s+id="project-popup-success")([\s\S]*?)(<button class="black-btn w-fit" data-popup="project">)/;

const replacement = `$1
          class="h-screen overflow-hidden -mt-20 hidden justify-center items-center"
        >
          <div class="text-center">
            <p class="lg:mb-5 font-semibold text-xl mb-3 lg:text-[40px]">
              Заявка офомлена успешно!
            </p>
            <p class="font-medium leading-[1.4] text-20 mb-10">
              В ближайшее время наш менеджер свяжется с вами.
            </p>
            <button type="submit" class="black-btn">Хорошо</button>
          </div>
        </div>
      </div>
    </div>

    <main class="">
      <!-- Hero Section -->
      <section
        id="hero"
        class="w-full mt prime-container pt-10 first-screen px-4 lg:px-8 flex flex-col xl:flex-row justify-between items-center gap-10 relative"
      >
        <div class="flex flex-col justify-center w-full xl:w-[60%] relative z-10">
          <h1 class="font-semibold leading-[1.1] text-4xl md:text-5xl lg:text-6xl 2xl:text-[76px] montserrat mb-6 text-left">
            Комплексная интеграция<br />
            и автоматизация<br />
            <span class="italic font-normal">бизнес-процессов</span>
          </h1>
          <p class="max-w-xl text-lg lg:text-xl font-medium leading-[1.5] text-gray-800 mb-10">
            Внедряем передовые IT-решения для вашего бизнеса. Повышаем эффективность, автоматизируем рутину и объединяем все инструменты в единую экосистему.
          </p>
          $3`;

html = html.replace(regex, replacement);
fs.writeFileSync('index.html', html, 'utf8');
