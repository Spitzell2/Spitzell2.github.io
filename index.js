document.addEventListener("DOMContentLoaded", function() {
    const playButton = document.getElementById("playButton");
    const settingsButton = document.getElementById("settingsButton");
    const settingsModal = document.getElementById("settingsModal");
    const closeModal = document.getElementById("closeModal");
    const cancelButton = document.getElementById("cancelButton");
    const saveButton = document.getElementById("saveButton");
    const secondsRange = document.getElementById("secondsRange");
    const difficultyRangeMin = document.getElementById("difficultyRangeMin");
    const difficultyRangeMax = document.getElementById("difficultyRangeMax");
    const anoRangeMin = document.getElementById("anoRangeMin");
    const anoRangeMax = document.getElementById("anoRangeMax");

    playButton.addEventListener("click", function() {
        // Obtener los valores de los sliders
        const secondsValue = secondsRange.value;
        const difficultyMinValue = difficultyRangeMin.value;
        const difficultyMaxValue = difficultyRangeMax.value;
        const anoMinValue = anoRangeMin.value;
        const anoMaxValue = anoRangeMax.value;
        
        const settings = {
            seconds: secondsValue,
            difficultyMin: difficultyMinValue,
            difficultyMax: difficultyMaxValue,
            anoMin: anoMinValue,
            anoMax: anoMaxValue
        };
        
        // Convertir el objeto a una cadena JSON y almacenarlo en sessionStorage
        sessionStorage.setItem('settingsSA', JSON.stringify(settings));
        
        // Redirigir a game.html
        window.location.href = "file:///C:/Users/braya/Visual/SA/game.html";
    });
    
    settingsButton.addEventListener("click", function() {
        settingsModal.style.display = "block";
    });
    
    closeModal.addEventListener("click", function() {
        settingsModal.style.display = "none";
    });

    cancelButton.addEventListener("click", function() {
        settingsModal.style.display = "none";
    });

    saveButton.addEventListener("click", function() {
        settingsModal.style.display = "none";
    });

    secondsRange.addEventListener("input", function() {
        secondsValue.textContent = secondsRange.value;
    });

    difficultyRangeMin.addEventListener("input", function() {
        difficultyValueMin.textContent = difficultyRangeMin.value;
    });

    difficultyRangeMax.addEventListener("input", function() {
        difficultyValueMax.textContent = difficultyRangeMax.value;
    });

    anoRangeMin.addEventListener("input", function() {
        anoValueMin.textContent = anoRangeMin.value;
    });

    anoRangeMax.addEventListener("input", function() {
        anoValueMax.textContent = anoRangeMax.value;
    });
});
