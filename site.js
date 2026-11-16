(function () {
  document.documentElement.classList.add("js");
  const view = document.getElementById("view");

  /* iconos de reserva por si un logo no carga */
  const ICONS = {
    mail: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3.5 6.5 12 13l8.5-6.5"/>',
    chat: '<path d="M4 5h16v11H10l-4 3.5V16H4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z"/>',
    music: '<path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="16" r="2"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'
  };
  const svgIcon = (type) =>
    `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[type] || ICONS.link}</svg>`;
  const ICON_EXT = [".svg", ".png", ".webp", ".jpg"];
  // Si un logo no existe, prueba otra extensión y, al final, pone el icono genérico
  document.addEventListener("error", (e) => {
    const im = e.target;
    if (!im || im.tagName !== "IMG" || !im.classList.contains("logo")) return;
    const n = (parseInt(im.dataset.n, 10) || 0) + 1;
    if (im.dataset.base && n < ICON_EXT.length) {
      im.dataset.n = n;
      im.src = im.dataset.base + ICON_EXT[n];
    } else {
      im.outerHTML = svgIcon(im.dataset.type);
    }
  }, true);

  function toast(msg) {
    let t = document.getElementById("toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => t.classList.remove("show"), 2800);
  }
  async function copyText(v) {
    try { await navigator.clipboard.writeText(v); toast(`Copied: ${v}`); }
    catch { toast(`Discord: ${v}`); }
  }


  /* menú desplegable en móvil */
  const header = document.querySelector(".site-header");
  const menuBtn = document.getElementById("menu-toggle");
  function setMenu(open) {
    header.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  }
  menuBtn.addEventListener("click", () => setMenu(!header.classList.contains("open")));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  document.addEventListener("click", (e) => { if (!header.contains(e.target)) setMenu(false); });

  /* copiar y cargar el reproductor al pulsar la miniatura */
  view.addEventListener("click", (e) => {
    const cb = e.target.closest("[data-copy]");
    if (cb) { copyText(cb.dataset.copy); return; }
    const box = e.target.closest(".video");
    if (!box || box.querySelector("iframe")) return;
    const f = document.createElement("iframe");
    f.src = box.dataset.src;
    f.title = box.dataset.title;
    f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    f.allowFullscreen = true;
    box.innerHTML = "";
    box.appendChild(f);
  });

  /* aparición suave al hacer scroll */
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("in"));
  }

  /* botón de volver arriba */
  const top = document.getElementById("to-top");
  if (top) {
    const onScroll = () => top.classList.toggle("show", window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
})();
