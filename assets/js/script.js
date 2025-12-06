
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


//carrusel cartas de quienes somos 
  let currentIndex = 0;
        const track = document.getElementById('carouselTrack');
        const cards = document.querySelectorAll('.tarjeta-proceso');
        const totalCards = cards.length;
        const dotsContainer = document.getElementById('dotsContainer');

        // Crear dots
        for (let i = 0; i < totalCards; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            dot.onclick = () => goToSlide(i);
            dotsContainer.appendChild(dot);
        }

        function updateCarousel() {
            const cardWidth = cards[0].offsetWidth + 20; // card width + gap
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            
            // Update dots
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCarousel();
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        // Auto-play (opcional)
        setInterval(nextSlide, 5000);

        // Responsive update
        window.addEventListener('resize', updateCarousel);