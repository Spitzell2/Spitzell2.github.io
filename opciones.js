//Funcion que cambia la cancion al clikear en una opcion
function cambiarCancion()
{
    //removeTrack()
    errorTrack = true
    var selectCancion = document.getElementById('selectCancion')
    posicion = selectCancion.selectedIndex

    info.innerHTML = "Anime: " + selectCancion.options[posicion].text
    anadirsrc(lista2)
    document.title = selectCancion.options[posicion].text
    var pagAnilist=document.getElementById('atributo')
    pagAnilist.href = anilistURL + selectCancion.options[posicion].className
    actualizarInfo()
    
}

//Funcion que borra todas las opcions con el id pasado
function borrarOpciones(select) {
    const list = document.getElementById(select);

    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    const node2 = document.createElement("option")
    const textnode2 = document.createTextNode("--")
    node2.appendChild(textnode2)
    list.appendChild(node2)
}

function anadirAno() {
    lista2 = new Array()
    cantidad = 0
    cantidadTotal = 0

    variosAnos = minAno == maxAno ? false : true
    if(variosAnos) {
        leerVariosAnos()
        //document.getElementById("elegirSeason").style.visibility = "hidden"
    } else {
        //document.getElementById("elegirSeason").style.visibility = "visible"
        borrarOpciones('selectSeason')
        addSeasonOpcion("Winter")
        addSeasonOpcion("Spring")
        addSeasonOpcion("Summer")
        addSeasonOpcion("Fall")
        addSeasonOpcion("All")
    }
    
}

function addSeasonOpcion(temporada) {
    opcion = document.getElementById('selectSeason')

    season = document.createElement("option")
    textnode = document.createTextNode(temporada)
    season.appendChild(textnode)
    opcion.appendChild(season)
}

//Funcion que llama a leerTexto()
// Si se elige 'All' --> Lo llama 4 veces
// Si se elige cualquier otra --> Lo llama 1 vez
function anadirSeason() {
    direccionGitHub = ''
    var seleccion=document.getElementById('selectSeason')
    elegido = seleccion.selectedIndex

    allSoloAno = elegido == 5 ? true : false
    if (allSoloAno) {
        let direccion1 = ''
        let direccion2 = ''
        let direccion3 = ''
        let direccion4 = ''

        direccion1 = direccion + anoElegido + '/' + anoElegido + 'Winter' + 'OPs.txt'
        direccion2 = direccion + anoElegido + '/' + anoElegido + 'Spring' + 'OPs.txt'
        direccion3 = direccion + anoElegido + '/' + anoElegido + 'Summer' + 'OPs.txt'
        direccion4 = direccion + anoElegido + '/' + anoElegido + 'Fall' + 'OPs.txt'

        arrayOpciones = []
        leerTexto(direccion1, 0)
        leerTexto(direccion2, 1)
        leerTexto(direccion3, 2)
        leerTexto(direccion4, 3)

    } else {
        seasonElegida = seleccion.childNodes[elegido].value
        direccionGitHub = direccion + anoElegido + '/' + anoElegido + seasonElegida + 'OPs.txt'
        leerTexto(direccionGitHub, elegido-1)
    }
}

function leerVariosAnos() {
    contAno=0
    direccionGitHub = ''
    for (i=minAno; i<maxAno+1; i++) {
        leerCadaAno(i)
    }
}

function leerCadaAno(ano) {
    let direccion1 = ''
    let direccion2 = ''
    let direccion3 = ''
    let direccion4 = ''

    direccion1 = direccion + ano + '/' + ano + 'Winter' + 'OPs.txt'
    direccion2 = direccion + ano + '/' + ano + 'Spring' + 'OPs.txt'
    direccion3 = direccion + ano + '/' + ano + 'Summer' + 'OPs.txt'
    direccion4 = direccion + ano + '/' + ano + 'Fall' + 'OPs.txt'

    arrayOpciones = []
    leerTexto(direccion1, 0, ano)
    leerTexto(direccion2, 1, ano)
    leerTexto(direccion3, 2, ano)
    leerTexto(direccion4, 3, ano)
}

function leerTexto(direccion, temp, ano) {
    borrarOpciones('selectCancion')
    let listaCancion

    fetch(direccion)
        .then(function (response) {
            switch (response.status) {
                // status "OK"
                case 200:
                    return response.text();
                // status "Not Found"
                case 404:
                    throw response;
            }
        })
        .then(function (template) {
            listaCancion = template
            cantidad = contarLineas(listaCancion, '\n')
            myArray = listaCancion.split("\n")
            myArray.sort()
            let myArray2 = new Array(cantidad)

            cantidad2 = cantidad
            for (i = 0; i < cantidad2; i++) {     
                myArray[i] += "|" + ano
                myArray2[i] = myArray[i].split('|')
            }
            
            guardarLista(myArray2)

                if(variosAnos) {
                    anadirLista2(temp, cantidad)
                    cantidadTotal=arrayOpciones.length-cont7
                } else if(allSoloAno) {
                    anadirLista2(temp, cantidad)
                } else {
                    myArray2 = ordenarAlf(myArray2)
                    anadirLista(myArray2, temp, cantidad)
                }
        })
        .catch(function (response) {
            // "Not Found"
            //console.log(response.statusText);            
        });
}

//Modifica el array arrayOpciones cuando se elige 'All'
function guardarLista(myArray2) {
    arrayOpciones = ordenarAlf(arrayOpciones.concat(myArray2))
}

//Funcion que añade el array pasado a la variable 'lista'
function anadirLista(myArray2, temp, cantidad) {
    lista = new Array(cantidad)
    for (i = 0; i < cantidad; i++) {
        lista[i] = new Cancion(
            myArray2[i][0],
            myArray2[i][1],
            myArray2[i][2],
            myArray2[i][3],
            myArray2[i][4],
            myArray2[i][5],
            myArray2[i][6],
            i+1,
            temp,
            myArray2[i][7],
            myArray2[i][8],
            myArray2[i][9],
            myArray2[i][10]
        )
        anadirOpciones(myArray2[i], i, temp)
    }
}

function anadirOpciones(myArray2, i, temp) {
    const node = document.createElement("option")
    const textnode = document.createTextNode(myArray2[0] + ' ' + myArray2[1] + ' ' + myArray2[2])
    node.appendChild(textnode)
    option = document.getElementById('selectCancion').appendChild(node)
    option.value = myArray2[3]
    option.id = i + 1
    option.className = myArray2[7]
}

function anadirLista2(temp, cantidad) {
    cantidadTotal += cantidad
    anadirOpciones2(arrayOpciones,temp)
    lista4 = lista2
}

function anadirOpciones2(opcionArray,cont) {
    cont7=0
    if(cont==3) {
        borrarOpciones("selectCancion")
        for (j = 0; j < opcionArray.length; j++ ) {
            let eliminada2
            if (localStorage.getItem('playlistSp')) {
                let playlistSp = JSON.parse(localStorage.getItem('playlistSp'))
                eliminada2 = playlistSp[opcionArray[j][3]] ? true : false
                if(!eliminada2) {
                    lista2[j-cont7] = new Cancion(
                        opcionArray[j][0],
                        opcionArray[j][1],
                        opcionArray[j][2],
                        opcionArray[j][3],
                        opcionArray[j][4],
                        opcionArray[j][5],
                        opcionArray[j][6],
                        j+1,
                        null,
                        opcionArray[j][7],
                        opcionArray[j][8],
                        opcionArray[j][9],
                        opcionArray[j][10]
                        )

                        const node = document.createElement("option")
                        const textnode = document.createTextNode(opcionArray[j][0] + ' OP ' + opcionArray[j][2])
                        option = document.getElementById('selectCancion').appendChild(node)
                        option.value = opcionArray[j][3]
                        option.id = j + 1
                        option.className = opcionArray[j][7]
                        node.appendChild(textnode)             
                } else {
                    cont7++
                    cantidadTotal--
                }
            } else {
                lista2[j] = new Cancion(
                    arrayOpciones[j][0],
                    arrayOpciones[j][1],
                    arrayOpciones[j][2],
                    arrayOpciones[j][3],
                    arrayOpciones[j][4],
                    arrayOpciones[j][5],
                    arrayOpciones[j][6],
                    j+1,
                    null,
                    arrayOpciones[j][7],
                    arrayOpciones[j][8],
                    arrayOpciones[j][9],
                    )
                const node = document.createElement("option")
                const textnode = document.createTextNode(opcionArray[j][0] + ' OP ' + opcionArray[j][2])
                node.appendChild(textnode)
                option = document.getElementById('selectCancion').appendChild(node)
                option.value = opcionArray[j][3]
                option.id = j + 1
                option.className = opcionArray[j][7]
            }
        }
        document.getElementById("contador").innerHTML = cantidadTotal
    }
    
}