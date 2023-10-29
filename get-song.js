function play() {
    
    const videoElement = document.getElementById('video'); // El elemento de video
    // Obtener el enlace MP4 de la instancia de SongInfo
    const mp4Link = actualSong.linkmp4;

    // Establecer el enlace MP4 en el elemento de video
    videoElement.src = mp4Link;

    // Reproducir el video
    videoElement.play();
}

function buscar(inputId, autocompleteId, property, valueActual) {
    const searchBar = document.getElementById(inputId)
    const autocompleteList = document.getElementById(autocompleteId)

    const filter = searchBar.value.toLowerCase()
    const filteredOptions = songInfoList
        .filter(item => item[property].toLowerCase().includes(filter))
        .map(item => item[property])

    displayAutocomplete(filteredOptions, autocompleteId)

    searchBar.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
            // Flecha abajo: mover la selección hacia abajo
            const selectedOption = autocompleteList.querySelector('.selected');
            if (selectedOption) {
                const nextOption = selectedOption.nextElementSibling;
                if (nextOption) {
                    selectedOption.classList.remove('selected');
                    nextOption.classList.add('selected');
                }
            } else {
                const firstOption = autocompleteList.firstElementChild;
                if (firstOption) {
                    firstOption.classList.add('selected');
                }
            }
        } else if (event.key === 'ArrowUp') {
            // Flecha arriba: mover la selección hacia arriba
            const selectedOption = autocompleteList.querySelector('.selected');
            if (selectedOption) {
                const prevOption = selectedOption.previousElementSibling;
                if (prevOption) {
                    selectedOption.classList.remove('selected');
                    prevOption.classList.add('selected');
                }
            } else {
                const lastOption = autocompleteList.lastElementChild;
                if (lastOption) {
                    lastOption.classList.add('selected');
                }
            }
        } else if (event.key === 'Enter') {
            // Enter: seleccionar la opción resaltada
            const selectedOption = autocompleteList.querySelector('.selected');
            if (selectedOption) {
                searchBar.value = selectedOption.textContent;
                autocompleteList.style.display = 'none';
                comprobar(inputId, valueActual, selectedOption.textContent)
            }
        }
    });

    function displayAutocomplete(results, containerId) {
        const autocompleteList = document.getElementById(containerId);
        autocompleteList.innerHTML = '';
        const uniqueResults = [...new Set(results)]; // Eliminar elementos duplicados
        const maxOptions = 5;
    
        if (uniqueResults.length === 0) {
            autocompleteList.style.display = 'none';
        } else {
            for (let i = 0; i < Math.min(uniqueResults.length, maxOptions); i++) {
                const listItem = document.createElement('li');
                listItem.textContent = uniqueResults[i];
                listItem.addEventListener('click', () => {
                    searchBar.value = uniqueResults[i];
                    autocompleteList.style.display = 'none';
                });
                autocompleteList.appendChild(listItem);
            }
            autocompleteList.style.display = 'block';
        }
    }

    const selectedOption = searchBar.value;
    comprobar(inputId, valueActual, selectedOption)

    // Cierra la lista de autocompletado cuando se hace clic en cualquier otra parte de la página
    document.addEventListener('click', (event) => {
        if (event.target !== searchBar && event.target !== autocompleteList) {
            autocompleteList.style.display = 'none';
        }
    });
}

function comprobar2(event, idElement, value) {
    // Accede al elemento en el que se hizo clic
     const clickedItem = event.target;
    
    // Accede al texto del elemento en el que se hizo clic
    const clickedText = clickedItem.textContent;
    comprobar(idElement,value,clickedText)
}

function comprobar(idElement, value, selectedOption) {
    if (value == selectedOption) {
        if (idElement == 'search-bar-artist') {
            songBoolean = true
        } else {
            artistBoolean = true
        }
    }
}
