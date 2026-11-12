/* ==========================================================
   AQUÍ EDITAS TODO EL CONTENIDO DE LA WEB
   Para añadir un vídeo, pega el enlace de YouTube en "video".
   Vale cualquier formato: youtube.com/watch?v=..., youtu.be/...,
   youtube.com/shorts/..., o una lista (playlist?list=...).
   ========================================================== */

window.SITE = {
  name: "Alberto Sáez Music",
  tagline: "Composer · Music for videogames, RPGs, D&D campaigns and fantasy worlds",
  footer: "© 2026 Alberto Sáez Music",

  /* ---------- SOBRE MÍ ---------- */
  about: {
    eyebrow: "Composer of music for videogames", // texto pequeño sobre el nombre
    photo: "", // ej: "img/yo.jpg" (déjalo vacío para no mostrar foto)
    paragraphs: [
      "Hi there! I'm Alberto, a composer based in Valencia, Spain, and a lifelong gamer.",
      "I've been writing music all my life, and for the last few years I've focused on music for videogames.",
      "My influences come from the fantasy worlds I grew up in: Skyrim, Elden Ring, Golden Sun, Ghost of Tsushima and The Witcher, plus Game of Thrones and The Lord of the Rings.",
      "My approach is simple: the music serves the developer's vision. I want to take the player's experience a step further by building on what the game already shows, and giving it a frame that makes the whole experience stick. My job isn't to write memorable music for its own sake. It's to bring to life what the developer hears in their head when they imagine the game."
    ],
    video: "", // opcional: un vídeo de presentación
    links: [
      { label: "YouTube", url: "https://youtube.com/" },
      { label: "Spotify", url: "https://spotify.com/" },
      { label: "Email", url: "mailto:tu@email.com" }
    ]
  },

  /* ---------- PORTFOLIO ---------- */
  portfolio: [
    {
      title: "Título de la pieza 1",
      year: "2026",
      tag: "Orquestal",
      description: "Breve descripción: para qué fue, instrumentación, qué querías transmitir.",
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      title: "Título de la pieza 2",
      year: "2025",
      tag: "Electrónica",
      description: "Otra pieza. Puedes añadir tantas como quieras copiando este bloque.",
      video: "https://youtu.be/dQw4w9WgXcQ"
    }
  ],

  /* ---------- MY SET UP ---------- */
  setup: {
    intro: "Mi estudio y las herramientas con las que trabajo.",
    items: [
      { category: "DAW", name: "Cubase / Logic / Ableton", note: "Pon el tuyo y por qué." },
      { category: "Teclado / Controlador", name: "Modelo", note: "" },
      { category: "Interfaz de audio", name: "Modelo", note: "" },
      { category: "Monitores / Auriculares", name: "Modelo", note: "" },
      { category: "Librerías y plugins", name: "Spitfire, Kontakt, etc.", note: "" }
    ],
    video: "" // opcional: tour del estudio
  },

  /* ---------- MI WORKFLOW ---------- */
  workflow: {
    intro: "Cómo pasa una idea de la cabeza a la mezcla final.",
    steps: [
      { title: "1. Idea y boceto", text: "Cómo empiezas: piano, melodía, referencias…" },
      { title: "2. Arreglo y orquestación", text: "Cómo construyes capas, instrumentos y texturas." },
      { title: "3. Producción y mezcla", text: "Mockup, edición, mezcla y master." },
      { title: "4. Entrega", text: "Formatos, revisiones, comunicación con el cliente." }
    ],
    video: "" // opcional: vídeo de proceso
  },

  /* ---------- OTHERS ---------- */
  others: {
    intro: "Todo lo demás: directos, colaboraciones, tutoriales, cosas sueltas.",
    items: [
      {
        title: "Un enlace interesante",
        description: "Puede ser un vídeo o un enlace normal.",
        video: "",
        url: "https://youtube.com/"
      }
    ]
  }
};
