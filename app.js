(function () {
  const S = window.SITE;
  const view = document.getElementById("view");
  const tabs = document.querySelectorAll("#tabs button");
  const TAB_IDS = ["about", "portfolio", "setup", "workflow", "others"];

  /* ---------- utilidades ---------- */
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Devuelve { type: "video"|"playlist", id } o null
  function parseYouTube(input) {
    if (!input) return null;
    let url;
    try { url = new URL(input.trim()); } catch { return null; }
    const host = url.hostname.replace(/^www\.|^m\./, "");
    const ID = /^[\w-]{11}$/;
    if (host === "youtu.be") {
      const id = url.pathname.slice(1);
      return ID.test(id) ? { type: "video", id } : null;
    }
    if (host === "youtube.com" || host === "music.youtube.com" || host === "youtube-nocookie.com") {
      const v = url.searchParams.get("v");
      if (v && ID.test(v)) return { type: "video", id: v };
      const m = url.pathname.match(/^\/(shorts|embed|live)\/([\w-]{11})/);
      if (m) return { type: "video", id: m[2] };
      const list = url.searchParams.get("list");
      if (list && url.pathname.startsWith("/playlist")) return { type: "playlist", id: list };
    }
    return null;
  }

  // Miniatura que carga el reproductor al hacer clic (la web va más rápida)
  function video(link, title = "Vídeo") {
    const yt = parseYouTube(link);
    if (!yt) return link ? `<p class="muted">Invalid video link: ${esc(link)}</p>` : "";
    const src =
      yt.type === "video"
        ? `https://www.youtube-nocookie.com/embed/${yt.id}?autoplay=1&rel=0`
        : `https://www.youtube-nocookie.com/embed/videoseries?list=${yt.id}&autoplay=1&rel=0`;
    const thumb = yt.type === "video" ? `style="background-image:url('https://i.ytimg.com/vi/${yt.id}/hqdefault.jpg')"` : "";
    return `
      <div class="video" data-src="${src}" data-title="${esc(title)}" ${thumb}>
        <button class="play" aria-label="Play: ${esc(title)}"><span></span></button>
        ${yt.type === "playlist" ? '<em class="pl">Playlist</em>' : ""}
      </div>`;
  }

  const intro = (t) => (t ? `<p class="lead">${esc(t)}</p>` : "");

  /* ---------- botones de enlaces con icono ---------- */
  const ICONS = {
    mail: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3.5 6.5 12 13l8.5-6.5"/>',
    chat: '<path d="M4 5h16v11H10l-4 3.5V16H4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z"/>',
    music: '<path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="16" r="2"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'
  };
  // l.icon = "img/archivo.svg" usa tu propia imagen; si no, se usa l.type (mail, chat, play, music, link)
  function linkBtn(l) {
    const icon = l.icon
      ? `<img class="ico" src="${esc(l.icon)}" alt="" />`
      : `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[l.type] || ICONS.link}</svg>`;
    const inner = `${icon}<span>${esc(l.label)}</span>`;
    if (l.copy && !l.url) {
      return `<button type="button" class="linkbtn" data-copy="${esc(l.copy)}" title="Click to copy">${inner}</button>`;
    }
    const ext = /^https?:/.test(l.url) ? ' target="_blank" rel="noopener"' : "";
    return `<a class="linkbtn" href="${esc(l.url)}"${ext}>${inner}</a>`;
  }

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

  /* ---------- secciones ---------- */
  const sections = {
    about() {
      const a = S.about;
      return `
        <section class="about">
          <div class="about-text">
            ${a.eyebrow ? `<p class="eyebrow">${esc(a.eyebrow)}</p>` : ""}
            <h1>${esc(S.name)}</h1>
            <p class="lead">${esc(S.tagline)}</p>
            <div class="divider"><i></i></div>
            ${a.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
            <div class="links">
              ${a.links.map(linkBtn).join("")}
            </div>
          </div>
          ${a.photo ? `<img class="photo" src="${esc(a.photo)}" alt="${esc(S.name)}" />` : ""}
        </section>
        ${a.video ? `<section>${video(a.video, "Introduction")}</section>` : ""}`;
    },

    portfolio() {
      const items = S.portfolio || [];
      return `
        <section>
          <h2>Portfolio</h2>
          ${
            items.length
              ? `<div class="grid">${items
                  .map(
                    (p) => `
              <article class="card">
                ${video(p.video, p.title)}
                <div class="card-body">
                  <div class="meta">${esc(p.tag || "")}${p.tag && p.year ? " · " : ""}${esc(p.year || "")}</div>
                  <h3>${esc(p.title)}</h3>
                  <p>${esc(p.description)}</p>
                </div>
              </article>`
                  )
                  .join("")}</div>`
              : `<p class="lead soon">${esc(S.portfolioEmpty || "Coming soon")}</p>`
          }
        </section>`;
    },

    setup() {
      const s = S.setup;
      return `
        <section>
          <h2>My set up</h2>
          ${intro(s.intro)}
          <dl class="specs">
            ${s.items
              .map((i) => i.category
                ? `<div><dt>${esc(i.category)}</dt><dd><strong>${esc(i.name)}</strong>${i.note ? `<span>${esc(i.note)}</span>` : ""}</dd></div>`
                : `<div class="aside"><p>${esc(i.name)}</p></div>`)
              .join("")}
          </dl>
          ${s.video ? video(s.video, "My set up") : ""}
        </section>`;
    },

    workflow() {
      const w = S.workflow;
      return `
        <section>
          <h2>My workflow</h2>
          ${intro(w.intro)}
          <div class="phase">
            <p class="eyebrow">${esc(w.before.label)}</p>
            <h3>${esc(w.before.title)}</h3>
            <p>${esc(w.before.text)}</p>
          </div>
          <h3 class="subhead">${esc(w.trackTitle)}</h3>
          <p class="track-intro">${esc(w.trackIntro)}</p>
          <ol class="steps">
            ${w.steps.map((st) => `<li><h3>${esc(st.title)}</h3><p>${esc(st.text)}</p></li>`).join("")}
          </ol>
          ${w.video ? video(w.video, "My workflow") : ""}
        </section>`;
    },

    others() {
      const o = S.others;
      return `
        <section>
          <h2>Others</h2>
          <div class="blocks">
            ${o.blocks
              .map(
                (b) => `
              <article class="panel">
                <h3>${esc(b.title)}</h3>
                <p>${esc(b.text)}</p>
                ${b.links && b.links.length ? `<div class="links">${b.links.map(linkBtn).join("")}</div>` : ""}
              </article>`
              )
              .join("")}
          </div>
        </section>`;
    }
  };

  /* ---------- navegación ---------- */
  function render() {
    const id = TAB_IDS.includes(location.hash.slice(1)) ? location.hash.slice(1) : "about";
    setMenu(false);
    view.innerHTML = sections[id]();
    view.querySelectorAll("h2").forEach((h) => h.insertAdjacentHTML("afterend", '<div class="divider"><i></i></div>'));
    view.classList.remove("fade");
    void view.offsetWidth;
    view.classList.add("fade");
    tabs.forEach((b) => {
      const on = b.dataset.tab === id;
      b.setAttribute("aria-selected", on);
      b.classList.toggle("active", on);
    });
    window.scrollTo({ top: 0 });
  }

  tabs.forEach((b) => b.addEventListener("click", () => { location.hash = b.dataset.tab; }));

  // menú desplegable en móvil
  const header = document.querySelector(".site-header");
  const menuBtn = document.getElementById("menu-toggle");
  function setMenu(open) {
    header.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  }
  menuBtn.addEventListener("click", () => setMenu(!header.classList.contains("open")));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  document.addEventListener("click", (e) => { if (!header.contains(e.target)) setMenu(false); });
  window.addEventListener("hashchange", render);

  // Cargar el reproductor al pulsar la miniatura
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

  document.title = `${S.name} · Composer`;
  document.getElementById("brand").textContent = S.name;
  document.getElementById("footer-text").textContent = S.footer;
  render();
})();
