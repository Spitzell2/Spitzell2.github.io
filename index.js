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
    const difficultyValueMin = document.getElementById("difficultyValueMin");
    const difficultyValueMax = document.getElementById("difficultyValueMax");
    const anoRangeMin = document.getElementById("anoRangeMin");
    const anoValueMin = document.getElementById("anoValueMin");
    const anoRangeMax = document.getElementById("anoRangeMax");
    const anoValueMax = document.getElementById("anoValueMax");
    const userName = document.getElementById("userName");

    //REVISAR
    const defaultSettings = {
        seconds: 25,
        difficultyMin: 0,
        difficultyMax: 100,
        anoMin: 1990,
        anoMax: 2023,
        user: ""
    };

    //const settingsJSON = localStorage.getItem('settingsSA');        
    //const settings = JSON.parse(settingsJSON);
    //secondsRange.value = settings.seconds || 25;
    //secondsValue.textContent = settings.seconds;
    //difficultyRangeMin.value = settings.difficultyMin;
    //difficultyValueMin.textContent = settings.difficultyMin;
    //difficultyRangeMax.value = settings.difficultyMax;
    //difficultyValueMax.textContent = settings.difficultyMax;
    //anoRangeMin.value = settings.anoMin;
    //anoValueMin.textContent = settings.anoMin;
    //anoRangeMax.value = settings.anoMax;
    //anoValueMax.textContent = settings.anoMax;
    //userName.value = settings.user;

    playButton.addEventListener("click", function() {
        // Obtener los valores de los sliders
        const secondsValue = secondsRange.value;
        const difficultyMinValue = difficultyRangeMin.value;
        const difficultyMaxValue = difficultyRangeMax.value;
        const anoMinValue = anoRangeMin.value;
        const anoMaxValue = anoRangeMax.value;
        const userValue = userName.value
        
        const settings = {
            seconds: secondsValue,
            difficultyMin: difficultyMinValue,
            difficultyMax: difficultyMaxValue,
            anoMin: anoMinValue,
            anoMax: anoMaxValue,
            user: userValue
        };
        
        localStorage.setItem('settingsSA', JSON.stringify(settings));
        window.location.href = "../game.html";
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
