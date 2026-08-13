const fs = require('fs');

const jsContent = `
document.addEventListener('DOMContentLoaded', () => {
    const packagesGrid = document.getElementById('packages-grid');
    if (!packagesGrid) return;

    // Имитация получения данных с сервера
    const fetchPackages = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { title: 'Базовая настройка CRM', description: 'Быстрый старт для небольших компаний: настройка структуры, подключение каналов связи и базовой CRM.', price: 'от 30 000 ₽', delay: 0 },
                    { title: 'Оптимальная автоматизация', description: 'Для компаний с выстроенным отделом продаж: воронки продаж, роботы, автоматизация рутины и соцсети.', price: 'от 60 000 ₽', delay: 250 },
                    { title: 'Интеграция с 1С', description: 'Синхронизация контрагентов, товаров и заказов. Двусторонний обмен данными между Битрикс24 и вашей 1С.', price: 'от 50 000 ₽', delay: 500 },
                    { title: 'Комплексная разработка', description: 'Полная автоматизация крупных бизнесов: нестандартные бизнес-процессы, смарт-процессы и доработки через REST API.', price: 'от 120 000 ₽', delay: 0 },
                    { title: 'Техническое сопровождение', description: 'Гарантийная поддержка, регулярное резервное копирование, приоритетное решение инцидентов и доработки по SLA.', price: 'от 25 000 ₽', delay: 250 }
                ]);
            }, 500);
        });
    };

    fetchPackages().then(packages => {
        packagesGrid.innerHTML = packages.map(pkg => \`
            <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="\${pkg.delay}" class="aspect-square bg-[#E0E0E0] relative group overflow-hidden p-5 lg:p-6 flex flex-col justify-between col-span-1">
                <img src="/Vector(Stroke).png" class="z-[1] absolute indent-0 group-hover:opacity-100 opacity-0 duration-300 -top-60" alt="" />
                <div class="z-[2]">
                    <p class="lg:text-[22px] font-semibold mb-3">\${pkg.title}</p>
                    <p class="text-[#696969] text-base lg:text-lg font-medium">\${pkg.description}</p>
                </div>
                <div class="z-[2]">
                    <p class="lg:mb-10 mb-5 text-3xl lg:text-4xl font-semibold">\${pkg.price}</p>
                    <div class="flex gap-2">
                        <button data-popup="project" class="p-3 lg:p-5 border text-white rounded-full grow border-black hover:bg-transparent hover:text-black duration-300 text-sm xl:text-base font-[600] bg-black">Оставить заявку</button>
                        <button data-popup="project" class="text-center p-3 lg:p-5 border rounded-full grow border-black duration-300 text-sm xl:text-base font-[600] hover:bg-black hover:text-white">Подробнее</button>
                    </div>
                </div>
            </div>
        \`).join('');
        
        // Re-attach popup listeners for new buttons
        const openPopup = () => {
            const popupWrapper = document.getElementById('project-popup-wrapper');
            const popup = document.getElementById('project-popup');
            const overlay = document.getElementById('project-overlay');
            const header = document.querySelector('.sticky-header');

            popupWrapper.classList.remove('hidden');
            header?.classList.add('header-static');
            setTimeout(() => {
                popup.classList.remove('translate-x-full');
                overlay.classList.remove('opacity-0');
            }, 10);
        };
        document.querySelectorAll('#packages-grid [data-popup="project"]').forEach(btn => {
            btn.addEventListener('click', openPopup);
        });
    });
});
`;

fs.appendFileSync('C:\\\\Users\\\\user\\\\Desktop\\\\1C\\\\src\\\\js\\\\main.js', jsContent, 'utf8');
console.log('JS appended successfully.');
