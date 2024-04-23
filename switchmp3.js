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
    video.addEventListener("ended", randomSong, false)
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
    audio.addEventListener("ended", randomSong, false)
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
        
        audio.addEventListener("loadedmetadata", function() {
            // Calcula un inicio aleatorio si la duración del audio es suficiente
            let maxStart = Math.min(60, Math.max(0, audio.duration - 30));
            let tiempoStartSong = Math.random() * maxStart;
            audio.currentTime = tiempoStartSong;
            
            audio.play();
            audio.addEventListener("ended", randomSong, false);
            
            audio.addEventListener('timeupdate', function checkTime() {
                if (audio.currentTime >= tiempoStartSong + parseInt(tiempoCancion)) {
                    let songNameInfo = document.getElementById("songNameInfo");
                    let artistInfo = document.getElementById("artistInfo");

                    songNameInfo.style.display = "block";
                    artistInfo.style.display = "block";
                    revealPhase();
                    audio.removeEventListener('timeupdate', checkTime);
                }
            });
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
        
        video.addEventListener("loadedmetadata", function() {
            let maxStart = Math.min(60, Math.max(0, video.duration - 30));
            tiempoStartSong = Math.random() * maxStart
            video.currentTime = tiempoStartSong;
            video.play();
            video.addEventListener("ended", randomSong, false);
            video.addEventListener('timeupdate', function() {
                if (video.currentTime >= tiempoStartSong + parseInt(tiempoCancion)) {
                    let songNameInfo = document.getElementById("songNameInfo");
                    let artistInfo = document.getElementById("artistInfo");

                    songNameInfo.style.display = "block";
                    artistInfo.style.display = "block";
                    revealPhase();
                    video.removeEventListener('timeupdate', arguments.callee);
                }
            });
        });
    }
}