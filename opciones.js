async function obtenerLista() {
    const promesasLeerTexto = [];

    for (let i = state.settings.anoMin; i <= state.settings.anoMax; i++) {
        season.forEach((seasonItem) => {
            typeSong.forEach((type) => {
                let direccion1 = `${direccion}${i}/${i}${seasonItem}${type}s.txt`;
                promesasLeerTexto.push(leerTexto(direccion1, season.indexOf(seasonItem), i));
            });
        });
    }

    // Espera a que todas las promesas generadas por leerTexto se resuelvan
    await Promise.all(promesasLeerTexto);
    let userAnilist = state.settings.user
    fetchMediaList(userAnilist);
}

async function leerTexto(direccion1, temp, ano) {
    try {
        const response = await fetch(direccion1);
        if (response.status === 200) {
            const template = await response.text();
            const listaCancion = template;
            const lines = listaCancion.split("\n").sort();
            const myArray = lines.map(line => {
                const parts = line.split('|');
                parts.push(ano);
                return parts;
            });
            arrayOpciones = (arrayOpciones.concat(myArray)).sort();
            anadirOpciones(arrayOpciones, temp);
        } else if (response.status === 404) {
            throw new Error('Not Found');
        }
    } catch (error) {
        console.error(error.message);
    }
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
    }
}


function anadirOpciones2(idsCoincidentes) {
    borrarOpciones("selectCancion");
    let ii = 0
    for (let j = 0; j < state.lista2.length; j++) {
        if (idsCoincidentes.includes(state.lista2[j].anilistID)) {
            state.lista[ii] = state.lista2[j]
            const node = document.createElement("option");
            const textnode = document.createTextNode(state.lista2[j].name + ' ' + state.lista2[j].tipo + ' ' + state.lista2[j].number);
            option = document.getElementById('selectCancion').appendChild(node);
            option.value = state.lista2[j].link;
            option.id = j + 1;
            option.className = state.lista2[j].id;
            node.appendChild(textnode);
            state.cantidadTotal++;
            ii++
        }

    }
    document.getElementById("contador").innerHTML = state.cantidadTotal;
}

function anadirOpciones3() {
    borrarOpciones("selectCancion");
    let ii = 0
    for (let j = 0; j < state.lista2.length; j++) {
        state.lista[ii] = state.lista2[j]
        const node = document.createElement("option");
        const textnode = document.createTextNode(state.lista2[j].name + ' ' + state.lista2[j].tipo + ' ' + state.lista2[j].number);
        option = document.getElementById('selectCancion').appendChild(node);
        option.value = state.lista2[j].link;
        option.id = j + 1;
        option.className = state.lista2[j].id;
        node.appendChild(textnode);
        state.cantidadTotal++;
        ii++
    }
    document.getElementById("contador").innerHTML = state.cantidadTotal;
}

function cambiarCancion() {
    const selectCancion = document.getElementById('selectCancion');
    state.posicion = selectCancion.selectedIndex;

    info.innerHTML = "Anime: " + selectCancion.options[state.posicion].text;
    anadirsrc(state.lista);
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