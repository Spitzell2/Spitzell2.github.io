let listaIDs

function guardarID(entry){
    listaIDs = entry;
    let idsCoincidentes = filtroID()
}

function filtroID() {
    // Utilizaremos un conjunto (Set) para almacenar las IDs únicas
    const id1Set = new Set();
    const id2Set = new Set();

    lista2.forEach(element => {
        id1Set.add(element.anilistID);
    });

    listaIDs.entries.forEach(element => {
        id2Set.add(element.media.id.toString());
    });

    const id1 = Array.from(id1Set);
    const id2 = Array.from(id2Set);

    const idsCoincidentes = Array.from(new Set([...id1Set].filter(id => id2Set.has(id))));
    
    return idsCoincidentes;
}