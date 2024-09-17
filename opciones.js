async function obtenerLista() {
    const promesasLeerTexto = [];

    for (let i = state.settings.anoMin; i <= state.settings.anoMax; i++) {
        season.forEach((seasonItem) => {
            promesasLeerTexto.push(anisongdbDataSearch(seasonItem, i));
        });
    }

    // Espera a que todas las promesas generadas se resuelvan
    await Promise.all(promesasLeerTexto);
    let userAnilist = state.settings.user;
    fetchMediaList(userAnilist);
}

function fetchMediaList(username) {
    if (username === "") {
        anadirOpciones3()
    } else {
        const apiUrl = 'https://graphql.anilist.co';
        const variables = {
            user: username
        };
        const query = `
        query ($user: String) {
            MediaListCollection(userName: $user, type: ANIME) {
                lists {
                    entries {
                        status
                        media {
                            id
                        }
                    }
                }
            }
        }
        `;
        
        axios.post(apiUrl, {
            query: query,
            variables: variables
        })
        .then(response => {
            // Verifica que response.data.data.MediaListCollection.lists sea un array
            const lists = response.data.data.MediaListCollection.lists;
            if (!Array.isArray(lists)) {
                console.error("Error: lists is not an array");
                return;
            }

            // Filtra las entradas con status "COMPLETED" de todas las listas
            const completedEntries = lists.flatMap(list =>
                Array.isArray(list.entries) ? list.entries.filter(entry => entry.status === "COMPLETED") : []
            );

            // Procesa los IDs de las entradas completadas
            const idsCoincidentes = guardarID(completedEntries);

            // Llama a la función para añadir opciones, pasando los IDs filtrados
            anadirOpciones2(idsCoincidentes);
        })
        .catch(error => {
            console.error("Error in processing:", error);
        });
    }
}

function anadirOpciones(opcionArray, cont) {
    borrarOpciones("selectCancion");

    state.lista2 = opcionArray
        .filter((opcion) => {
            const tipo = opcion[1];
            return (
                (tipo === "OP" && state.settings.op) ||
                (tipo === "ED" && state.settings.ed) ||
                (tipo === "IN" && state.settings.in)
            );
        })
}

function anadirOpciones2(idsCoincidentes) {
    borrarOpciones("selectCancion");
    let ii = 0;
    const selectCancion = document.getElementById('selectCancion');

    state.lista2.forEach((cancion, j) => {
        if (idsCoincidentes.includes(cancion.aniListId) && !(cancion.video720 in (JSON.parse(localStorage.getItem('playlistSp')) || {}))) {
            state.lista[ii] = cancion;
            const option = document.createElement("option");
            option.value = cancion.video720;
            option.id = j + 1;
            option.className = cancion.aniListId;
            option.textContent = cancion.animeRomajiName + ' ' + typeSong[cancion.songType-1] + ' ' + cancion.songTypeNumber;

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

        if (!(state.lista2[j].video720 in (JSON.parse(localStorage.getItem('playlistSp')) || {}))) {
            state.lista[ii] = state.lista2[j];
            const node = document.createElement("option");
        
            // Crea el textnode
            const textContent = state.lista2[j].animeRomajiName + ' ' + typeSong[state.lista2[j].songType-1] + ' ' + state.lista2[j].songTypeNumber;
            const textnode = document.createTextNode(textContent);
        
            const option = document.getElementById('selectCancion').appendChild(node);
            option.value = state.lista2[j].video720;
            option.id = j + 1;
            option.className = state.lista2[j].aniListId;
            node.appendChild(textnode);
            state.cantidadTotal++;
            ii++;
        }
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