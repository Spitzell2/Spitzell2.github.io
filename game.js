const anilistURL = 'https://anilist.co/anime/'
const catboxURL = "https://nl.catbox.video/"
const apiUrlAnilist = 'https://graphql.anilist.co'
const season = ['Winter', 'Spring', 'Summer', 'Fall']
const typeSong = ['OP', 'ED', 'IN']
const settingsName = 'settingsTrain'
const playlistName = 'playlistSpTrain'
let listaIDs, idsCoincidentes, numCanciones;

let arrayOpciones = new Array()
let revealBoolean = false

const state = {
    lista: [], lista2: [], posicion: 0, audioBoolean: false,
    screenModeBoolean: false, tiempoStartSong: 0, settings: {}
  };

function iniciar() { 
    state.settings = JSON.parse(localStorage.getItem(settingsName));
    iniciarBotones()
    obtenerLista()
}

function iniciarBotones() {
    ['randomSong', 'displayAll', 'eliminarSong', 'restaurarTodo'].forEach(id => 
        document.getElementById(id).addEventListener('click', window[id])
    );

    document.getElementById('settings').onclick = () => window.location.href = 'https://spitzells.github.io';
    //document.getElementById('settings').onclick = () => window.location.href = 'C:/Users/braya/Visual/TrainAMQ/index.html';

    document.getElementById("volumeSlider").addEventListener("input", function() {
        document.getElementById("media").volume = parseFloat(this.value);
    });
}

function displayAll() {
    mostrarInfoCancion()
    revealPhase()
    player.removeEventListener('timeupdate', checkTime)
}

function mostrarInfoCancion() {
    ['NameInfo', 'ArtistInfo', 'DifficultyInfo'].forEach(id => {
      document.getElementById(id).style.display = 'block';
    });
}

function actualizarInfo() {
    const tabla = document.getElementById('tablaCancion');
    while (tabla.childElementCount > 1) tabla.removeChild(tabla.children[1]);
    ['songName', 'songArtist', 'songDifficulty'].forEach((attr, idx) => {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.id = `${attr.split('song').pop()}Info`;
      cell.textContent = `${attr.split('song').pop()}: ${state.lista[state.posicion - 1][attr]}`;
      cell.style.display = "none";
      row.appendChild(cell);
      tabla.appendChild(row);
    });
}

function toggleMode() {
    const element = document.body;
    const mode = state.screenModeBoolean ? "dark-mode" : "light-mode";
    element.className = mode;
    document.getElementById("screenMode").value = state.screenModeBoolean ? "Lightmode" : "Darkmode";
    state.screenModeBoolean = !state.screenModeBoolean;
}

document.getElementById("enlaceEliminar").addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.setItem('dataToSend', JSON.stringify(state.lista));
    window.open(this.href, '_blank');
  });

window.addEventListener('load', iniciar);