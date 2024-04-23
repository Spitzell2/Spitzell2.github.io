function accionLoop() {
    if (!loopBoolean) {
        loopBoolean = true
        loop.value = "Unloop"
    } else {
        loopBoolean = false
        loop.value = "Loop"
    }
}

function randomSong() {
    if (variosAnos) {
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

    } else {
        var seleccion = document.getElementById('selectCancion')
        opciones = seleccion.options.length - 1
        let x = lista[posicion-1].id
        eliminadaBoolean = true
        while (x == lista[posicion-1].id || eliminadaBoolean) {
            x = Math.floor((Math.random() * opciones+1));
            eliminadaBoolean = false
            if (lista[x-1].eliminada == true) {
                x == lista[posicion+1].id
                eliminadaBoolean = true
            }
        }
        posicion = x
        if(filtroDiff(lista)) {
            anadirsrc(lista)
        } else {
            randomSong()
        }
        similitudSongNameAlcanzada = false;
        similitudArtistAlcanzada = false;
        actualizarInfo()
        comprobarRespuestaSongName('')
        comprobarRespuestaArtist('')
    }
}

function accionEliminar() {
    deletePerm()
    cantidadTotal--
    actualizarOpciones(lista2)
    eliminarBoolean = true
    randomSong()
}