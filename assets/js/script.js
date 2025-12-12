
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});



const searchBtn = document.querySelector('.search-btn');
const searchContainer = document.querySelector('.search-container');

searchBtn.addEventListener('click', () => {
    searchContainer.classList.toggle('active');
});



/* footer */
document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
        const parent = header.parentElement;
        parent.classList.toggle("active");
    });
});


document.addEventListener("DOMContentLoaded", function () {

    const swiper = new Swiper('.empresasSwiper', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 28,
        loop: true,
        speed: 700,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            init: function () {
                updateActiveClass(this);
            },
            slideChangeTransitionEnd: function () {
                updateActiveClass(this);
            }
        }
    });

    function updateActiveClass(swiperInstance) {
        document.querySelectorAll('.swiper-slide').forEach(slide => {
            slide.classList.remove('is-active');
        });

        const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
        if (activeSlide) {
            activeSlide.classList.add('is-active');
        }
    }

});





