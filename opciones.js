function obtenerLista() {
    state.lista2 = [];
    state.cantidad = 0;
    state.cantidadTotal = 0;
    obtenerDirecciones();
}

function obtenerDirecciones() {
    state.direccionGitHub = '';
    for (let i = state.settings.anoMin; i <= state.settings.anoMax; i++) {
        season.forEach((seasonItem) => {
            typeSong.forEach((type) => {
                let direccion1 = `${direccion}${i}/${i}${seasonItem}${type}s.txt`;
                leerTexto(direccion1, season.indexOf(seasonItem), i);
            });
        });
    }
}

async function leerTexto(direccion1, temp, ano) {
    try {
        const response = await fetch(direccion1);
        if (response.status === 200) {
            const template = await response.text();
            const listaCancion = template;
            const lines = listaCancion.split("\n").sort();
            const myArray2 = lines.map(line => {
                const parts = line.split('|');
                parts.push(ano);
                return parts;
            });
            guardarLista(myArray2);
            anadirLista2(temp, lines.length);
            state.cantidadTotal = arrayOpciones.length - cont7;
        } else if (response.status === 404) {
            throw new Error('Not Found');
        }
    } catch (error) {
        console.error(error.message);
    }
}

function cambiarCancion() {
    const selectCancion = document.getElementById('selectCancion');
    state.posicion = selectCancion.selectedIndex;

    info.innerHTML = "Anime: " + selectCancion.options[state.posicion].text;
    anadirsrc(state.lista2);
    document.title = selectCancion.options[state.posicion].text;
    const pagAnilist = document.getElementById('atributo');
    pagAnilist.href = anilistURL + selectCancion.options[state.posicion].className;
    actualizarInfo();
}

function borrarOpciones(select) {
    const list = document.getElementById(select);
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }

    const node2 = document.createElement("option");
    const textnode2 = document.createTextNode("--");
    node2.appendChild(textnode2);
    list.appendChild(node2);
}

function guardarLista(myArray2) {
    arrayOpciones = ordenarAlf(arrayOpciones.concat(myArray2));
}

function anadirLista2(temp, cantidad) {
    state.cantidadTotal += cantidad;
    anadirOpciones(arrayOpciones, temp);
}

function anadirOpciones(opcionArray, cont) {
    if (cont !== 3) return;

    borrarOpciones("selectCancion");

    for (let j = 0; j < opcionArray.length; j++) {
        if (opcionArray[j][3] in (JSON.parse(localStorage.getItem('playlistSp')) || {})) {
            cont7++;
            state.cantidadTotal--;
            continue;
        }

        state.lista2[j - cont7] = new Cancion(
            opcionArray[j][0],
            opcionArray[j][1],
            opcionArray[j][2],
            opcionArray[j][3],
            opcionArray[j][4],
            opcionArray[j][5],
            opcionArray[j][6],
            j + 1,
            null,
            opcionArray[j][7],
            opcionArray[j][8],
            opcionArray[j][9],
            opcionArray[j][10]
        );

        const node = document.createElement("option");
        const textnode = document.createTextNode(opcionArray[j][0] + ' ' + opcionArray[j][1] + ' ' + opcionArray[j][2]);
        option = document.getElementById('selectCancion').appendChild(node);
        option.value = opcionArray[j][3];
        option.id = j + 1;
        option.className = opcionArray[j][7];
        node.appendChild(textnode);
    }
    document.getElementById("contador").innerHTML = state.cantidadTotal;
}