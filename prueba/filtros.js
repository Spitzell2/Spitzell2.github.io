function filtroDiff(diffLista) {
    var diffBoolean = true
    if(diffLista[posicion-1].difficulty > minDiff && diffLista[posicion-1].difficulty < maxDiff) {
        document.title = diffLista[posicion-1].name
        info.innerHTML = "Anime: " + diffLista[posicion-1].name + ' ' + 
                            diffLista[posicion-1].tipo + ' ' + 
                            diffLista[posicion-1].number
        var pagAnilist=document.getElementById('atributo')
        pagAnilist.href = anilistURL + diffLista[posicion-1].anilistID
    } else {
        diffBoolean = false
    }

    return diffBoolean
}

function filtroLetra(letraLista) {
    var letraBoolean = true
    var titulo = letraLista[posicion-1].name
    var primeraLetra = titulo[0].charCodeAt(0) - 65

    if(primeraLetra >= minLet && primeraLetra <= maxLet || minLet == -1 && primeraLetra <= minLet) {
        document.title = letraLista[posicion-1].name
        info.innerHTML = "Anime: " + letraLista[posicion-1].name + ' ' + 
                                letraLista[posicion-1].tipo + ' ' + 
                                letraLista[posicion-1].number
        var pagAnilist=document.getElementById('atributo')
        pagAnilist.href = anilistURL + letraLista[posicion-1].anilistID
    } else {
        letraBoolean = false
    }
    
    return letraBoolean
}