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
    const opCheckbox = document.getElementById("opCheckbox");
    const edCheckbox = document.getElementById("edCheckbox");
    const inCheckbox = document.getElementById("inCheckbox");
    const rebroadcastCheckbox = document.getElementById("rebroadcastCheckbox");


    let defaultSettings;

    // Comprobar si hay configuraciones guardadas
    if (JSON.parse(localStorage.getItem('settingsTrain'))) {
        const settingsJSON = JSON.parse(localStorage.getItem('settingsTrain'));
        defaultSettings = {
            seconds: settingsJSON.seconds,
            difficultyMin: settingsJSON.difficultyMin,
            difficultyMax: settingsJSON.difficultyMax,
            anoMin: settingsJSON.anoMin,
            anoMax: settingsJSON.anoMax,
            user: settingsJSON.user,
            op: settingsJSON.op,
            ed: settingsJSON.ed,
            in: settingsJSON.in,
            rebroadcast: settingsJSON.rebroadcast
        };

        // Cargar valores en los campos correspondientes
        userName.value = settingsJSON.user;
        secondsRange.value = settingsJSON.seconds;
        difficultyRangeMin.value = settingsJSON.difficultyMin;
        difficultyRangeMax.value = settingsJSON.difficultyMax;
        anoRangeMin.value = settingsJSON.anoMin;
        anoRangeMax.value = settingsJSON.anoMax;
        opCheckbox.checked = settingsJSON.op;
        edCheckbox.checked = settingsJSON.ed;
        inCheckbox.checked = settingsJSON.in;
        rebroadcastCheckbox.checked = settingsJSON.rebroadcast;


        // Actualizar los valores de los spans correspondientes
        document.getElementById("secondsValue").textContent = settingsJSON.seconds;
        difficultyValueMin.textContent = settingsJSON.difficultyMin;
        difficultyValueMax.textContent = settingsJSON.difficultyMax;
        anoValueMin.textContent = settingsJSON.anoMin;
        anoValueMax.textContent = settingsJSON.anoMax;

    } else {
        defaultSettings = {
            seconds: 25,
            difficultyMin: 0,
            difficultyMax: 100,
            anoMin: 1985,
            anoMax: 2025,
            user: "",
            op: true,
            ed: true,
            in: true,
            rebroadcast: false
        };
    }

    playButton.addEventListener("click", function() {
        //window.location.href = "C:/Users/braya/Visual/TrainAMQ/game.html";
        window.location.href = "https://spitzell2.github.io/game.html";
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

        const secondsValue = secondsRange.value;
        const difficultyMinValue = difficultyRangeMin.value;
        const difficultyMaxValue = difficultyRangeMax.value;
        const anoMinValue = anoRangeMin.value;
        const anoMaxValue = anoRangeMax.value;
        const userValue = userName.value;

        // Obtener los valores de los checkboxes
        const opChecked = opCheckbox.checked;
        const edChecked = edCheckbox.checked;
        const inChecked = inCheckbox.checked;
        const rebroadcastChecked = rebroadcastCheckbox.checked;

        
        const settings = {
            seconds: secondsValue,
            difficultyMin: difficultyMinValue,
            difficultyMax: difficultyMaxValue,
            anoMin: anoMinValue,
            anoMax: anoMaxValue,
            user: userValue,
            op: opChecked,
            ed: edChecked,
            in: inChecked,
            rebroadcast: rebroadcastChecked
        };
        
        localStorage.setItem('settingsTrain', JSON.stringify(settings));
    });

    secondsRange.addEventListener("input", function() {
        document.getElementById("secondsValue").textContent = secondsRange.value;
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

