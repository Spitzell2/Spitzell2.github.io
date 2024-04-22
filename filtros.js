function filtro() {
    let contador = 0
    lista2 = lista4
    let lista3 = new Array()
    borrarOpciones("selectCancion")
    for (j=0; j < lista2.length; j++) {
        var titulo = lista2[j].name
        var primeraLetra = titulo[0].charCodeAt(0) - 65
        if ((lista2[j].difficulty > minDiff && lista2[j].difficulty < maxDiff) &&
            ((primeraLetra >= minLet && primeraLetra <= maxLet) ||
            (minLet == -1 && primeraLetra <= minLet))) {
            lista3[contador] = lista2[j]
            const node = document.createElement("option")
            const textnode = document.createTextNode(lista2[j].name + ' OP ' + lista2[j].number)
            node.appendChild(textnode)
            option = document.getElementById('selectCancion').appendChild(node)
            option.value = lista2[j].link
            option.id = contador + 1
            option.className = lista2[j].id
            contador++
        }
    }
    lista2 = lista3
    cantidadTotal = contador
    document.getElementById("contador").innerHTML = cantidadTotal
}

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

    if((primeraLetra >= minLet && primeraLetra <= maxLet) ||
        (minLet == -1 && primeraLetra <= minLet)) {
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