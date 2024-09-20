async function obtenerLista() {
    const promesasLeerTexto = [];
    for (let i = state.settings.anoMin; i <= state.settings.anoMax; i++) {
        season.forEach((seasonItem) => {
            promesasLeerTexto.push(anisongdbDataSearch(seasonItem, i));
        });
    }

    await Promise.all(promesasLeerTexto);
    fetchMediaList(state.settings.user);
}
  
function fetchMediaList(username) {
    if (!username) return anadirOpciones3();
    
    const query = `
      query ($user: String) {
        MediaListCollection(userName: $user, type: ANIME) {
          lists { entries { status media { id } } }
        }
      }
    `;
    
    axios.post(apiUrlAnilist, { query, variables: { user: username } })
      .then(({ data }) => {
        const completedEntries = data?.data?.MediaListCollection?.lists?.flatMap(list => 
          list.entries.filter(entry => entry.status === "COMPLETED")) || [];
        const idsCoincidentes = guardarID(completedEntries);
        anadirOpciones2(idsCoincidentes);
      })
      .catch(console.error);
}

function actualizarOpciones(opcionArray) {
    state.lista = opcionArray.filter(opcion => !esEliminada(opcion));
    llenarSelect('selectCancion', state.lista);
    document.getElementById('contador').textContent = state.lista.length;
}

function llenarSelect(selectId, lista) {
    const select = document.getElementById(selectId);
    borrarOpciones(selectId);
    lista.forEach((opcion, index) => {
        const optionElement = document.createElement('option');
        optionElement.value = opcion.video720;
        optionElement.id = index + 1;
        optionElement.className = opcion.aniListId;
        optionElement.textContent = `${opcion.animeRomajiName} ${typeSong[opcion.songType - 1]} ${opcion.songTypeNumber}`;
        select.appendChild(optionElement);
    });
}

function anadirOpciones2(idsCoincidentes) {
    const cancionesFiltradas = state.lista2.filter(cancion => 
        idsCoincidentes.includes(cancion.aniListId) &&
        !estaEnPlaylist(cancion.video720)
    );
    state.lista = cancionesFiltradas;
    llenarSelect('selectCancion', cancionesFiltradas);
    document.getElementById("contador").textContent = state.lista.length;
}

function anadirOpciones3() {
    const cancionesFiltradas = state.lista2.filter(cancion => 
        !estaEnPlaylist(cancion.video720)
    );
    state.lista = cancionesFiltradas;
    llenarSelect('selectCancion', cancionesFiltradas);
    document.getElementById("contador").innerHTML = state.lista.length;
}

function cambiarCancion() {
    const selectCancion = document.getElementById('selectCancion');
    state.posicion = selectCancion.selectedIndex;
    info.innerHTML = " "
    anadirsrc(state.lista);
    document.title = selectCancion.options[state.posicion].text;
    document.getElementById('atributo').href = `${anilistURL}${selectCancion.options[state.posicion].className}`;
    actualizarInfo();
}

function estaEnPlaylist(videoId) {
    const playlist = JSON.parse(localStorage.getItem(playlistName)) || {};
    return videoId in playlist;
}

function borrarOpciones(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = '<option value="">--</option>';
}