let songs = [];
let currentIndex = -1;

// === Shuffle ===
let shuffleMode = false;
let shuffleOrder = [];
let shufflePosition = 0;

// === Obtener elementos ===
const fileInput = document.getElementById("jsonFileInput");
const mediaSelect = document.getElementById("mediaSelect");
const songListDiv = document.getElementById("songList");
const audioPlayer = document.getElementById("audioPlayer");
const videoPlayer = document.getElementById("videoPlayer");
const songInfoDiv = document.getElementById("songInfo");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const exportBtn = document.getElementById("exportBtn");

const themeToggle = document.getElementById("themeToggle");
const shuffleToggle = document.getElementById("shuffleToggle");
const quizMode = document.getElementById("quizMode");
const hideSelect = document.getElementById("hideSelect");
const revealBtn = document.getElementById("revealBtn");

const filterOP = document.getElementById("filterOP");
const filterED = document.getElementById("filterED");
const filterIN = document.getElementById("filterIN");

const cloudBtn = document.getElementById("cloudBtn");

const CLOUD_JSON = "https://raw.githubusercontent.com/Spitzell2/Spitzell2.github.io/refs/heads/main/songs_training.json";
cloudBtn.addEventListener("click", loadFromCloud);


// =========================
//     FILTRO TIPOS
// =========================

function isSongAllowed(song) {
  const t = song.type.toLowerCase();

  if (t.includes("opening") || t.includes("op")) {
    return filterOP.checked;
  }
  if (t.includes("ending") || t.includes("ed")) {
    return filterED.checked;
  }
  if (t.includes("insert") || t.includes("in")) {
    return filterIN.checked;
  }

  return true; // Si no encaja en ninguna categoría
}

[filterOP, filterED, filterIN].forEach(chk => {
  chk.addEventListener("change", () => {
    localStorage.setItem("filterOP", filterOP.checked);
    localStorage.setItem("filterED", filterED.checked);
    localStorage.setItem("filterIN", filterIN.checked);

    if (shuffleMode) generateShuffleOrder(); // actualizar cola shuffle
  });
});

// =========================
//     TEMA OSCURO / CLARO
// =========================
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.innerText = "Modo Claro";
} else {
  themeToggle.innerText = "Modo Oscuro";
}

themeToggle.onclick = () => {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.innerText = isDark ? "Modo Claro" : "Modo Oscuro";
};

// ==========================
//     GUARDAR AJUSTES
// =========================
const savedMedia = localStorage.getItem("mediaSelect");
if (savedMedia) mediaSelect.value = savedMedia;

// Guardar filtros
const savedOP = localStorage.getItem("filterOP");
const savedED = localStorage.getItem("filterED");
const savedIN = localStorage.getItem("filterIN");

if (savedOP !== null) filterOP.checked = savedOP === "true";
if (savedED !== null) filterED.checked = savedED === "true";
if (savedIN !== null) filterIN.checked = savedIN === "true";

// ==========================
//     EVENTOS
// =========================
fileInput.addEventListener("change", handleFileUpload);
mediaSelect.addEventListener("change", () => {
  localStorage.setItem("mediaSelect", mediaSelect.value);
  if (currentIndex !== -1) playSong(songs[currentIndex]);
});
prevBtn.addEventListener("click", playPrevious);
nextBtn.addEventListener("click", playNext);
exportBtn.addEventListener("click", exportFiltered);
audioPlayer.addEventListener("ended", playNext);
videoPlayer.addEventListener("ended", playNext);

shuffleToggle.onclick = () => {
  shuffleMode = !shuffleMode;
  shuffleToggle.textContent = shuffleMode ? "🔀 Shuffle ON" : "🔀 Shuffle OFF";
  if (shuffleMode) generateShuffleOrder();
};

revealBtn.onclick = () => {
  if (currentIndex !== -1) displayRealInfo(songs[currentIndex]);
};

// ==========================
//     MANEJO DE ARCHIVOS
// =========================
// Set global para rastrear canciones ya añadidas
const songSet = new Set();

// Inicializamos con las canciones que ya estén cargadas (por si recargas la página)
songs.forEach(song => {
  songSet.add(getSongUniqueKey(song));
});

function getSongUniqueKey(song) {
  const name = (song.name || "").trim().toLowerCase();
  const artist = (song.artist || "").trim().toLowerCase();
  
  return `${name}|||${artist}`;  // "|||" es solo un separador poco probable
}

async function handleFileUpload(event) {
  const files = [...event.target.files];
  let newSongs = [];

  for (const file of files) {
    const text = await file.text();
    try {
      const parsed = JSON.parse(text);
      const incorrectOnly = parsed.filter(s => s.correct !== true);

      for (const song of incorrectOnly) {
        const key = getSongUniqueKey(song);
        
        if (!songSet.has(key)) {
          songSet.add(key);
          newSongs.push(song);
        }
      }
    } catch (e) {
      alert("Error al leer " + file.name + ": " + e);
    }
  }

  if (newSongs.length > 0) {
    songs = songs.concat(newSongs);
    renderList();
    updateSongCount();
    
    if (shuffleMode) generateShuffleOrder();
  }
  // Opcional: mostrar feedback
  // else console.log("No se añadieron canciones nuevas (todas ya existían)");
}

// ==========================
//     RENDER LISTA
// =========================
function renderList() {
  songListDiv.innerHTML = "";

  songs.forEach(song => {
    const div = document.createElement("div");
    div.className = "songItem";
    div.textContent = `${song.anime.english} - ${song.type}`;

    const removeBtn = document.createElement("button");
    removeBtn.className = "removeBtn";
    removeBtn.textContent = "✖";
    removeBtn.onclick = e => {
      e.stopPropagation();
      deleteSong(song);
    };

    div.appendChild(removeBtn);

    div.onclick = () => {
      currentIndex = songs.indexOf(song);

      if (!isSongAllowed(song)) {
        playNext(); // si está filtrada, saltar
        return;
      }

      playSong(song);
    };

    songListDiv.appendChild(div);
  });

  highlightActiveSong();
  updateSongCount();
}

function highlightActiveSong() {
  const items = document.querySelectorAll(".songItem");

  items.forEach(item => {
    item.classList.remove("active");
    const btn = item.querySelector(".removeBtn");
    if (btn) btn.style.display = "none";
  });

  if (currentIndex === -1) return;

  const activeItem = items[currentIndex];
  if (activeItem) {
    activeItem.classList.add("active");
    activeItem.querySelector(".removeBtn").style.display = "inline-block";
  }

  scrollToActiveSong({ block: "start", offsetTop: 100 });
}

// ==========================
//     REPRODUCCIÓN
// =========================
function playSong(song) {
  if (!isSongAllowed(song)) {
    playNext();
    return;
  }

  highlightActiveSong();
  displaySongInfo(song);
  scrollToActiveSong({ block: "start", offsetTop: 100 });

  const mediaType = mediaSelect.value;

  if (mediaType === "audio") {
    audioPlayer.src = `https://naedist.animemusicquiz.com/${song.urls.catbox["0"]}`;
    audioPlayer.style.display = "block";
    videoPlayer.style.display = "none";
    videoPlayer.pause();
    audioPlayer.play().catch(() => playNext());
  } else {
    const url720 = song.urls?.catbox?.["720"];
    const url480 = song.urls?.catbox?.["480"];

    videoPlayer.src = `https://naedist.animemusicquiz.com/${url720 || url480 || ""}`;   
    videoPlayer.style.display = "block";
    audioPlayer.style.display = "none";
    audioPlayer.pause();
    videoPlayer.play().catch(() => playNext());
  }
}

// ==========================
//     MODO QUIZ
// =========================
function displaySongInfo(song) {
  const hidden = quizMode.checked ? hideSelect.value : "none";

  let animeText = `${song.anime.english} (${song.anime.romaji})`;
  let songText = song.name;
  let artistText = song.artist;
  let typeText = song.type;
  let diffText = song.difficulty ?? 0;

  if (hidden === "anime" || hidden === "all") animeText = "❓ Oculto";
  if (hidden === "songname" || hidden === "all") songText = "❓ Oculto";
  if (hidden === "artist" || hidden === "all") artistText = "❓ Oculto";
  if (hidden === "type" || hidden === "all") typeText = "❓ Oculto";

  songInfoDiv.innerHTML = `
    <strong>Anime:</strong> ${animeText}<br>
    <strong>Nombre:</strong> ${songText}<br>
    <strong>Artista:</strong> ${artistText}<br>
    <strong>Tipo:</strong> ${typeText}<br>
    <strong>Diff:</strong> ${diffText}<br>

  `;

  revealBtn.style.display = quizMode.checked ? "inline-block" : "none";
}

function displayRealInfo(song) {
  songInfoDiv.innerHTML = `
    <strong>Anime:</strong> ${song.anime.english} (${song.anime.romaji})<br>
    <strong>Nombre:</strong> ${song.name}<br>
    <strong>Artista:</strong> ${song.artist}<br>
    <strong>Tipo:</strong> ${song.type}<br>
  `;
}

// ==========================
//     SHUFFLE
// =========================
function generateShuffleOrder() {
  shuffleOrder = songs
    .map((s, i) => ({ s, i }))
    .filter(obj => isSongAllowed(obj.s)) // aplicar filtro
    .map(obj => obj.i);

  for (let i = shuffleOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleOrder[i], shuffleOrder[j]] = [shuffleOrder[j], shuffleOrder[i]];
  }
  shufflePosition = 0;
}

// ==========================
//     SIGUIENTE / ANTERIOR
// =========================
function playNext() {
  if (!songs.length) return;

  if (shuffleMode) {
    if (shufflePosition >= shuffleOrder.length) generateShuffleOrder();
    currentIndex = shuffleOrder[shufflePosition++];
  } else {
    do {
      currentIndex = (currentIndex + 1) % songs.length;
    } while (!isSongAllowed(songs[currentIndex]));
  }

  playSong(songs[currentIndex]);
}

function playPrevious() {
  if (!songs.length) return;

  if (shuffleMode) {
    shufflePosition = (shufflePosition - 1 + shuffleOrder.length) % shuffleOrder.length;
    currentIndex = shuffleOrder[shufflePosition];
  } else {
    do {
      currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    } while (!isSongAllowed(songs[currentIndex]));
  }

  playSong(songs[currentIndex]);
}

// ==========================
//     BORRAR CANCIÓN
// =========================
function deleteSong(song) {
  const index = songs.indexOf(song);
  if (index !== -1) songs.splice(index, 1);

  renderList();
  updateSongCount();

  if (shuffleMode) generateShuffleOrder();
  playNext();
}

// ==========================
//     EXPORTAR
// =========================
function exportFiltered() {
  const cleanSongs = songs.map(song => ({
    name: song.name,
    artist: song.artist,
    anime: {
      english: song.anime?.english || "",
      romaji: song.anime?.romaji || ""
    },
    type: song.type || "",
    urls: song.urls || {},
    correct: song.correct === true ? true : false,
    difficulty: song.difficulty
  }));

  const blob = new Blob([JSON.stringify(cleanSongs, null, 2)], {
    type: "application/json"
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "songs_training.json";
  a.click();
}

// ==========================
//   CONTADOR DE CANCIONES
// ==========================
function updateSongCount() {
  const countDiv = document.getElementById("songCount");
  countDiv.textContent = `Canciones: ${songs.length}`;
}


// ==========================
//   SCROLL A CANCIÓN ACTIVA
// ==========================
function scrollToActiveSong(options = {}) {
  const defaults = {
    smooth: true,
    block: "center",      // "start" | "center" | "end" | "nearest"
    offsetTop: 60         // píxeles extra por encima (para menús fijos)
  };

  const config = { ...defaults, ...options };

  const active = document.querySelector(".songItem.active");
  if (!active) return;

  const container = document.getElementById("songListContainer");
  if (!container) return;

  const rect = active.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  // Solo hacemos scroll si el elemento no está visible o está muy abajo/arriba
  if (
    rect.top < containerRect.top + config.offsetTop ||
    rect.bottom > containerRect.bottom
  ) {
    active.scrollIntoView({
      behavior: config.smooth ? "smooth" : "auto",
      block: config.block,
      inline: "nearest"
    });
  }
}


// ==========================
//   CARGAR DESDE NUBE
// ==========================
async function loadFromCloud() {
  cloudBtn.textContent = "⏳ Cargando...";
  cloudBtn.disabled = true;

  try {
    const res = await fetch(CLOUD_JSON, { cache: "no-store" });
    if (!res.ok) throw new Error("No se pudo cargar el JSON");

    const data = await res.json();

    const incorrectOnly = data.filter(s => s.correct !== true);

    let added = 0;

    incorrectOnly.forEach(song => {
      const key = getSongUniqueKey(song);
      if (!songSet.has(key)) {
        songSet.add(key);
        songs.push(song);
        added++;
      }
    });

    renderList();
    updateSongCount();
    if (shuffleMode) generateShuffleOrder();

    alert(`☁️ Cargadas ${added} canciones desde la nube`);

  } catch (err) {
    alert("Error cargando desde la nube");
    console.error(err);
  }

  cloudBtn.textContent = "☁️ Cargar desde la nube";
  cloudBtn.disabled = false;
}
