let songInfo
let artistasInfo
let artistasBoolean
let SNanswer = ""
let Aanswer = ""

let listaIDs
let idsCoincidentes
let numCanciones
let arrayOpciones = new Array()

let anilistURL = 'https://anilist.co/anime/'
let catboxURL = "https://nl.catbox.video/"

let similitudSongNameAlcanzada = false
let similitudArtistAlcanzada = false

const season = ['Winter', 'Spring', 'Summer', 'Fall']
const typeSong = ['OP', 'ED', 'IN']


const state = {
    lista: [],
    lista2: [],
    posicion: 0,
    cantidadTotal: 0,
    audioBoolean: false,
    screenModeBoolean: false,
    tiempoStartSong: 0,
    settings: {}
}

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

function contarLineas(str, sep) {
    const arr = str.split(sep);
    return arr.filter(word => word !== '').length;
}


function esEliminada(cancion) {
    if (localStorage.getItem('playlistSp')) {
        const playlistSp = JSON.parse(localStorage.getItem('playlistSp'));
        return playlistSp[cancion.link] ? true : false;
    }
    return false;
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

function actualizarInfo() {
    var textarea = document.getElementById('respuesta');
    textarea.value = ""
    let tabla = document.getElementById('tablaCancion')
    cont = tabla.childElementCount

    while (cont != 1) {
        tabla.removeChild(tabla.children[1])
        cont--
    }

    let rowSongName = document.createElement('tr');
    let rowArtist = document.createElement('tr');
    let rowDiff = document.createElement('tr');

    tabla.appendChild(rowSongName);
    tabla.appendChild(rowArtist);
    tabla.appendChild(rowDiff);

    let cellSongName = document.createElement('td');
    let cellArtist = document.createElement('td');
    let cellDiff = document.createElement('td');

    rowSongName.appendChild(cellSongName);
    rowArtist.appendChild(cellArtist);
    rowDiff.appendChild(cellDiff);

    cellSongName.appendChild(document.createTextNode('Song: ' + state.lista[state.posicion - 1].songName));
    cellArtist.appendChild(document.createTextNode('Artist: ' + state.lista[state.posicion - 1].songArtist));
    cellDiff.appendChild(document.createTextNode('Diff: ' + state.lista[state.posicion - 1].songDifficulty + '%' ));

    cellSongName.id = "songNameInfo"
    cellArtist.id = "artistInfo"

    cellSongName.style.display = "none";
    cellArtist.style.display = "none";
    cellDiff.style.display = "none";

    songInfo = document.getElementById("songNameInfo").innerHTML.slice(6)
    artistasInfo = document.getElementById("artistInfo").innerHTML.slice(8).split(/,\s*|\s*&amp;\s*|\s*\/;\s*|\s*・\s*|\s*feat\.\s*|\s*×\s*|\(|\)|\s*\/\s*/ ).map(artist => artist.trim()).filter(artist => artist.length > 0);

    artistasBoolean = new Array(artistasInfo.length).fill(false)
}

function darkMode() {
    if (!state.screenModeBoolean) {
        var element = document.body;
        element.className = "light-mode"
        let botonScreenmode = document.getElementById("screenMode")
        botonScreenmode.value = "Darkmode"
        state.screenModeBoolean = true
    } else {
        var element = document.body;
        element.className = "dark-mode"
        let botonScreenmode = document.getElementById("screenMode")
        botonScreenmode.value = "Lightmode"
        state.screenModeBoolean = false
    }
}

function lightMode() {
    var element = document.body
    element.className = "light-mode"
}

function habilitarEdicion() {
    document.getElementById("respuesta").removeAttribute("readonly");
}

function deshabilitarEdicion() {
    document.getElementById("respuesta").setAttribute("readonly", "readonly");
}

window.addEventListener('load', iniciar, false)