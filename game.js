class Cancion {
    constructor( name, tipo, number, link, songName, artist,
        difficulty, id, season, anilistID, nameEnglish, linkmp3, animeAno) {
        this.name = name
        this.tipo = tipo
        this.number = number
        this.link = link
        this.songName = songName
        this.artist = artist
        this.difficulty = difficulty
        this.id = id
        this.season = season
        this.anilistID = anilistID
        this.nameEnglish = nameEnglish
        this.linkmp3 = linkmp3
        this.animeAno = animeAno
    }
}

let lista2 = new Array()

let numCanciones

let countBorrado = 0
let contAno=0
let numAnos=0
let cont7=0
let cont8=0

let arrayLista = new Array(4)
let arrayCantidad = new Array(4)

let arrayOpciones = new Array()

//Booleans
let randomBoolean = false
let eliminarBoolean = false

//Sliders
let minLet
let maxLet

let lista = null
let lista4 = new Array()
let listaCancion = ''
let myArray = ''
let cantidad = null
let anilistURL = 'https://anilist.co/anime/'
let anilistLink = ''
let direccion = "https://raw.githubusercontent.com/Spitzell2/Spitzell2.github.io/main/Listas/"
let anoElegido = ''
let direccionGitHub = ''


const state = {
    lista2: [],
    posicion: 0,
    cantidadTotal: 0,
    audioBoolean: false,
    screenModeBoolean: false,
    tiempoStartSong: 0,
    settings: {}
};

function iniciar() { 
    iniciarBotones()
    obtenerConfiguracion()
    //fetchMediaList(state.settings.user)
    obtenerLista()
}

function iniciarBotones() {
    let inicio=document.getElementById('start')
    let next=document.getElementById('next')
    let eliminada=document.getElementById('eliminada')
    let restaurar=document.getElementById('restaurar')

    inicio.addEventListener('click', randomSong, false)
    next.addEventListener('click', randomSong)
    eliminada.addEventListener('click', accionEliminar)
    restaurar.addEventListener('click', restaurarTodo)
    info.innerHTML = "Anime: "
    video.addEventListener("ended", randomSong, false)

    var textarea = document.getElementById('respuesta');
    textarea.addEventListener('input', function() {
        var contenido = this.value;
        comprobarRespuestaSongName(contenido);
        comprobarRespuestaArtist(contenido);
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
    // Borrar opciones actuales del select
    borrarOpciones('selectCancion');

    // Filtrar las canciones que no están eliminadas
    state.lista2 = opcionArray.filter(opcion => !esEliminada(opcion));

    // Llenar el select con las opciones disponibles
    const selectCancion = document.getElementById('selectCancion');
    state.lista2.forEach((opcion, index) => {
        const option = document.createElement('option');
        option.value = opcion.link;
        option.textContent = `${opcion.name} ${opcion.tipo} ${opcion.number}`;
        selectCancion.appendChild(option);
    });

    // Actualizar el contador
    actualizarContador();
}

// Función para actualizar el contador
function actualizarContador() {
    const contador = document.getElementById('contador');
    contador.textContent = state.lista2.length;
}

function actualizarInfo() {
    var textarea = document.getElementById('respuesta');
    textarea.value = ""
    addInfo(state.lista2)
}

function addInfo(infoLista) {
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

    cellSongName.appendChild(document.createTextNode('Song: ' + infoLista[state.posicion - 1].songName));
    cellArtist.appendChild(document.createTextNode('Artist: ' + infoLista[state.posicion - 1].artist));
    cellDiff.appendChild(document.createTextNode('Difficulty: ' + infoLista[state.posicion - 1].difficulty));


    cellSongName.id = "songNameInfo"
    cellArtist.id = "artistInfo"

    cellSongName.style.display = "none";
    cellArtist.style.display = "none";
    cellDiff.style.display = "none";

    romajiTitle = document.getElementById('romaji')
    romajiTitle.innerHTML = 'Romaji: ' + infoLista[state.posicion-1].name
    englishTitle = document.getElementById('english')
    englishTitle.innerHTML = 'English: ' + infoLista[state.posicion-1].nameEnglish
}

function ordenarAlf(array) {
    array2 = array.sort()
    return array2
}

function darkMode() {
    if (!state.screenModeBoolean) {
        var element = document.body;
        element.className = "light-mode"
        state.screenMode.value = "Darkmode"
        state.screenModeBoolean = true
    } else {
        var element = document.body;
        element.className = "dark-mode"
        state.screenMode.value = "Lightmode"
        state.screenModeBoolean = false
    }
}

function lightMode() {
    var element = document.body
    element.className = "light-mode"
}

window.addEventListener('load', iniciar, false)