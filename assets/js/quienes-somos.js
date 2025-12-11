document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("workflow-track");
  const wrap = track.parentElement;
  const cards = Array.from(track.children);
  const prev = document.getElementById("workflow-prev");
  const next = document.getElementById("workflow-next");
  const dotsBox = document.getElementById("workflow-dots");

  const isMobile = () => matchMedia("(max-width:767px)").matches;

  // Crear dots dinámicamente (solo escritorio)
  if (!isMobile()) {
    cards.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "dot";
      dot.onclick = () => activate(i, true);
      dotsBox.appendChild(dot);
    });
  }
  const dots = Array.from(dotsBox.children);

  let current = 0;

  function center(i) {
    if (isMobile()) return; // en móvil no centramos nada
    const card = cards[i];
    const start = card.offsetLeft;
    wrap.scrollTo({
      left: start - (wrap.clientWidth / 2 - card.clientWidth / 2),
      behavior: "smooth"
    });
  }

  function toggleUI(i) {
  cards.forEach((c, k) => c.toggleAttribute("active", k === i));
  dots.forEach((d, k) => d.classList.toggle("active", k === i));

  if (prev) prev.disabled = i === 0;
  if (next) next.disabled = i === cards.length - 1;
}

  function activate(i, scroll) {
    if (i === current) return;
    current = i;
    toggleUI(i);
    if (scroll) center(i);
  }

  function go(step) {
    activate(Math.min(Math.max(current + step, 0), cards.length - 1), true);
  }

  // Navegación con teclado (solo escritorio)
  if (!isMobile()) {
    addEventListener("keydown", (e) => {
      if (["ArrowRight"].includes(e.key)) go(1);
      if (["ArrowLeft"].includes(e.key)) go(-1);
    }, { passive: true });
  }

  // Activar tarjeta con hover/click
  cards.forEach((card, i) => {
    card.addEventListener("mouseenter", () => {
      if (!isMobile() && matchMedia("(hover:hover)").matches) activate(i, true);
    });
    card.addEventListener("click", () => activate(i, true));
  });

  // Swipe (solo escritorio horizontal)
  if (!isMobile()) {
    let sx = 0;
    track.addEventListener("touchstart", (e) => {
      sx = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 60) {
        go(dx > 0 ? -1 : 1);
      }
    }, { passive: true });
  }

  // Ocultar controles en móvil
  if (isMobile()) {
    dotsBox.hidden = true;
    if (prev) prev.hidden = true;
    if (next) next.hidden = true;
  }

  addEventListener("resize", () => center(current), { passive: true });

  // Inicializar
  toggleUI(0);
  center(0);
});


// Funcionalidad de los tabs
const selectors = document.querySelectorAll('.selector');
const tabPanels = document.querySelectorAll('.tab-panel');

selectors.forEach(selector => {
    selector.addEventListener('click', function() {
        selectors.forEach(s => s.classList.remove('active'));
        
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        this.classList.add('active');

        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

var swiper = new Swiper(".certificados-quienesSomos", {
  slidesPerView: 1,
  spaceBetween: 0, // o un valor pequeño
  centeredSlides: false, // ← cambia esto
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 10 },
    480: { slidesPerView: 1, spaceBetween: 15 },
    640: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 1, spaceBetween: 30 },
    1024: { slidesPerView: 1, spaceBetween: 40 },
    1280: { slidesPerView: 1, spaceBetween: 50 }
  }
});
