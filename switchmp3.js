function createVideoPlayer() {
    let mediaContainer = document.getElementById("infovideo")
    let video = document.createElement("video")
    video.width = "700"
    video.height = "350"
    video.id = "video"
    video.controls
    video.src = lista2[posicion-1].link
    video.controls = true
    mediaContainer.appendChild(video)
    video.play()
    video.addEventListener("ended", nextSong, false)
    return false
}
 
function createAudioPlayer() {
    let mediaContainer = document.getElementById("infovideo") 
    let audio = document.createElement("audio")
    if(lista2[posicion-1]) {
        audio.src = lista2[posicion-1].linkmp3
    } else {
        audio.src = ""
    }
    //audio.src = lista2[posicion-1].linkmp3
    audio.controls = true;
    mediaContainer.appendChild(audio)
    audio.play()
    audio.addEventListener("ended", nextSong, false)
    return true
}
  
function switchMedia() {
    let mediaContainer = document.getElementById("infovideo") 
    let radioButtons = document.getElementsByName("media")
    mediaContainer.innerHTML = ""
    if (radioButtons[0].checked) {
      audioBoolean = createVideoPlayer()
    } else {
      audioBoolean = createAudioPlayer()
    }
}

function anadirsrc(src) {
    let mediaContainer = document.getElementById("infovideo")
    mediaContainer.innerHTML = ""
    
    if(audioBoolean) {
        let audio = document.createElement("audio")
        audio.src = src[posicion-1].linkmp3
        audio.controls = true;
        audio.id = "audio"
        mediaContainer.appendChild(audio)
        audio.play()
        audio.addEventListener("ended", nextSong, false)
        audio.addEventListener('timeupdate', function() {
            // Verifica si el audio ha estado reproduciéndose durante al menos 20 segundos
            if (audio.currentTime >= tiempoCancion) {
                let songNameInfo = document.getElementById("songNameInfo");
                let artistInfo = document.getElementById("artistInfo");

                songNameInfo.style.display = "block";
                artistInfo.style.display = "block";
                revealPhase()
                audio.removeEventListener('timeupdate', arguments.callee)
                
            }
        });
    } else {
        let video = document.createElement("video")
        video.width = "700"
        video.height = "350"
        video.id = "video"
        video.controls
        video.src = src[posicion-1].link
        video.controls = true
        mediaContainer.appendChild(video)
        video.play()
        video.addEventListener("ended", nextSong, false)

        // Escucha el evento 'timeupdate' para verificar continuamente el progreso del video
        video.addEventListener('timeupdate', function() {
            if (video.currentTime >= tiempoCancion) {
                let songNameInfo = document.getElementById("songNameInfo");
                let artistInfo = document.getElementById("artistInfo");

                songNameInfo.style.display = "block";
                artistInfo.style.display = "block";
                revealPhase()
                video.removeEventListener('timeupdate', arguments.callee);
            }
        });
    }
}