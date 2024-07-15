function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Uso de debounce en el event listener
const debouncedCheck = debounce(comprobarRespuesta, 50); // Ajusta el tiempo de espera según la necesidad


function comprobarRespuesta(contenido) {
    let respuesta = document.getElementById('SAAnswer')
    respuesta.innerHTML = ""
    SNanswer = ""
    Aanswer = ""
    var similitudSongName = calcularSimilitud(contenido, songInfo)
    
    if (!similitudSongNameAlcanzada) {
        if(similitudSongName > 30) {
            SNanswer = contenido + ' (' + similitudSongName.toFixed(2) + '%)';
        } else {
            SNanswer = ' (' + similitudSongName.toFixed(2) + '%)';
        }

        if (similitudSongName === 100) {
            similitudSongNameAlcanzada = true;
            SNanswer = songInfo + ' ✔';
            songNameInfo.style.display = "block";
            var textarea = document.getElementById('respuesta');
            textarea.value = ""
        }
    } else {
        SNanswer = songInfo + ' ✔';
    }

    artistasInfo.forEach((artista, i) => {
        if (artistasBoolean[i]) {
            Aanswer += artista + ' ✔, ';
        } else {
            const similitudArtist = calcularSimilitud(contenido, artista);
            if (similitudArtist > 30 && similitudArtist != 100 ) {
                Aanswer += contenido + ' (' + similitudArtist.toFixed(2) + '%),';
            } else if (similitudArtist === 100) {
                Aanswer += artista + ' ✔, ';
                document.getElementById('respuesta').value = "";
                artistasBoolean[i] = true;
            } else {
                Aanswer += ' (' + similitudArtist.toFixed(2) + '%),';
            }
        }
    })

    if (artistasBoolean.every(value => value)) {
        displayArtistInfo()
        if(similitudSongNameAlcanzada) {
            SNanswer = ""
            Aanswer = ""
            randomSong()
        }
    }
    respuesta.innerHTML = 'Song Name: ' + SNanswer + '<br>Artist: ' + Aanswer
}

function displayArtistInfo() {
    const artistInfo = document.getElementById("artistInfo");
    artistInfo.style.display = "block";
}


function levenshteinDistance(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;

    const matrix = [];

    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }
    return matrix[len1][len2];
}

function eliminarCaracteresNoDeseados(texto) {
    texto = texto.replace("&amp;", "&")
    return texto.replace(/[☆ ✩ ♡ ↑ 彡 ★ × ∀ ≠ ° ・ α ♥]/g, '')
}

function calcularSimilitud(texto1, texto2) {
    var texto1SinCaracteres = eliminarCaracteresNoDeseados(texto1.replace(/\s/g, ''))
    var texto2SinCaracteres = eliminarCaracteresNoDeseados(texto2.replace(/\s/g, ''))

    if (texto1 === texto2) {
        return 100;
    }

    var distancia = levenshteinDistance(texto1SinCaracteres, texto2SinCaracteres)
    var maxLength = Math.max(texto1SinCaracteres.length, texto2SinCaracteres.length)

    return ((maxLength - distancia) / maxLength) * 100
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