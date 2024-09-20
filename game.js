const anilistURL = 'https://anilist.co/anime/'
const catboxURL = "https://nl.catbox.video/"
const apiUrlAnilist = 'https://graphql.anilist.co'
const season = ['Winter', 'Spring', 'Summer', 'Fall']
const typeSong = ['OP', 'ED', 'IN']
const settingsName = 'settingsSA'
const playlistName = 'playlistSp'
let listaIDs, idsCoincidentes, numCanciones;

let arrayOpciones = new Array()
let revealBoolean = false

let songInfo
let artistasInfo
let artistasBoolean
let SNanswer = ""
let Aanswer = ""
let similitudSongNameAlcanzada = false
let similitudArtistAlcanzada = false

const state = {
    lista: [], lista2: [], posicion: 0, audioBoolean: false,
    screenModeBoolean: false, tiempoStartSong: 0, settings: {}
};

function iniciar() { 
    iniciarBotones()
    obtenerConfiguracion()
    obtenerLista()
}

function iniciarBotones() {
    let inicio=document.getElementById('start')
    let eliminada=document.getElementById('eliminada')
    let restaurar=document.getElementById('restaurar')

    inicio.addEventListener('click', randomSong, false)
    eliminada.addEventListener('click', accionEliminar)
    restaurar.addEventListener('click', restaurarTodo)

    info.innerHTML = " "
    video.addEventListener("ended", randomSong, false)
    document.getElementById('settings').onclick = function() {
        window.location.href = '../index.html';
    }

    document.getElementById('respuesta').addEventListener('input', (event) => {
        comprobarRespuesta(event.target.value);
    });

    let volumeSlider = document.getElementById("volumeSlider");

    volumeSlider.addEventListener("input", function() {
        var media = document.getElementById("media")
        var volumeValue = parseFloat(this.value);
        media.volume = volumeValue;
    });
}


function obtenerConfiguracion() {
    const settingsJSON = localStorage.getItem('settingsSA');        
    state.settings = JSON.parse(settingsJSON);
}

function actualizarOpciones(opcionArray) {
    borrarOpciones('selectCancion')
    state.lista = opcionArray.filter(opcion => !esEliminada(opcion))
    const selectCancion = document.getElementById('selectCancion')
    state.lista.forEach((opcion, index) => {
        const option = document.createElement('option')
        option.value = opcion.video720;
        option.textContent = `${opcion.animeRomajiName} ${typeSong[opcion.songType-1]} ${opcion.songTypeNumber}`
        selectCancion.appendChild(option)
    });

    const contador = document.getElementById('contador')
    contador.textContent = state.lista.length;
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
    songInfo = document.getElementById("NameInfo").innerHTML.slice(6)
    artistasInfo = document.getElementById("ArtistInfo").innerHTML.slice(8).split(/,\s*|\s*&amp;\s*|\s*\/;\s*|\s*・\s*|\s*feat\.\s*|\s*×\s*|\(|\)|\s*\/\s*/ ).map(artist => artist.trim()).filter(artist => artist.length > 0);

    artistasBoolean = new Array(artistasInfo.length).fill(false)
}

function toggleMode() {
    const element = document.body;
    const mode = state.screenModeBoolean ? "dark-mode" : "light-mode";
    element.className = mode;
    document.getElementById("screenMode").value = state.screenModeBoolean ? "Lightmode" : "Darkmode";
    state.screenModeBoolean = !state.screenModeBoolean;
}

function habilitarEdicion() {
    document.getElementById("respuesta").removeAttribute("readonly");
}

function deshabilitarEdicion() {
    document.getElementById("respuesta").setAttribute("readonly", "readonly");
}

document.getElementById("enlaceEliminar").addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.setItem('dataToSend', JSON.stringify(state.lista));
    window.open(this.href, '_blank');
  });


window.addEventListener("keydown", function(event) {
    if(event.keyCode == 46) {
        accionEliminar()
    }
});

window.addEventListener('load', iniciar);