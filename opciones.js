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
                if (parts.length >= 6) { // Verifica si la línea tiene al menos 6 partes
                    parts.push(ano);  // Añade el año al final
                    return parts;
                } else {
                    console.warn(`Línea malformada: ${line}`);
                    return null; // O maneja de otra manera las líneas malformadas
                }
            }).filter(Boolean); // Filtra cualquier `null` que haya sido devuelto por líneas malformadas
            
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
    if (cont !== 3) return
    borrarOpciones("selectCancion")
    
    state.lista2 = opcionArray.map((opcion, index) => {
        return new Cancion(
            opcion[0],
            opcion[1],
            opcion[2],
            opcion[3],
            opcion[4],
            opcion[5],
            opcion[6],
            index + 1,
            null,
            opcion[7],
            opcion[8],
            opcion[9],
            opcion[10]
        )
    })
}

function anadirOpciones2(idsCoincidentes) {
    borrarOpciones("selectCancion");
    let ii = 0;
    const selectCancion = document.getElementById('selectCancion');

    state.lista2.forEach((cancion, j) => {
        if (idsCoincidentes.includes(cancion.anilistID) && !(cancion.link in (JSON.parse(localStorage.getItem('playlistSp')) || {}))) {
            state.lista[ii] = cancion;
            const option = document.createElement("option");
            option.value = cancion.link;
            option.id = j + 1;
            option.className = cancion.id;
            option.textContent = cancion.name + ' ' + cancion.tipo + ' ' + cancion.number;

            selectCancion.appendChild(option);
            state.cantidadTotal++;
            ii++;
        }
    });

    document.getElementById("contador").textContent = state.cantidadTotal;
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

    info.innerHTML = " "
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