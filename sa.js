let similitudSongNameAlcanzada = false;
let similitudArtistAlcanzada = false;


function comprobarRespuestaSongName(contenido) { 

    var respuestaSN=document.getElementById('songNameSA')
    
    let songNameInfo = document.getElementById("songNameInfo");
    let songTD = songNameInfo.innerHTML

    var similitudSongName = calcularSimilitud(contenido, songTD.slice(6));

    if (!similitudSongNameAlcanzada) {
        respuestaSN.textContent = contenido + ' (' + similitudSongName.toFixed(2) + '%)';
        if (similitudSongName === 100) {
            similitudSongNameAlcanzada = true;
            respuestaSN.innerHTML += ' &#10004;';
            songNameInfo.style.display = "block";
            var textarea = document.getElementById('respuesta');
            textarea.value = ""
        }
    }
    

}

function comprobarRespuestaArtist(contenido) { 
    var respuestaA=document.getElementById('artistSA')
    
    let artistInfo = document.getElementById("artistInfo");
    let artistTD = artistInfo.innerHTML

    let artistas = artistTD.slice(8).split(',').map(artist => artist.trim());

    respuestaA.innerHTML = ""; // Limpiar contenido anterior
    
    artistas.forEach(artista => {
        var similitudArtist = calcularSimilitud(contenido, artista);
        respuestaA.innerHTML += contenido + ' (' + similitudArtist.toFixed(2) + '%)<br>';
        if (similitudArtist === 100) {
            respuestaA.innerHTML += ' &#10004;<br>';
            var artistInfo = document.getElementById("artistInfo");
            artistInfo.style.display = "block";
            var textarea = document.getElementById('respuesta');
            textarea.value = ""
        }
    });
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
    return texto.replace(/[☆ ♡ ↑ 彡 ★]/g, '') // ☆
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
        nextSong()
    }, 7000);
}