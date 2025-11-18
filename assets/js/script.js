
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