function comprobarRespuesta(contenido) {

    let respuestaSN=document.getElementById('songNameSA')
    let respuestaA = document.getElementById('artistSA');
    respuestaA.innerHTML = "";

    let songNameInfo = document.getElementById("songNameInfo");
    let songTD = songNameInfo.innerHTML


    var similitudSongName = calcularSimilitud(contenido, songTD.slice(6));

    if (!similitudSongNameAlcanzada) {
        if(similitudSongName > 30) {
            respuestaSN.textContent = contenido + ' (' + similitudSongName.toFixed(2) + '%)';
        } else {
            respuestaSN.textContent = ' (' + similitudSongName.toFixed(2) + '%)';
        }

        if (similitudSongName === 100) {
            similitudSongNameAlcanzada = true;
            respuestaSN.innerHTML += ' &#10004;';
            songNameInfo.style.display = "block";
            var textarea = document.getElementById('respuesta');
            textarea.value = ""
        }
    }
    
    artistas.forEach((artista, i) => {
        if (artistasBoolean[i]) {
            appendArtistAsCorrect(respuestaA, artista);
        } else {
            handleArtistComparison(respuestaA, contenido, artista, i);
        }
    });

    if (artistasBoolean.every(value => value)) {
        displayArtistInfo()
        respuestaA.innerHTML = "";
    }
}

function handleArtistComparison(respuestaA, contenido, artista, index) {
    const similitudArtist = calcularSimilitud(contenido, artista);
    if (similitudArtist > 30) {
        respuestaA.innerHTML += contenido + ' (' + similitudArtist.toFixed(2) + '%),';
    } else {
        respuestaA.innerHTML += ' (' + similitudArtist.toFixed(2) + '%),';
    }

    if (similitudArtist === 100) {
        respuestaA.innerHTML += ' &#10004;<br>';
        document.getElementById('respuesta').value = "";
        artistasBoolean[index] = true;
        respuestaA.innerHTML = "";
        appendArtistAsCorrect(respuestaA, artista);
    }
}

function appendArtistAsCorrect(respuestaA, artista) {
    respuestaA.innerHTML += artista + ' (100%), ';
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


//CARACTERES ESPECIALES
function eliminarCaracteresNoDeseados(texto) {
    return texto.replace(/[☆ ♡ ↑ 彡 ★ ・]/g, '') // ☆
}

function calcularSimilitud(texto1, texto2) {
    texto1 = texto1.replace(/\s/g, '');
    texto2 = texto2.replace(/\s/g, '');
    var texto1SinCaracteres = eliminarCaracteresNoDeseados(texto1);
    var texto2SinCaracteres = eliminarCaracteresNoDeseados(texto2);
    var distancia = levenshteinDistance(texto1SinCaracteres, texto2SinCaracteres);
    var maxLength = Math.max(texto1SinCaracteres.length, texto2SinCaracteres.length);
    var similitud = ((maxLength - distancia) / maxLength) * 100;
    return similitud;
}


function revealPhase() {
    setTimeout(function() {
        randomSong()
    }, 7000);
}