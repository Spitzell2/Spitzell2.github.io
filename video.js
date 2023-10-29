function soundBar() {
    // Obtén elementos del DOM
    const video = document.getElementById('video');
    const volumeControl = document.getElementById('volume-control');

    // Asigna el valor inicial del control de volumen al valor actual del video
    volumeControl.value = video.volume;

    // Agrega un evento para controlar el volumen
    volumeControl.addEventListener('input', function() {
        video.volume = volumeControl.value;
    });

    // Controla el volumen del video cuando se cambie
    video.addEventListener('volumechange', function() {
        // Actualiza el valor del control de volumen
        volumeControl.value = video.volume;
    });
}

function mute() {
    const video = document.getElementById('video');
    const muteButton = document.getElementById('mute-button');

    if (video.muted) {
        // Si está silenciado, desmutear
        video.muted = false;
        muteButton.textContent = 'Silenciar';
    } else {
        // Si no está silenciado, silenciar
        video.muted = true;
        muteButton.textContent = 'Desmutear';
    }
}