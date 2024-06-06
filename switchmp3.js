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
    player.src = state.lista[state.posicion - 1]?.[state.audioBoolean ? "linkmp3" : "link"] || "";
    player.play();
    player.addEventListener("ended", randomSong);
}

function anadirsrc(src) {
    const player = createPlayer(state.audioBoolean ? "audio" : "video");
    player.src = src[state.posicion - 1]?.[state.audioBoolean ? "linkmp3" : "link"] || "";

    player.addEventListener("loadedmetadata", function() {
        const maxStart = Math.min(60, Math.max(0, player.duration - 30));
        state.tiempoStartSong = Math.random() * maxStart
        player.currentTime = state.tiempoStartSong
        player.play()
        player.addEventListener('timeupdate', function checkTime() {
            if (player.currentTime >= state.tiempoStartSong + parseInt(state.settings.seconds)) {
                const songNameInfo = document.getElementById("songNameInfo");
                songNameInfo.style.display = "block";
                displayArtistInfo()
                revealPhase()
                player.removeEventListener('timeupdate', checkTime)
            }
        });
    });
}
