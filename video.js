function randomSong() {
    let x;
    do { x = Math.floor(Math.random() * (state.lista.length)) } while (x === state.posicion);
    state.posicion = x;
    filtroDiff(state.lista) ? anadirsrc(state.lista) : randomSong();

    similitudSongNameAlcanzada = false
    similitudArtistAlcanzada = false
    actualizarInfo();
}

function accionEliminar() {
    deletePerm()
    actualizarOpciones(state.lista)
    randomSong()
}

function deletePerm() {
    let playlistSp = JSON.parse(localStorage.getItem('playlistSp') || '{}');
    let webm = state.lista[state.posicion - 1].video720
    let name = state.lista[state.posicion - 1].animeRomajiName
    playlistSp[webm] = { eliminada: true, name: name }
    localStorage.setItem('playlistSp', JSON.stringify(playlistSp))
}

function restaurarTodo() {
    if (confirm("¿Restaurar todas las canciones eliminadas?")) {
        localStorage.removeItem('playlistSp');
        actualizarOpciones(state.lista2);
      }
}

function filtroDiff(diffLista) {
    const { songDifficulty, aniListId, animeEnglishName } = diffLista[state.posicion - 1];
    const { difficultyMin, difficultyMax } = state.settings;
    const diffBoolean = parseFloat(songDifficulty) > parseFloat(difficultyMin) && parseFloat(songDifficulty) < parseFloat(difficultyMax);
  
    if (diffBoolean) {
      document.title = animeEnglishName;
      document.getElementById('atributo').href = anilistURL + aniListId;
    }
    return diffBoolean;
}

function esEliminada(cancion) {
    if (localStorage.getItem('playlistSp')) {
        const playlistSp = JSON.parse(localStorage.getItem('playlistSp'));
        return playlistSp[cancion.video720] ? true : false;
    }
    return false;
}

function guardarID(entries) {
    const id1Set = new Set(state.lista2.map(element => element.aniListId));
    const id2Set = new Set(entries.map(entry => parseInt(entry.media.id, 10)));
    return [...id1Set].filter(id => id2Set.has(id));
}


function revealPhase() {
    deshabilitarEdicion()
    info.innerHTML = selectCancion.options[state.posicion].text;
    setTimeout(function() {
        SNanswer = ""
        Aanswer = ""
        info.innerHTML = ""
        let respuesta = document.getElementById('SAAnswer')
        respuesta.innerHTML = 'Song Name: ' + SNanswer + '<br>Artist: ' + Aanswer
        randomSong()
        habilitarEdicion()
    }, 7000)
}

function createPlayer(mediaType) {
    const mediaContainer = document.getElementById("infovideo");
    let media;
    let source;

    if (mediaType === "video") {
        media = document.createElement("video");
        media.width = "700";
        media.height = "350";
        source = document.createElement("source");
    } else {
        media = document.createElement("audio");
        source = document.createElement("source");
    }
    media.id = "media"
    mediaContainer.innerHTML = "";
    media.appendChild(source);
    mediaContainer.appendChild(media);

    return media;
}

function switchMedia() {
    const radioButtons = document.getElementsByName("media");
    const mediaType = radioButtons[0].checked ? "video" : "audio";
    state.audioBoolean = mediaType === "audio";
    const player = createPlayer(mediaType);
    player.src = state.lista[state.posicion - 1]?.[state.audioBoolean ? "audio" : "video720"] || "";
    player.play();
    player.addEventListener("ended", randomSong);
}

function anadirsrc(src) {
    const player = createPlayer(state.audioBoolean ? "audio" : "video");
    player.src = catboxURL + src[state.posicion - 1]?.[state.audioBoolean ? "auudio" : "video720"] || "";
    player.addEventListener("loadedmetadata", function() {
        const maxStart = Math.min(60, Math.max(0, player.duration - 30));
        state.tiempoStartSong = Math.random() * maxStart
        player.currentTime = state.tiempoStartSong
        player.play()
        player.addEventListener('timeupdate', function checkTime() {
            if (player.currentTime >= state.tiempoStartSong + parseInt(state.settings.seconds)) {
                const songNameInfo = document.getElementById("songNameInfo");
                NameInfo.style.display = "block";
                const artistInfo = document.getElementById("artistInfo");
                ArtistInfo.style.display = "block";
                revealPhase()
                player.removeEventListener('timeupdate', checkTime)
            }
        });
    });
}
