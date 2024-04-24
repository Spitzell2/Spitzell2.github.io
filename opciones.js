const season = ['Winter', 'Spring', 'Summer', 'Fall'];
const typeSong = ['OP', 'ED', 'IN'];


function obtenerLista() {
    lista2 = new Array()
    cantidad = 0
    cantidadTotal = 0
    obtenerDirecciones()
}

function obtenerDirecciones() {
    contAno = 0
    direccionGitHub = ''
    let direccion1 = ''
    for (i=minAno; i<maxAno+1; i++) {
        for (j=0; j<=season.length; j++) {
            for (k=0; k<=typeSong.length; k++) {
                direccion1 = direccion + i + '/' + i + season[j] + typeSong[k] + 's.txt'
                arrayOpciones = []
                leerTexto(direccion1, j, i)
                direccion1 = ''
            }
        }
    }
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
            anadirLista2(temp, cantidad)
            cantidadTotal=arrayOpciones.length-cont7
        })
        .catch(function (response) {
            // "Not Found"
            console.log(response.statusText);            
        });
}

function cambiarCancion() {
    var selectCancion = document.getElementById('selectCancion')
    posicion = selectCancion.selectedIndex

    info.innerHTML = "Anime: " + selectCancion.options[posicion].text
    anadirsrc(lista2)
    document.title = selectCancion.options[posicion].text
    var pagAnilist=document.getElementById('atributo')
    pagAnilist.href = anilistURL + selectCancion.options[posicion].className
    actualizarInfo()
}

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

function guardarLista(myArray2) {
    arrayOpciones = ordenarAlf(arrayOpciones.concat(myArray2))
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
                        const textnode = document.createTextNode(opcionArray[j][0] + ' ' + opcionArray[j][1] + ' ' + opcionArray[j][2])
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
                const textnode = document.createTextNode(opcionArray[j][0] + ' ' + opcionArray[j][1] + ' ' + opcionArray[j][2])
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