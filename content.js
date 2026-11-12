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
      "My influences come from the fantasy worlds I grew up in: Skyrim, Elden Ring, Golden Sun, Ghost of Tsushima and The Witcher, plus Game of Thrones, The Lord of the Rings...",
      "My approach is simple: the music serves the developer's vision. I want to take the player's experience a step further by building on what the game already shows, and giving it a frame that makes the whole experience stick. My job isn't to write memorable music for its own sake. It's to bring to life what the developer hears in their head when they imagine the game."
    ],
    video: "", // opcional: un vídeo de presentación
    links: [
      { label: "Gmail", type: "mail", url: "mailto:albertosaezcastillo@gmail.com" },
      { label: "Discord · alberthor350", type: "chat", url: "https://discord.com/users/431526710006120460" },
      { label: "YouTube", type: "play", url: "https://www.youtube.com/@alberthormusicyt" },
      { label: "Spotify", type: "music", url: "https://open.spotify.com/artist/3YNlkAYshOwGIeb6OJhXGC" }
    ]
  },

  /* ---------- PORTFOLIO ---------- */
  portfolio: [
    { title: "Fantasy music reel", tag: "Reel", year: "", description: "", video: "https://youtu.be/GeT0c5qNSCM" },
    { title: "Dark fantasy music reel", tag: "Reel", year: "", description: "", video: "https://youtu.be/FkpJXVGJLyg" }
  ],
  portfolioEmpty: "Coming soon", // se muestra mientras la lista de arriba esté vacía

  /* ---------- JUEGOS EN LOS QUE HE TRABAJADO (lista numerada, aparece en Portfolio) ----------
     Cada juego: name, years, status, music (estilo, opcional), genre.
     "steam" (opcional): enlace a la página de Steam -> añade un botón y la tarjeta incrustada. */
  games: {
    title: "Games I've worked for",
    items: [
      { name: "Empress Cixi", years: "2025–Present", status: "In development", music: "Chinese / Orchestral", genre: "Narrative RPG" },
      { name: "Alpha Instinct Royale", years: "2025–Present", status: "In development", music: "Fantasy / Orchestral", genre: "AutoBattler" },
      { name: "Runic Tower", years: "2025–Present", status: "In development · Demo out", music: "Fantasy / Dark fantasy", genre: "Tower Defense RPG", steam: "https://store.steampowered.com/app/3949420/Runic_Tower/" },
      { name: "Yoshimoto, Wrath of the Rising Warrior", years: "2025–Present", status: "In development", music: "Japanese / Orchestral", genre: "Action RPG" },
      { name: "Unmade", years: "2025–Present", status: "In development", music: "", genre: "Survival" },
      { name: "Fableweather", years: "2026–Present", status: "In development", music: "", genre: "Fantasy RPG" }
    ]
  },

  /* ---------- MY SET UP ---------- */
  setup: {
    intro: "The tools I write with.",
    items: [
      { category: "Computer", name: "AMD Ryzen 7 3700X · 128 GB RAM · NVIDIA RTX 2060 · SSD + HDD storage", note: "" },
      { category: "DAW", name: "Cubase 15 Pro", note: "" },
      { category: "Sampler", name: "Kontakt 7", note: "" },
      { category: "MIDI Keyboard", name: "Nektar Impact LX61", note: "" },
      { category: "Expression", name: "Sparrow 4x100mm MIDI controller", note: "" },
      { category: "Audio Interface", name: "Focusrite Scarlett Solo", note: "" },
      { category: "Monitors", name: "PreSonus Eris E3.5", note: "" },
      { category: "Headphones", name: "Sennheiser HD 4.50 BTNC", note: "" },
      { category: "Strings, Woods & Brass", name: "BBC Symphonic Orchestra · Nucleus · NI Symphony Series", note: "" },
      { category: "Percussion", name: "Drums of War · Cerberus · NI Symphony Series Percussion", note: "" },
      { category: "Piano", name: "Various Opus libraries · Native Instruments pianos", note: "" },
      { category: "Ethnic & Folk", name: "Mainly Opus folk libraries", note: "" },
      { category: "", name: "...amongst many others!", note: "" },
      { category: "Guitars", name: "Spanish · Electric · Twelve-string · Acoustic", note: "Recorded by me, in my studio" }
    ],
    video: "" // opcional: tour del estudio
  },

  /* ---------- MI WORKFLOW ---------- */
  workflow: {
    intro: "This is how a project runs when you work with me, whether we do it in person or remotely.",
    before: {
      label: "Before we start",
      title: "Creative Questionnaire",
      text: "Before working on any track, we start with a creative questionnaire, a kind of assessment of the project's sonic palette. It helps me understand the developer's references and the overall tone the game should have."
    },
    trackTitle: "Track by track",
    trackIntro: "For each track, the developer gives me specific instructions, and every track then follows the same four steps.",
    steps: [
      {
        title: "1. Idea and sketch",
        text: "I begin with a very basic MIDI version in which the instrumental lines and the main idea can be heard, even if it sounds rough compared to the final result. The purpose is to validate the sketch before committing to the final version. I send it to the developer as a WAV, and once it is approved, the real work begins."
      },
      {
        title: "2. Orchestration and arrangement",
        text: "Here the sketch becomes the actual piece. I work on dynamics, layers, expression, realism and depth, building the full orchestration on top of the approved idea."
      },
      {
        title: "3. Mixing",
        text: "Once the arrangement is finished, I export the stems and move on to the mix: level normalization, EQ, reverb and whatever else the track needs."
      },
      {
        title: "4. Delivery",
        text: "I deliver the music in an implementation-ready format, together with implementation instructions whenever they are needed."
      }
    ],
    video: "" // opcional: vídeo de proceso
  },

  /* ---------- OTHERS ---------- */
  others: {
    blocks: [
      {
        title: "More about me",
        text: "Besides being a music lover in general, from videogames and film to rock, metal and plenty more, I love skiing and I'm a big fan of basketball."
      },
      {
        title: "My channel",
        text: "When I'm not composing for others, I keep composing out of passion for my own channel. It's focused on music for D&D sessions and videogames. I do it purely for the love of it, and I like sharing it online with anyone who might enjoy it.",
        links: [
          { label: "YouTube", type: "play", url: "https://www.youtube.com/@alberthormusicyt" },
          { label: "Spotify", type: "music", url: "https://open.spotify.com/artist/3YNlkAYshOwGIeb6OJhXGC" }
        ]
      }
    ]
  }
};
