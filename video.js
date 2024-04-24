function randomSong() {
    var seleccion = document.getElementById('selectCancion')
    opciones = seleccion.options.length - 1
    let x = posicion
    eliminadaBoolean = true
    while (x == posicion) {
        x = Math.floor((Math.random() * opciones+1))
    }
    posicion = x

    if(filtroDiff(lista2)) {
        anadirsrc(lista2)
    } else {
        randomSong()
    }

    similitudSongNameAlcanzada = false;
    similitudArtistAlcanzada = false;
    actualizarInfo()
    comprobarRespuestaSongName('')
    comprobarRespuestaArtist('')
}

function accionEliminar() {
    deletePerm()
    cantidadTotal--
    actualizarOpciones(lista2)
    eliminarBoolean = true
    randomSong()
}