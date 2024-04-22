function accionReiniciar()
{
  video.currentTime = 0;
  video.play()
}

function accionLoop() {
    if (!loopBoolean) {
        loopBoolean = true
        loop.value = "Unloop"
    } else {
        loopBoolean = false
        loop.value = "Loop"
    }
}

function random() {
    if (!randomBoolean) {
        randomBoolean = true
        rdm.value = "Unrandom"
    } else {
        randomBoolean = false
        rdm.value = "Random"
    }
}

function nextSong() {
    if (!loopBoolean) {
        if (!randomBoolean) {          
            if(variosAnos) {
                var seleccion = document.getElementById('selectCancion')
                cantidadTotal = seleccion.options.length-1
                y = posicion+1 > cantidadTotal ? 1 : posicion+1
                posicion = y
                if(filtroDiff(lista2) && filtroLetra(lista2)) {
                    //errorRemove = removeTrack()
                    anadirsrc(lista2)
                } else {
                    nextSong()
                }
                actualizarInfo()
                if(errorRemove) {
                    setTimeout(function(){
                        var video = document.getElementById("video")
                        //addTrack(lista2[posicion-1].name, video.duration)
                    }, 3000)
                }

            } else {
                if(eliminarBoolean) {
                    y = posicion > cantidad ? 1 : posicion
                    eliminarBoolean = false
                } else {
                    y = posicion+1 > cantidad ? 1 : posicion+1
                }
                posicion = y
 
                if(filtroDiff(lista) && filtroLetra(lista)) {
                    //errorRemove = removeTrack()
                    anadirsrc(lista)
                } else {
                    nextSong()
                }
                actualizarInfo()

                if(errorRemove) {
                    setTimeout(function(){
                        var video = document.getElementById("video")
                        //addTrack(lista[posicion-1].name, video.duration)
                    }, 3000)
                }
            }
        } else {
            randomSong()
        }
    } else {
        accionReiniciar()
    }
 }

function beforeSong() {
    
    if (!loopBoolean) {
        if(variosAnos) {
                var seleccion = document.getElementById('selectCancion')
                cantidadTotal = seleccion.options.length-1
                y = posicion-2 < 0 ? cantidadTotal : posicion-1
                posicion = y

                errorBefore = false
                if(filtroDiff(lista2) && filtroLetra(lista2)) {
                    //errorRemove = removeTrack()
                    anadirsrc(lista2)
                } else {
                    beforeSong()
                }
                actualizarInfo()
                if(errorRemove) {
                    setTimeout(function(){
                        var video = document.getElementById("video")
                        //addTrack(lista2[posicion-1].name, video.duration)
                    }, 3000)
                }
        } else {
            y = posicion-2 < 0 ? cantidad : posicion-1
            posicion = y

            if(filtroDiff(lista) && filtroLetra(lista)) {
                //errorRemove = removeTrack()
                anadirsrc(lista)
            } else {
                beforeSong()
            }
            actualizarInfo()
            if(errorRemove) {
                setTimeout(function(){
                    var video = document.getElementById("video")
                    //addTrack(lista[posicion-1].name, video.duration)
                }, 3000)
            }
        }
    } else {
        accionReiniciar()
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

            if(filtroDiff(lista2) && filtroLetra(lista2)) {
                //errorRemove = removeTrack()
                anadirsrc(lista2)
            } else {
                randomSong()
            }
            actualizarInfo()
            if(errorRemove) {
                setTimeout(function(){
                    var video = document.getElementById("video")
                    //addTrack(lista2[posicion-1].name, video.duration)
                }, 3000)
            }

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
        if(filtroDiff(lista) && filtroLetra(lista)) {
            //errorRemove = removeTrack()
            anadirsrc(lista)
        } else {
            randomSong()
        }
        actualizarInfo()
        if(errorRemove) {
            setTimeout(function(){
                var video = document.getElementById("video")
                //addTrack(lista[posicion-1].name, video.duration)
            }, 3000)
        }
    }
}

function accionEliminar() {
    deletePerm()
    cantidadTotal--
    actualizarOpciones(lista2)
    eliminarBoolean = true
    nextSong()
}