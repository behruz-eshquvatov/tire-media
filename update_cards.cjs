const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /(<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">)([\s\S]*?)(<\/section>\s*<!-- Задачи -->)/;

const newGridContent = `
              <a href="bitrix24.html" data-aos="fade-up" data-aos-duration="600" class="direction-card block aspect-square bg-[#F5F5F5] p-5 lg:p-6 flex flex-col group relative overflow-hidden">
                  <div class="direction-card-content relative z-10 h-full flex flex-col transition-colors duration-500 text-black group-hover:text-white">
                      <div class="flex justify-between items-start mb-3 lg:mb-4">
                          <p class="text-2xl lg:text-3xl font-semibold">Битрикс24</p>
                          <svg class="w-6 h-6 lg:w-8 lg:h-8 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10"></path></svg>
                      </div>
                      <p class="opacity-70 text-sm lg:text-base font-medium">Комплексное внедрение CRM, настройка бизнес-процессов и обучение сотрудников.</p>
                  </div>
              </a>
              <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="100" class="aspect-square bg-[#F5F5F5] p-5 lg:p-6 flex flex-col cursor-not-allowed opacity-60">
                  <div class="flex justify-between items-start mb-3 lg:mb-4">
                      <p class="text-2xl lg:text-3xl font-semibold text-gray-500">1С:Предприятие</p>
                  </div>
                  <p class="text-gray-500 text-sm font-medium">Синхронизация баз данных и настройка обмена с другими системами. (В разработке)</p>
              </div>
              <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="200" class="aspect-square bg-[#F5F5F5] p-5 lg:p-6 flex flex-col cursor-not-allowed opacity-60">
                  <div class="flex justify-between items-start mb-3 lg:mb-4">
                      <p class="text-2xl lg:text-3xl font-semibold text-gray-500">amoCRM</p>
                  </div>
                  <p class="text-gray-500 text-sm font-medium">Построение прозрачного отдела продаж и интеграция мессенджеров. (В разработке)</p>
              </div>
              <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="300" class="aspect-square bg-[#F5F5F5] p-5 lg:p-6 flex flex-col cursor-not-allowed opacity-60">
                  <div class="flex justify-between items-start mb-3 lg:mb-4">
                      <p class="text-2xl lg:text-3xl font-semibold text-gray-500">МойСклад</p>
                  </div>
                  <p class="text-gray-500 text-sm font-medium">Автоматизация складского учета и интеграция с маркетплейсами. (В разработке)</p>
              </div>
          </div>
      `;

if (regex.test(html)) {
    html = html.replace(regex, `$1${newGridContent}$3`);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log("HTML successfully updated.");
} else {
    console.log("Could not find boundaries.");
}
