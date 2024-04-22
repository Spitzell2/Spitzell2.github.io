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
let sliderSections1
let slider1
let sliderSections2
let slider2
let sliderSections3
let slider3
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
    var reiniciar=document.getElementById('reiniciar')
    var loop=document.getElementById('loop')
    var next=document.getElementById('next')
    var before=document.getElementById('before')
    var rdm=document.getElementById('rdm')
    var eliminada=document.getElementById('eliminada')
    var restaurar=document.getElementById('restaurar')

    reiniciar.addEventListener('click', accionReiniciar, false)
    loop.addEventListener('click', accionLoop)
    next.addEventListener('click', nextSong)
    before.addEventListener('click', beforeSong)
    rdm.addEventListener('click', random)
    eliminada.addEventListener('click', accionEliminar)
    restaurar.addEventListener('click', restaurarTodo)

    info.innerHTML = "Anime: "
    video.addEventListener("ended", nextSong, false)
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
                    const textnode = document.createTextNode(opcionArray[i].name + ' OP ' + opcionArray[i].number)
                    
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

    
    nodeSongName = document.createElement("tr")
    nodeDiff = document.createElement("tr")
    nodeArtist = document.createElement("tr")
    nodeAno = document.createElement("tr")

    node3 = document.createElement("td")
    node5 = document.createElement("td")
    node6 = document.createElement("td")
    node7 = document.createElement("td")

    tabla.appendChild(nodeSongName)
    tr = tabla.lastChild
    tr.appendChild(node3)
    let songName = tr.lastChild
    textnode = document.createTextNode('Song: ' + infoLista[posicion-1].songName)
    songName.appendChild(textnode)
        
    tabla.appendChild(nodeArtist)
    tr = tabla.lastChild
    tr.appendChild(node6)
    let artist = tr.lastChild
    textnode = document.createTextNode('Artist: ' + infoLista[posicion-1].artist)
    artist.appendChild(textnode)
        
    tabla.appendChild(nodeDiff)
    tr = tabla.lastChild
    tr.appendChild(node5)
    let diff = tr.lastChild
    textnode = document.createTextNode('Diff: ' + infoLista[posicion-1].difficulty)
    diff.appendChild(textnode)
    
    tabla.appendChild(nodeAno)
    tr = tabla.lastChild
    tr.appendChild(node7)
    let anoTabla = tr.lastChild
    textnode = document.createTextNode('Año: ' + infoLista[posicion-1].animeAno)
    anoTabla.appendChild(textnode)

    romajiTitle = document.getElementById('romaji')
    romajiTitle.innerHTML = 'Romaji: ' + infoLista[posicion-1].name
    englishTitle = document.getElementById('english')
    englishTitle.innerHTML = 'English: ' + infoLista[posicion-1].nameEnglish
}


function ordenarAlf(array) {
    array2 = array.sort()
    return array2
}

function getVals(){
    var parent = this.parentNode
    var slides = parent.getElementsByTagName("input")
    var slide1 = parseFloat(slides[0].value)
    var slide2 = parseFloat(slides[1].value)
    minDiff = slide1
    maxDiff = slide2

    if( slide1 > slide2 ){ var tmp = slide2; slide2 = slide1; slide1 = tmp; }
    
    var displayElement = parent.getElementsByClassName("rangeValues")[0];
        displayElement.innerHTML = slide1 + " - " + slide2
  }

function getVals2(){
    var parent = this.parentNode
    var slides = parent.getElementsByTagName("input")
    var slide1 = parseFloat( slides[0].value )
    var slide2 = parseFloat( slides[1].value )

    if( slide1 > slide2 ){ var tmp = slide2; slide2 = slide1; slide1 = tmp; }

    minAno = slide1
    maxAno = slide2

    var displayElement = parent.getElementsByClassName("rangeValues2")[0];
        displayElement.innerHTML = slide1 + " - " + slide2
  }

  function getVals3(){
    // Get slider values

    var parent = this.parentNode;
    var slides = parent.getElementsByTagName("input");
    var slide1 = parseFloat( slides[0].value );
    var slide2 = parseFloat( slides[1].value );

    if(slide1 > slide2) {
        var tmp = slide2; slide2 = slide1; slide1 = tmp;
    }

    minLet = slide1
    maxLet = slide2
    var displayElement = parent.getElementsByClassName("valorletra")[0];
    displayElement.innerHTML = String.fromCharCode(65 + slide1) + " - " + String.fromCharCode(65 + slide2)
  }  
  
  
window.onload = function(){
    document.getElementById("elegirSeason").style.visibility = "hidden"

    sliders(sliderSections1, slider1, "range-slider", getVals)
    sliders(sliderSections2, slider2, "range-slider2", getVals2)
    sliders(sliderSections3, slider3, "sliderletra", getVals3)                 
}

function sliders(section, sladerName, tipo, funcion) {
    section = document.getElementsByClassName(tipo)
        for( var x = 0; x < section.length; x++ ){
            sladerName = section[x].getElementsByTagName("input")
          for( var y = 0; y < sladerName.length; y++ ){
            if( sladerName[y].type ==="range" ){
                sladerName[y].oninput = funcion
                sladerName[y].oninput()
            }
        }
    }      
}


window.addEventListener("keydown", function(event) {
    if(event.keyCode == 39) {
        // Manipula el evento con KeyboardEvent.key
        nextSong()
    } else if(event.keyCode == 37) {
        // Manipula el evento con KeyboardEvent.key
        beforeSong()
    } else if(event.keyCode == 46) {
        // Manipula el evento con KeyboardEvent.key
        accionEliminar()
        nextSong()
    }
});

window.addEventListener('load', iniciar, false)