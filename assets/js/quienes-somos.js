document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("workflow-track");
  const wrap = track.parentElement;
  const cards = Array.from(track.children);
  const prev = document.getElementById("workflow-prev");
  const next = document.getElementById("workflow-next");
  const dotsBox = document.getElementById("workflow-dots");

  const isMobile = () => matchMedia("(max-width:767px)").matches;

  // Crear dots dinámicamente
  cards.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.onclick = () => activate(i, true);
    dotsBox.appendChild(dot);
  });
  const dots = Array.from(dotsBox.children);

  let current = 0;

  function center(i) {
    const card = cards[i];
    const axis = isMobile() ? "top" : "left";
    const size = isMobile() ? "clientHeight" : "clientWidth";
    const start = isMobile() ? card.offsetTop : card.offsetLeft;
    wrap.scrollTo({
      [axis]: start - (wrap[size] / 2 - card[size] / 2),
      behavior: "smooth"
    });
  }

  function toggleUI(i) {
    cards.forEach((c, k) => c.toggleAttribute("active", k === i));
    dots.forEach((d, k) => d.classList.toggle("active", k === i));
    prev.disabled = i === 0;
    next.disabled = i === cards.length - 1;
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



  addEventListener("keydown", (e) => {
    if (["ArrowRight", "ArrowDown"].includes(e.key)) go(1);
    if (["ArrowLeft", "ArrowUp"].includes(e.key)) go(-1);
  }, { passive: true });

  cards.forEach((card, i) => {
    card.addEventListener("mouseenter", () => {
      if (matchMedia("(hover:hover)").matches) activate(i, true);
    });
    card.addEventListener("click", () => activate(i, true));
  });

  let sx = 0, sy = 0;
  track.addEventListener("touchstart", (e) => {
    sx = e.touches[0].clientX;
    sy = e.touches[0].clientY;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if (isMobile() ? Math.abs(dy) > 60 : Math.abs(dx) > 60) {
      go((isMobile() ? dy : dx) > 0 ? -1 : 1);
    }
  }, { passive: true });

  if (window.matchMedia("(max-width:767px)").matches) {
    dotsBox.hidden = true;
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