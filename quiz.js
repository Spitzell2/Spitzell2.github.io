
function comenzar() {
    mostrarElemento('countdown-overlay')
    mostrarElemento('countdown')
    resetSearchBar()
    // Obtener un valor aleatorio
    const randomIndex = Math.floor(Math.random() * songInfoList.length);

    // Obtener el link mp4 del objeto aleatorio
    const randomSong = songInfoList[randomIndex];
    actualSong = randomSong
    const videoSrc = randomSong.linkmp4;

    // Reproducir el video desde el tiempo aleatorio
    const video = document.getElementById('video');
    video.src = videoSrc;
    
    // Escuchar el evento "loadedmetadata" para que podamos establecer el tiempo de inicio después de cargar los metadatos del video
    video.addEventListener('loadedmetadata', function () {
        const videoDuration = video.duration;
        
        // Calcular un tiempo aleatorio entre 20 segundos y duración - 20 segundos
        const minStartTime = 0; // 20 segundos
        const maxStartTime = videoDuration - 20; // Duración total - 20 segundos
        randomStartTime = Math.random() * (maxStartTime - minStartTime) + minStartTime;
        
        // Establecer el tiempo de inicio y reproducir el video
        video.currentTime = randomStartTime;
        video.play();
        countdownTimer(timerData);
        // Programar la detención del video después de 20 segundos
        setTimeout(function () {
            video.currentTime = randomStartTime;
            comprobarResultado()
            songBoolean=false
            artistBoolean=false
            video.play()
            ocultarElemento('search-bar-container')
            setTimeout(function () {
                comenzar()
            }, timerData);
        }, timerData);
    });
    
    video.load()
    mostrarElemento('search-bar-container')
}

function comprobarResultado() {
    if (songBoolean && artistBoolean) {
        var puntuacion = document.getElementById('puntuacion');
        puntuacionTotal++
        puntuacion.textContent= puntuacionTotal
    }

}
function resetSearchBar() {
    var searchBar = document.getElementById('search-bar-song');
    searchBar.value = "";
    var searchBar = document.getElementById('search-bar-artist');
    searchBar.value = "";
}
function ocultarElemento(idElement) {
    const searchBarContainer = document.getElementById(idElement);
    searchBarContainer.style.display = 'none';
}

function mostrarElemento(idElement) {
    const searchBarContainer = document.getElementById(idElement);
    searchBarContainer.style.display = 'block';
}

function countdownTimer(seconds) {
    let currentCount = seconds/1000;
    const countdownInterval = setInterval(function () {
        currentCount--;
        countdown.textContent = currentCount;
        
        if (currentCount < 1) {
            ocultarElemento('countdown-overlay') // Ocultar el contador cuando llegue a 0
            clearInterval(countdownInterval);
        }
    }, 1000); // Actualizar cada segundo (1000 milisegundos)
}


function iniciar() {
    fetch('/consultar') // URL de la ruta en tu servidor Express
        .then(response => response.json())
        .then(data => {
            songInfoList = data.map(item => {
                return new songInfoConstructor(
                    item.id,
                    item.songName,
                    item.artist,
                    item.difficulty,
                    item.year,
                    item.linkmp3,
                    item.linkmp4
                );
            });
        })
        .catch(error => {
            console.error('Error al realizar la consulta:', error);
            resultContainer.textContent = 'Ocurrió un error al consultar la base de datos';
        });
}


window.addEventListener('load', iniciar, false)