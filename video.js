function randomSong() {
    const seleccion = document.getElementById('selectCancion');
    const opciones = seleccion.options.length - 1;
    let x = state.posicion;
    state.eliminadaBoolean = true;

    while (x === state.posicion) {
        x = Math.floor(Math.random() * opciones + 1);
    }

    state.posicion = x;
    if (filtroDiff(state.lista)) {
        anadirsrc(state.lista)
    } else {
        randomSong()
    }
    similitudSongNameAlcanzada = false
    similitudArtistAlcanzada = false
    actualizarInfo()
}

function accionEliminar() {
    deletePerm()
    state.cantidadTotal--
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
    if (confirm("¿Estás seguro de que quieres restaurar todas las canciones elimindas?")) {
        localStorage.removeItem('playlistSp')
      } else {

      }
}

function filtroDiff(diffLista) {
    const currentSong = diffLista[state.posicion - 1];
    const songDifficulty = parseFloat(currentSong.songDifficulty);
    const minDifficulty = parseFloat(state.settings.difficultyMin);
    const maxDifficulty = parseFloat(state.settings.difficultyMax);
    let diffBoolean = (songDifficulty > minDifficulty) && (songDifficulty < maxDifficulty);

    if (diffBoolean) {
        document.title = currentSong.animeEnglishName;
        const pagAnilist = document.getElementById('atributo');
        pagAnilist.href = anilistURL + currentSong.aniListId;
    }
    return diffBoolean;
}

function guardarID(entries) {
    const id1Set = new Set();
    const id2Set = new Set();

    // Llena id1Set con los IDs de state.lista2
    state.lista2.forEach(element => {
        id1Set.add(element.aniListId);
    });

    // Llena id2Set con los IDs de las entradas completadas
    entries.forEach(element => {
        id2Set.add(element.media.id.toString());
    });

    // Convertir id2Set a números enteros
    const id2SetAsNumbers = new Set([...id2Set].map(id => parseInt(id, 10)));

    // Filtrar id1Set y convertir valores a enteros para comparar
    const commonIds = Array.from(new Set([...id1Set].filter(id => id2SetAsNumbers.has(id))));

    return commonIds;
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
    const mediaContainer = document.getElementById("infovideo");
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
                songNameInfo.style.display = "block";
                const artistInfo = document.getElementById("artistInfo");
                artistInfo.style.display = "block";
                revealPhase()
                player.removeEventListener('timeupdate', checkTime)
            }
        });
    });
}
