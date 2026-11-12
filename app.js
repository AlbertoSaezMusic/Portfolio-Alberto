(function () {
  const S = window.SITE;
  const view = document.getElementById("view");
  const tabs = document.querySelectorAll("#tabs button");
  const TAB_IDS = ["sobre-mi", "portfolio", "setup", "workflow", "others"];

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
    if (!yt) return link ? `<p class="muted">Enlace de vídeo no válido: ${esc(link)}</p>` : "";
    const src =
      yt.type === "video"
        ? `https://www.youtube-nocookie.com/embed/${yt.id}?autoplay=1&rel=0`
        : `https://www.youtube-nocookie.com/embed/videoseries?list=${yt.id}&autoplay=1&rel=0`;
    const thumb = yt.type === "video" ? `style="background-image:url('https://i.ytimg.com/vi/${yt.id}/hqdefault.jpg')"` : "";
    return `
      <div class="video" data-src="${src}" data-title="${esc(title)}" ${thumb}>
        <button class="play" aria-label="Reproducir: ${esc(title)}"><span></span></button>
        ${yt.type === "playlist" ? '<em class="pl">Lista de reproducción</em>' : ""}
      </div>`;
  }

  const intro = (t) => (t ? `<p class="lead">${esc(t)}</p>` : "");

  /* ---------- secciones ---------- */
  const sections = {
    "sobre-mi"() {
      const a = S.about;
      return `
        <section class="about">
          <div class="about-text">
            <p class="eyebrow">Compositor</p>
            <h1>${esc(S.name)}</h1>
            <p class="lead">${esc(S.tagline)}</p>
            ${a.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
            <div class="links">
              ${a.links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}
            </div>
          </div>
          ${a.photo ? `<img class="photo" src="${esc(a.photo)}" alt="${esc(S.name)}" />` : ""}
        </section>
        ${a.video ? `<section>${video(a.video, "Presentación")}</section>` : ""}`;
    },

    portfolio() {
      return `
        <section>
          <h2>Portfolio</h2>
          <div class="grid">
            ${S.portfolio
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
              .join("")}
          </div>
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
              .map((i) => `<div><dt>${esc(i.category)}</dt><dd><strong>${esc(i.name)}</strong>${i.note ? `<span>${esc(i.note)}</span>` : ""}</dd></div>`)
              .join("")}
          </dl>
          ${s.video ? video(s.video, "Mi set up") : ""}
        </section>`;
    },

    workflow() {
      const w = S.workflow;
      return `
        <section>
          <h2>Mi workflow</h2>
          ${intro(w.intro)}
          <ol class="steps">
            ${w.steps.map((st) => `<li><h3>${esc(st.title)}</h3><p>${esc(st.text)}</p></li>`).join("")}
          </ol>
          ${w.video ? video(w.video, "Mi workflow") : ""}
        </section>`;
    },

    others() {
      const o = S.others;
      return `
        <section>
          <h2>Others</h2>
          ${intro(o.intro)}
          <div class="grid">
            ${o.items
              .map(
                (i) => `
              <article class="card">
                ${i.video ? video(i.video, i.title) : ""}
                <div class="card-body">
                  <h3>${esc(i.title)}</h3>
                  <p>${esc(i.description || "")}</p>
                  ${i.url ? `<a class="more" href="${esc(i.url)}" target="_blank" rel="noopener">Abrir enlace →</a>` : ""}
                </div>
              </article>`
              )
              .join("")}
          </div>
        </section>`;
    }
  };

  /* ---------- navegación ---------- */
  function render() {
    const id = TAB_IDS.includes(location.hash.slice(1)) ? location.hash.slice(1) : "sobre-mi";
    view.innerHTML = sections[id]();
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
  window.addEventListener("hashchange", render);

  // Cargar el reproductor al pulsar la miniatura
  view.addEventListener("click", (e) => {
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

  document.title = `${S.name} · Compositor`;
  document.getElementById("brand").textContent = S.name;
  document.getElementById("footer-text").textContent = S.footer;
  render();
})();
