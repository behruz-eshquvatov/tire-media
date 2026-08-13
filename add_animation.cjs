const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldHtml = `<a href="bitrix24.html" data-aos="fade-up" data-aos-duration="600" class="block aspect-square bg-[#F5F5F5] p-5 lg:p-6 hover:bg-black hover:text-white transition-colors duration-300 flex flex-col justify-between group">
                  <p class="text-2xl lg:text-3xl font-semibold">Битрикс24</p>
                  <p class="opacity-70 group-hover:opacity-100 transition-opacity">Подробнее &rarr;</p>
              </a>`;

const newHtml = `<a href="bitrix24.html" data-aos="fade-up" data-aos-duration="600" class="direction-card block aspect-square bg-[#F5F5F5] p-5 lg:p-6 flex flex-col justify-between group relative overflow-hidden">
                  <div class="direction-card-content relative z-10 h-full flex flex-col justify-between transition-colors duration-500 text-black group-hover:text-white">
                      <p class="text-2xl lg:text-3xl font-semibold">Битрикс24</p>
                      <p class="opacity-70 group-hover:opacity-100 transition-opacity">Подробнее &rarr;</p>
                  </div>
              </a>`;

html = html.replace(oldHtml, newHtml);
fs.writeFileSync('index.html', html, 'utf8');

let css = fs.readFileSync('src/style.css', 'utf8');
const newCss = `

/* Direction Card Hover Animation */
.direction-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: 0;
  -webkit-clip-path: circle(0% at 100% 100%);
  clip-path: circle(0% at 100% 100%);
  transition: -webkit-clip-path 0.7s cubic-bezier(0.4, 0, 0.2, 1), clip-path 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

.direction-card:hover::before {
  -webkit-clip-path: circle(150% at 0% 0%);
  clip-path: circle(150% at 0% 0%);
}
`;

if (!css.includes('.direction-card::before')) {
    fs.appendFileSync('src/style.css', newCss, 'utf8');
}
