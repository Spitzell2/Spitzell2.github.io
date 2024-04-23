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


let numCanciones
let tiempoCancion
let tiempoStartSong

let countBorrado = 0
let contAno=0
let numAnos=0
let cont7=0
let cont8=0

let arrayLista = new Array(4)
let arrayCantidad = new Array(4)

let cue

let arrayOpciones = new Array()

//Booleans
let randomBoolean = false
let eliminarBoolean = false
let loopBoolean = false
let screenModeBoolean = false
let allSoloAno = false
let variosAnos = true
let errorTrack = true
let errorBefore = false
let errorRemove = false
let audioBoolean = false

//Sliders
let minDiff = 0
let maxDiff = 100
let minAno
let maxAno
let minLet
let maxLet

let lista = null
let lista2 = new Array()
let lista4 = new Array()
let listaCancion = ''
let myArray = ''
let posicion = 0
let posicion2 = 0
let posicionTotal = 0
let cantidad = null
var cantidadTotal = 0
let anilistURL = 'https://anilist.co/anime/'
let anilistLink = ''
let direccion = "https://raw.githubusercontent.com/Spitzell2/Spitzell2.github.io/main/Listas/"
let anoElegido = ''
let seasonElegida = ''
let direccionGitHub = ''


function iniciar() { 
    var inicio=document.getElementById('start')
    var loop=document.getElementById('loop')
    var next=document.getElementById('next')
    var eliminada=document.getElementById('eliminada')
    var restaurar=document.getElementById('restaurar')

    inicio.addEventListener('click', randomSong, false)
    loop.addEventListener('click', accionLoop)
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

    const settingsJSON = localStorage.getItem('settingsSA');        
    const settings = JSON.parse(settingsJSON);
    tiempoCancion = settings.seconds
    minDiff = parseInt(settings.difficultyMin)
    maxDiff = parseInt(settings.difficultyMax)
    minAno = parseInt(settings.anoMin)
    maxAno = parseInt(settings.anoMax)
    username = settings.user

    //fetchMediaList(username)

    anadirAno()

}

function contarLineas(str, sep) {
    const arr = str.split(sep);
    return arr.filter(word => word !== '').length;
}

function darkMode() {
    if (!screenModeBoolean) {
        var element = document.body;
        element.className = "light-mode"
        screenMode.value = "Darkmode"
        screenModeBoolean = true
    } else {
        var element = document.body;
        element.className = "dark-mode"
        screenMode.value = "Lightmode"
        screenModeBoolean = false
    }
}

function lightMode() {
    var element = document.body
    element.className = "light-mode"
}

function actualizarOpciones(opcionArray) {
    cont8=0
    borrarOpciones('selectCancion')
    lista2 = new Array()
    for (i = 0; i < opcionArray.length; i++) {
        let eliminada2

        if (localStorage.getItem('playlistSp')) {
            
            let playlistSp = JSON.parse(localStorage.getItem('playlistSp'))
            eliminada2 = playlistSp[opcionArray[i].link] ? true : false
            if(!eliminada2) {
                    lista2[i-cont8] = opcionArray[i] 
                    const node = document.createElement("option")
                    const textnode = document.createTextNode(opcionArray[i].name + ' ' + opcionArray[i].tipo + ' ' + opcionArray[i].number)
                    
                    option = document.getElementById('selectCancion').appendChild(node)
                    option.value = opcionArray[i].link
                    option.id = i + 1
                    option.className = opcionArray[i].id
                    node.appendChild(textnode)  
            } else {
               cont8++
            }
        } else {
            lista2[i] = new Cancion(
                arrayOpciones[i][0],
                arrayOpciones[i][1],
                arrayOpciones[i][2],
                arrayOpciones[i][3],
                arrayOpciones[i][4],
                arrayOpciones[i][5],
                arrayOpciones[i][6],
                i+1,
                null,
                arrayOpciones[i][7],
                arrayOpciones[i][8],
                arrayOpciones[i][9],
                arrayOpciones[i][10]
            )
        anadirOpciones2(arrayOpciones, i)
        }
    }
    option = document.getElementById('selectCancion')
    document.getElementById("contador").innerHTML = cantidadTotal
}

function actualizarInfo() {
    var textarea = document.getElementById('respuesta');
    textarea.value = ""
    //Todas las Seasons
    if (variosAnos || allSoloAno) {
        addInfo(lista2)
    // Solo 1 Season
    } else {
        addInfo(lista)
    }
    
}

function addInfo(infoLista) {
    let tabla = document.getElementById('tablaCancion')
    cont = tabla.childElementCount

    //borra todo
    while (cont != 1) {
        tabla.removeChild(tabla.children[1])
        cont--
    }

    // Crea una nueva fila para cada dato
    let rowSongName = document.createElement('tr');
    let rowArtist = document.createElement('tr');
    let rowDiff = document.createElement('tr');

    tabla.appendChild(rowSongName);
    tabla.appendChild(rowArtist);
    tabla.appendChild(rowDiff);

    // Agrega cada dato como una celda de la fila correspondiente
    let cellSongName = document.createElement('td');
    let cellArtist = document.createElement('td');
    let cellDiff = document.createElement('td');

    rowSongName.appendChild(cellSongName);
    rowArtist.appendChild(cellArtist);
    rowDiff.appendChild(cellDiff);

    // Llena las celdas con la información correspondiente
    cellSongName.appendChild(document.createTextNode('Song: ' + infoLista[posicion - 1].songName));
    cellArtist.appendChild(document.createTextNode('Artist: ' + infoLista[posicion - 1].artist));
    cellDiff.appendChild(document.createTextNode('Difficulty: ' + infoLista[posicion - 1].difficulty));


    cellSongName.id = "songNameInfo"
    cellArtist.id = "artistInfo"
    
    // Oculta los nodos originales
    cellSongName.style.display = "none";
    cellArtist.style.display = "none";
    cellDiff.style.display = "none";

    romajiTitle = document.getElementById('romaji')
    romajiTitle.innerHTML = 'Romaji: ' + infoLista[posicion-1].name
    englishTitle = document.getElementById('english')
    englishTitle.innerHTML = 'English: ' + infoLista[posicion-1].nameEnglish
}

function ordenarAlf(array) {
    array2 = array.sort()
    return array2
}

window.addEventListener("keydown", function(event) {
    if(event.keyCode == 46) {
        // Manipula el evento con KeyboardEvent.key
        accionEliminar()
        randomSong()
    }
});


window.addEventListener('load', iniciar, false)