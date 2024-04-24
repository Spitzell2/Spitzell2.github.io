function randomSong() {
    const seleccion = document.getElementById('selectCancion');
    const opciones = seleccion.options.length - 1;
    let x = state.posicion;
    state.eliminadaBoolean = true;

    while (x === state.posicion) {
        x = Math.floor(Math.random() * opciones + 1);
    }
    state.posicion = x;

    if (filtroDiff(state.lista2)) {
        anadirsrc(state.lista2);
    } else {
        randomSong();
    }

    similitudSongNameAlcanzada = false;
    similitudArtistAlcanzada = false;
    actualizarInfo();
    comprobarRespuestaSongName('');
    comprobarRespuestaArtist('');
}

function accionEliminar() {
    deletePerm();
    state.cantidadTotal--;
    actualizarOpciones(state.lista2);
    state.eliminarBoolean = true;
    randomSong();
}

function deletePerm() {
    let playlistSp = JSON.parse(localStorage.getItem('playlistSp') || '{}');
    let webm = state.lista2[state.posicion - 1].link;
    let name = state.lista2[state.posicion - 1].name;

    playlistSp[webm] = { eliminada: true, name: name };
    localStorage.setItem('playlistSp', JSON.stringify(playlistSp));
}

function restaurarTodo() {
    if (confirm("¿Estás seguro de que quieres restaurar todas las canciones elimindas?")) {
        localStorage.removeItem('playlistSp')
      } else {

      }
}

function filtroDiff(diffLista) {
    const currentSong = diffLista[state.posicion - 1];
    const diffBoolean = currentSong.difficulty > state.settings.difficultyMin && currentSong.difficulty < state.settings.difficultyMax;

    if (diffBoolean) {
        document.title = currentSong.name;
        info.innerHTML = `Anime: ${currentSong.name} ${currentSong.tipo} ${currentSong.number}`;
        const pagAnilist = document.getElementById('atributo');
        pagAnilist.href = anilistURL + currentSong.anilistID;
    }

    return diffBoolean;
}
