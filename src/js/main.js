import Swiper from 'swiper';
import { Navigation, Pagination,Autoplay } from 'swiper/modules';

import 'swiper/css';
// import 'swiper/css/navigation';
import 'swiper/css/pagination';

Swiper.use([Navigation, Pagination]);

import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { Fancybox } from '@fancyapps/ui';
import AOS from 'aos';
import 'aos/dist/aos.css';
// Enable autoplay module
Swiper.use([Autoplay]);
document.addEventListener('DOMContentLoaded', () => {
    const marquees = [];

    document.querySelectorAll('.marquee-swiper').forEach(swiperEl => {
        const swiper = new Swiper(swiperEl, {
            slidesPerView: 'auto',
            spaceBetween: 64,
            speed: 4000,
            loop: true,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
            },
            freeMode: true,
            freeModeMomentum: false,
            allowTouchMove: false,
            grabCursor: false,
        });

        marquees.push({ el: swiperEl, swiper, visible: false });
    });

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                const target = marquees.find(m => m.el === entry.target);
                if (!target) return;

                target.visible = entry.isIntersecting;

                if (entry.isIntersecting && document.visibilityState === 'visible') {
                    target.swiper.autoplay?.start();
                } else {
                    target.swiper.autoplay?.stop();
                }
            });
        },
        { threshold: 0.1 }
    );

    marquees.forEach(m => observer.observe(m.el));

    document.addEventListener('visibilitychange', () => {
        const isVisible = document.visibilityState === 'visible';
        marquees.forEach(({ swiper, visible }) => {
            if (isVisible && visible) {
                setTimeout(() => swiper.autoplay?.start(), 100);
            } else {
                swiper.autoplay?.stop();
            }
        });
    });
});


// HEADER STARTS
document.addEventListener('DOMContentLoaded', () => {
    const popupWrapper = document.getElementById('project-popup-wrapper');
    const popup = document.getElementById('project-popup');
    const overlay = document.getElementById('project-overlay');
    const header = document.querySelector('.sticky-header');

    const openPopup = () => {
        popupWrapper.classList.remove('hidden');
        header?.classList.add('header-static');
        setTimeout(() => {
            popup.classList.remove('translate-x-full');
            overlay.classList.remove('opacity-0');
        }, 10);
    };

    const closePopup = () => {
        header?.classList.remove('header-static');
        popup.classList.add('translate-x-full');
        overlay.classList.add('opacity-0');
        setTimeout(() => {
            popupWrapper.classList.add('hidden');
        }, 300);
    };

    // вњ… All open buttons
    document.querySelectorAll('[data-popup="project"]').forEach(btn => {
        btn.addEventListener('click', openPopup);
    });

    // вќЊ Remove this single button logic
    // const openBtn = document.getElementById('open-project-popup');
    // openBtn?.addEventListener('click', openPopup);

    document.getElementById('project-close')?.addEventListener('click', closePopup);
    overlay?.addEventListener('click', closePopup);

    // Sections
    const formSection = document.querySelector('#project-popup form');
    const errorSection = document.getElementById('project-popup-error');
    const successSection = document.getElementById('project-popup-success');
    const submitBtn = document.getElementById('project-submit');

    const showSection = (sectionToShow) => {
        [formSection, errorSection, successSection].forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('flex');
        });

        sectionToShow.classList.remove('hidden');
        if (sectionToShow === errorSection || sectionToShow === successSection) {
            sectionToShow.classList.add('flex');
        }
    };

//     submitBtn?.addEventListener('click', (e) => {
//         e.preventDefault();
// 
//         const nameInput = formSection.querySelector('input[placeholder="РРІР°РЅРѕРІ РРІР°РЅ"]');
//         const contactInput = formSection.querySelector('input[placeholder="РџРѕС‡С‚Р°, С‚РµР»РµС„РѕРЅ РёР»Рё РјРµСЃСЃРµРЅРґР¶РµСЂ"]');
//         const projectTextarea = formSection.querySelector('textarea');
//         const consentCheckbox = formSection.querySelector('#project-consent');
// 
//         [nameInput, contactInput, projectTextarea].forEach(el => el.classList.remove('border-red-500'));
//         consentCheckbox.classList.remove('outline-red-500', 'ring-2', 'ring-red-500');
// 
//         let hasError = false;
// 
//         if (!nameInput.value.trim()) {
//             nameInput.classList.add('border-red-500');
//             hasError = true;
//         }
//         if (!contactInput.value.trim()) {
//             contactInput.classList.add('border-red-500');
//             hasError = true;
//         }
//         if (!projectTextarea.value.trim()) {
//             projectTextarea.classList.add('border-red-500');
//             hasError = true;
//         }
//         if (!consentCheckbox.checked) {
//             consentCheckbox.classList.add('outline-red-500', 'ring-2', 'ring-red-500');
//             hasError = true;
//         }
// 
//         if (hasError) return;
// 
//         // Simulate submission
//         const isSuccess = Math.random() > 0.3;
// 
//         nameInput.value = '';
//         contactInput.value = '';
//         projectTextarea.value = '';
//         consentCheckbox.checked = false;
// 
//         showSection(isSuccess ? successSection : errorSection);
//     });

    errorSection?.querySelector('button')?.addEventListener('click', () => {
        showSection(formSection);
    });

    successSection?.querySelector('button')?.addEventListener('click', () => {
        closePopup();
        showSection(formSection);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('menu-toggle');
    const menuWrapper = document.getElementById('mobile-menu-wrapper');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('menu-overlay');
    const menuText = document.getElementById('menu-text');
    const menuIcon = document.getElementById('menu-icon');

    let isOpen = false;

    const openMenu = () => {
        menuWrapper.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.classList.remove('translate-x-full');
            overlay.classList.remove('opacity-0');
        }, 10);

        menuText.textContent = 'Р—Р°РєСЂС‹С‚СЊ';
        menuIcon.src = '/main-assets/Close.svg'; // РёР»Рё Р·Р°РјРµРЅРёС‚Рµ РЅР° РїРѕРґС…РѕРґСЏС‰СѓСЋ РёРєРѕРЅРєСѓ
        isOpen = true;
    };

    const closeMenu = () => {
        mobileMenu.classList.add('translate-x-full');
        overlay.classList.add('opacity-0');
        setTimeout(() => {
            menuWrapper.classList.add('hidden');
        }, 300);

        menuText.textContent = 'РњРµРЅСЋ';
        menuIcon.src = '/main-assets/Menu.svg';
        isOpen = false;
    };

    toggleBtn.addEventListener('click', () => {
        isOpen ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);
});
const header = document.querySelector('.sticky-header');
let lastScroll = window.scrollY;
let isPopupOpen = false; // <== РќРѕРІС‹Р№ С„Р»Р°Рі

function handleHeaderScroll() {
    const currentScroll = window.scrollY;
    const isDesktop = window.innerWidth >= 1280;

    if (isPopupOpen) return; // <== РџСЂРё РѕС‚РєСЂС‹С‚РѕРј РїРѕРїР°РїРµ вЂ” РЅРёС‡РµРіРѕ РЅРµ РґРµР»Р°РµРј

    if (isDesktop) {
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
            header.style.backgroundColor = 'white';
        }
    } else {
        header.style.transform = 'none';
    }

    lastScroll = currentScroll;
}

window.addEventListener('scroll', handleHeaderScroll);
window.addEventListener('resize', handleHeaderScroll);

// DROPDOWN
const dropdowns = document.querySelectorAll('.dropdown-wrapper');

dropdowns.forEach(wrapper => {
    const content = wrapper.querySelector('.dropdown-content');

    wrapper.addEventListener('mouseenter', () => {
        // Р—Р°РєСЂС‹РІР°РµРј РІСЃРµ, РєСЂРѕРјРµ С‚РµРєСѓС‰РµРіРѕ
        dropdowns.forEach(w => {
            if (w !== wrapper) {
                w.classList.remove('open');
                w.querySelector('.dropdown-content').classList.remove('opacity-100', 'visible');
                w.querySelector('.dropdown-content').classList.add('opacity-0', 'invisible');
            }
        });

        wrapper.classList.add('open');
        content.classList.remove('opacity-0', 'invisible');
        content.classList.add('opacity-100', 'visible');
    });

    wrapper.addEventListener('mouseleave', () => {
        wrapper.classList.remove('open');
        content.classList.remove('opacity-100', 'visible');
        content.classList.add('opacity-0', 'invisible');
    });
});

// вќЊ РЈРґР°Р»СЏРµРј РєР»РёРє РІРЅРµ, С‚.Рє. С‚РµРїРµСЂСЊ РІСЃС‘ РЅР° hover
// document.addEventListener('click', ...);

//HEADER ENDS


// BLOG STARTS
const blogSwiper = new Swiper('.blog-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1280: {
            slidesPerView: 3,
        },
    },
    loop: false,
});
// BLOG ENDS
// CASES STARTS
document.querySelectorAll('.hover-part').forEach(card => {
    const floatingBtn = card.querySelector('.floating-btn');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        floatingBtn.style.left = `${x}px`;
        floatingBtn.style.top = `${y}px`;
    });

    card.addEventListener('mouseenter', () => {
        floatingBtn.classList.remove('opacity-0');
        floatingBtn.classList.add('opacity-100');
    });

    card.addEventListener('mouseleave', () => {
        floatingBtn.classList.add('opacity-0');
        floatingBtn.classList.remove('opacity-100');
    });
});
// CASES ENDS


// CONTACTS STARTS
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form.contacts');

    forms.forEach(form => {
        const successPopup = document.getElementById('audit-success');
        const errorPopup = document.getElementById('audit-error');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = form.querySelector('input[placeholder*="РРІР°РЅРѕРІ РРІР°РЅ"]').value.trim();
            const contact = form.querySelector('input[placeholder*="РџРѕС‡С‚Р°"]').value.trim();
            const description = form.querySelector('textarea').value.trim();
            const consent = form.querySelector('#consent').checked;

            const directions = [...form.querySelectorAll('button[type="button"]')];
            const hasDirections = directions.length > 0;
            const isDirectionSelected = hasDirections
                ? directions.some(btn => btn.classList.contains('bg-black'))
                : true; // if no directions, skip validation

            const isValid = name && contact && description && consent && isDirectionSelected;

            if (!isValid) {
                if (errorPopup) errorPopup.classList.remove('hidden');
                return;
            }

            // РћС‡РёСЃС‚РєР° С„РѕСЂРјС‹
            form.reset();
            if (hasDirections) {
                directions.forEach(btn => btn.classList.remove('bg-black', 'text-white'));
            }

            if (successPopup) successPopup.classList.remove('hidden');
        });

        // РџСЂРё РєР»РёРєРµ РїРѕ РєРЅРѕРїРєРµ РІС‹Р±РѕСЂР° РЅР°РїСЂР°РІР»РµРЅРёСЏ вЂ” РІС‹РґРµР»СЏРµРј РµС‘
        form.querySelectorAll('button[type="button"]').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('bg-black');
                btn.classList.toggle('text-white');
            });
        });
    });
});
// CONTACTS ENDS

// FOOTER STARTS
document.querySelectorAll('[data-dropdown]').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const icon = toggle.querySelector('img');

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.style.transform = 'rotate(0deg)';
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            icon.style.transform = 'rotate(180deg)';
        }
    });
});
// FOOTER ENDS


// AOS ANIMATIONS STARTS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init();
});
// AOS ANIMATIONS ENDS


// USERS РћРўР—Р«Р’Рђ STARTS
new Swiper('.testimonial-swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
        el: '.testimonial-swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
// USERS РћРўР—Р«Р’Рђ ENDS

// Taiwlind Slider/TEAM STARTS
const sliders = document.querySelectorAll('.overflow-x-auto');
document.addEventListener('DOMContentLoaded', function() {
    const teamSwiper = new Swiper('.teamSwiper', {
        slidesPerView: 'auto',
        centeredSlides: false,
        spaceBetween: 24,
        grabCursor: true,
        resistance: true,
        resistanceRatio: 0.5,
        breakpoints: {
            // When window width is >= 768px
            768: {
                enabled: false // Disable swiper on desktop
            }
        },
        // Custom effect for partial visibility
        on: {
            init: function() {
                this.slides.forEach(slide => {
                    if (!slide.classList.contains('swiper-slide-active') &&
                        !slide.classList.contains('swiper-slide-next') &&
                        !slide.classList.contains('swiper-slide-prev')) {
                    }
                });
            },
            slideChange: function() {
                this.slides.forEach(slide => {
                    if (!slide.classList.contains('swiper-slide-active') &&
                        !slide.classList.contains('swiper-slide-next') &&
                        !slide.classList.contains('swiper-slide-prev')) {
                    } else {
                        slide.style.opacity = '1';
                        slide.style.transform = 'scale(1)';
                    }
                });
            }
        }
    });

    // Re-init swiper if window is resized from mobile to desktop and vice versa
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && teamSwiper.enabled) {
            teamSwiper.disable();
        } else if (window.innerWidth < 768 && !teamSwiper.enabled) {
            teamSwiper.enable();
        }
    });
});
// Taiwlind Slider/TEAM ENDS

// PDF SLIDER STARTS
Fancybox.bind('[data-fancybox="testimonials"]', {
    animated: true,
    showClass: "fancybox-zoomIn",
    hideClass: "fancybox-zoomOut",
    dragToClose: false,
    Thumbs: false,
    Toolbar: {
        display: ["close"],
    },
});
// PDF SLIDER ENDS

//DROPDOWN STARTS
    document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.closest('div').nextElementSibling;
        const isOpen = content.classList.contains('max-h-[2000px]');

        if (isOpen) {
            content.classList.remove('max-h-[2000px]');
            content.classList.add('max-h-0');
            btn.textContent = '+';
        } else {
            content.classList.remove('max-h-0');
            content.classList.add('max-h-[2000px]');
            btn.textContent = 'в€’';
        }
    });
});
//DROPDOWN STARTS


// awars logic
const awards = document.querySelectorAll(".awards");
awards.forEach((award) => {
    const btn = award.querySelector(".show-more-awards"); // <-- fixed here
    const hiddenAwards = award.querySelectorAll(".hidden-awards");

    btn.addEventListener("click", () => {
        const isHidden = hiddenAwards[0].classList.contains("hidden");

        hiddenAwards.forEach((item) => {
            item.classList.toggle("hidden");
        });

        btn.textContent = isHidden ? "РЎРєСЂС‹С‚СЊ РЅР°РіСЂР°РґС‹" : "Р’СЃРµ РЅР°РіСЂР°РґС‹";
    });
});

// Slider for blog article
const track = document.querySelector('#slider-tracks');

if (track) {
    const total = track.children.length;
    const counter = document.getElementById('counter');
    let current = 0;

    function updateSlider() {
        track.style.transform = `translateX(-${current * 100}%)`;
        counter.innerHTML = `<span class="text-black">${current + 1}</span> / ${total}`;
    }

    document.getElementById('prev-btn').onclick = () => {
        console.log(true)
        current = (current - 1 + total) % total;
        updateSlider();
    };
    document.getElementById('next-btn').onclick = () => {
        current = (current + 1) % total;
        updateSlider();
    };

    updateSlider();
}


document.addEventListener('DOMContentLoaded', ()=>{

//Vacancies popup
// Popup logic
    const popupWrapper = document.getElementById("vacancy-popup-wrapper");
    if (!popupWrapper) return;

    const overlay = document.getElementById("vacancy-overlay");
    const popup = document.getElementById("vacancy-popup");
    const openButtons = document.querySelectorAll(".toggle-content .open-btn");
    const closeBtn = document.getElementById("vacancy-close");

    const form = document.querySelector("#vacancy-popup form");
    const success = document.getElementById("vacancy-popup-success");
    const error = document.getElementById("vacancy-popup-error");

    const nameInput = form.querySelector('input[placeholder*="РРІР°РЅРѕРІ РРІР°РЅ"]');
    const contactInput = form.querySelector('input[placeholder*="РџРѕС‡С‚Р°"]');
    const textInput = form.querySelector('textarea');
    const fileInput = form.querySelector('input[type="file"]');
    const checkInput = document.getElementById("vacancy-consent");
    const fileNameDisplay = document.getElementById("file-name");
    const fileLabel = document.getElementById("file-upload-label");


    fileInput.addEventListener("change", () => {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            fileNameDisplay.textContent = `Р’С‹ РІС‹Р±СЂР°Р»Рё С„Р°Р№Р»: ${file.name.slice(0, 15)}....`;
        } else {
            fileNameDisplay.textContent = "";
        }
    });


// Open popup
    openButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            popupWrapper.classList.remove("hidden");
            setTimeout(() => {
                overlay.classList.add("opacity-100");
                popup.classList.remove("translate-x-full");
            }, 10);
        });
    });

// Close popup function
    function closePopup() {
        overlay.classList.remove("opacity-100");
        popup.classList.add("translate-x-full");
        setTimeout(() => {
            popupWrapper.classList.add("hidden");
            resetPopup();
        }, 300);
    }

// Reset form and popup states
    function resetPopup() {
        form.classList.remove("hidden");
        success.classList.add("hidden");
        error.classList.add("hidden");
        form.reset();

        [nameInput, contactInput, textInput].forEach((el) =>
            el.classList.remove("border-red-500")
        );
        checkInput.classList.remove("ring-2", "ring-red-500");
    }

// Close on background or close button
    overlay.addEventListener("click", closePopup);
    closeBtn.addEventListener("click", closePopup);

// Submit with validation
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let hasError = false;

        if (fileInput.files.length === 0) {
            fileLabel.classList.add("border-red-500", "text-red-500");
            hasError = true;
        } else {
            fileLabel.classList.remove("border-red-500", "text-red-500");
        }

        // Validate Name
        if (nameInput.value.trim() === "") {
            nameInput.classList.add("border-red-500");
            hasError = true;
        } else {
            nameInput.classList.remove("border-red-500");
        }

        // Validate Contact
        if (contactInput.value.trim() === "") {
            contactInput.classList.add("border-red-500");
            hasError = true;
        } else {
            contactInput.classList.remove("border-red-500");
        }

        // Validate "Рћ СЃРµР±Рµ"
        if (textInput.value.trim() === "") {
            textInput.classList.add("border-red-500");
            hasError = true;
        } else {
            textInput.classList.remove("border-red-500");
        }

        // Validate consent checkbox
        if (!checkInput.checked) {
            checkInput.classList.add("ring-2", "ring-red-500");
            hasError = true;
        } else {
            checkInput.classList.remove("ring-2", "ring-red-500");
        }

        // Optional: validate file
        if (fileInput.files.length === 0) {
            fileInput.classList.add("border-red-500");
            hasError = true;
        } else {
            fileInput.classList.remove("border-red-500");
        }

        if (hasError) return;

        // Simulate success or failure
        const simulateSuccess = true;

        form.classList.add("hidden");

        if (simulateSuccess) {
            success.classList.remove("hidden");
        } else {
            error.classList.remove("hidden");
        }
    });

// Buttons in success or error popup
    document
        .querySelectorAll("#vacancy-popup-success button, #vacancy-popup-error button")
        .forEach((btn) => {
            btn.addEventListener("click", () => {
                const isRetry = btn.textContent.includes("РџРѕРІС‚РѕСЂРёС‚СЊ");

                if (isRetry) {
                    // Show form again
                    success.classList.add("hidden");
                    error.classList.add("hidden");
                    form.classList.remove("hidden");
                } else {
                    // Close entire popup
                    closePopup();
                }
            });
        });
})




// Cookies
const cookiesPopup = document.getElementById("cookies");
const acceptBtn = document.getElementById("cookie-accept");

// Show only if not already accepted
if (cookiesPopup && localStorage.getItem("cookiesAccepted") !== "true") {
    // Show popup with animation after delay
    setTimeout(() => {
        cookiesPopup.classList.remove("translate-y-full", "opacity-0");
        cookiesPopup.classList.add("translate-y-0", "opacity-100");
    }, 1000);

    // Hide popup on accept
    acceptBtn?.addEventListener("click", () => {
        cookiesPopup.classList.remove("translate-y-0", "opacity-100");
        cookiesPopup.classList.add("translate-y-full", "opacity-0");

        localStorage.setItem("cookiesAccepted", "true");
    });
} else if (cookiesPopup) {
    cookiesPopup.style.display = "none"; // optional: hide completely
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.direction-card').forEach(card => {
        const link = card.querySelector('.magnetic-link');
        let isReverse = false;
        
        card.addEventListener('mouseenter', () => {
            card.classList.add('no-transition');
            card.style.setProperty('--clip', isReverse ? 'circle(0% at 100% 100%)' : 'circle(0% at 0% 0%)');
            card.offsetHeight; // force reflow
            card.classList.remove('no-transition');
            card.style.setProperty('--clip', isReverse ? 'circle(150% at 100% 100%)' : 'circle(150% at 0% 0%)');
        });
        
        card.addEventListener('mousemove', (e) => {
            if (!link) return;
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const diffX = e.clientX - centerX;
            const diffY = e.clientY - centerY;
            
            const moveX = diffX * 0.25;
            const moveY = diffY * 0.25;
            
            link.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.add('no-transition');
            // Instant swap origin to opposite corner
            card.style.setProperty('--clip', isReverse ? 'circle(150% at 0% 0%)' : 'circle(150% at 100% 100%)');
            card.offsetHeight; // force reflow
            card.classList.remove('no-transition');
            // Shrink to that corner
            card.style.setProperty('--clip', isReverse ? 'circle(0% at 0% 0%)' : 'circle(0% at 100% 100%)');
            
            isReverse = !isReverse;
            
            if (link) {
                // Reset transform smoothly
                link.style.transform = 'translate(0px, 0px)';
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
  // Slider next button
  const sliderContainer = document.getElementById("slider-container");
  const sliderNext = document.getElementById("slider-next");
  if (sliderContainer && sliderNext) {
    sliderNext.addEventListener("click", () => {
      // If we are at the end of the slider, scroll back to the start
      if (sliderContainer.scrollLeft + sliderContainer.clientWidth >= sliderContainer.scrollWidth - 10) {
        sliderContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // scroll right by one card + gap (approx 350px)
        sliderContainer.scrollBy({ left: 350, behavior: 'smooth' });
      }
    });
  }
});



document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Clear previous errors
            form.querySelectorAll('.border-red-500').forEach(el => el.classList.remove('border-red-500'));
            form.querySelectorAll('.error-text').forEach(el => el.remove());
            
            const inputs = form.querySelectorAll('input, textarea, select');
            let data = {
                form_type: '',
                name: '',
                contact: '',
                company: '',
                sphere: '',
                employees: '',
                message: ''
            };
            
            let inputMap = {}; // to map field names to DOM elements for errors
            
            inputs.forEach(input => {
                const placeholder = (input.getAttribute('placeholder') || '').toLowerCase();
                const labelElement = input.previousElementSibling;
                const label = (labelElement && labelElement.tagName === 'LABEL') ? labelElement.textContent.toLowerCase() : '';
                const text = placeholder + " " + label;
                const value = input.value;
                
                if (!value || input.type === 'checkbox' || input.type === 'hidden') return;
                
                if (text.includes('имя') || text.includes('зовут') || text.includes('лицо')) {
                    data.name = value;
                    inputMap['name'] = input;
                } else if (text.includes('телефон') || text.includes('почта') || text.includes('связаться') || input.type === 'tel') {
                    data.contact = value;
                    inputMap['contact'] = input;
                } else if (text.includes('компан') || text.includes('организац')) {
                    data.company = value;
                    inputMap['company'] = input;
                } else if (text.includes('сфера')) {
                    data.sphere = value;
                    inputMap['sphere'] = input;
                } else if (text.includes('сотрудник')) {
                    data.employees = value;
                    inputMap['employees'] = input;
                } else if (text.includes('проект') || text.includes('задач') || input.tagName === 'TEXTAREA') {
                    if (data.message) data.message += "\n" + value;
                    else data.message = value;
                    inputMap['message'] = input;
                } else {
                    const fieldName = (labelElement && labelElement.tagName === 'LABEL') ? labelElement.textContent : placeholder;
                    const appendText = fieldName ? fieldName + ': ' + value : value;
                    if (data.message) data.message += "\n" + appendText;
                    else data.message = appendText;
                }
            });
            
            // Determine form type based on fields
            if (data.sphere || data.employees || data.company) {
                data.form_type = 'Интеграция';
            } else {
                data.form_type = 'Лицензии';
            }
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerText : 'Отправить';
            if (submitBtn) submitBtn.innerText = 'Отправка...';
            
            try {
                const response = await fetch('http://localhost:8000/api/leads/create/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    form.reset();
                    const closeBtn = form.closest('[id$="-popup"]')?.querySelector('[id$="-close"]');
                    if (closeBtn) closeBtn.click();
                    
                    showSmallPopup('Успех!', 'Заявка оформлена успешно! В ближайшее время наш менеджер свяжется с вами.');
                } else {
                    if (result.errors) {
                        for (const [key, msg] of Object.entries(result.errors)) {
                            const el = inputMap[key];
                            if (el) {
                                el.classList.add('border-red-500');
                                const err = document.createElement('span');
                                err.className = 'text-red-500 text-sm mt-1 error-text';
                                err.innerText = msg;
                                el.parentNode.insertBefore(err, el.nextSibling);
                            }
                        }
                    } else {
                        const closeBtn = form.closest('[id$="-popup"]')?.querySelector('[id$="-close"]');
                        if (closeBtn) closeBtn.click();
                        
                        showSmallPopup('Что-то пошло не так!', result.message || 'Просим извинения за неудобства. Попробуйте еще раз позже.');
                    }
                }
            } catch (err) {
                console.error(err);
                alert('Ошибка соединения. Убедитесь, что бэкенд (Django) запущен.');
            } finally {
                if (submitBtn) submitBtn.innerText = originalText;
            }
        });
    });
});


function showSmallPopup(title, text) {
    let popup = document.getElementById('dynamic-small-popup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'dynamic-small-popup';
        popup.className = 'fixed inset-0 z-[100] flex items-center justify-center opacity-0 transition-opacity duration-300 pointer-events-none';
        
        popup.innerHTML = `
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" id="dynamic-small-overlay"></div>
            <div class="bg-white rounded-3xl p-8 lg:p-12 relative z-10 w-[90%] max-w-[450px] text-center shadow-2xl transform scale-95 transition-transform duration-300" id="dynamic-small-modal">
                <button class="absolute top-4 right-4 text-gray-500 hover:text-black transition" id="dynamic-small-close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <h3 class="font-semibold text-2xl lg:text-[28px] mb-4 leading-tight"></h3>
                <p class="text-[#696969] text-base lg:text-lg mb-8 leading-relaxed"></p>
                <button class="px-10 py-4 font-semibold text-white bg-black rounded-full hover:bg-transparent hover:text-black border border-black transition-colors duration-300 w-full" id="dynamic-small-btn">Хорошо</button>
            </div>
        `;
        document.body.appendChild(popup);
        
        const closeFn = () => {
            popup.classList.remove('opacity-100', 'pointer-events-auto');
            popup.classList.add('opacity-0', 'pointer-events-none');
            popup.querySelector('#dynamic-small-modal').classList.remove('scale-100');
            popup.querySelector('#dynamic-small-modal').classList.add('scale-95');
        };
        
        popup.querySelector('#dynamic-small-overlay').addEventListener('click', closeFn);
        popup.querySelector('#dynamic-small-close').addEventListener('click', closeFn);
        popup.querySelector('#dynamic-small-btn').addEventListener('click', closeFn);
    }
    
    popup.querySelector('h3').innerText = title;
    popup.querySelector('p').innerText = text;
    
    // Animate in
    setTimeout(() => {
        popup.classList.remove('opacity-0', 'pointer-events-none');
        popup.classList.add('opacity-100', 'pointer-events-auto');
        popup.querySelector('#dynamic-small-modal').classList.remove('scale-95');
        popup.querySelector('#dynamic-small-modal').classList.add('scale-100');
    }, 10);
}
