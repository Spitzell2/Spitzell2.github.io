function deletePerm() {
    if (!localStorage.getItem('playlistSp')) {
        localStorage.setItem('playlistSp', '{}')

        if(variosAnos) {
            const webm = lista2[posicion-1].link
            const playlistSp = JSON.parse(localStorage.getItem('playlistSp'))
            
            localStorage.setItem('playlistSp', JSON.stringify({
                ...playlistSp,
            [webm]: {
                    eliminada: true,
                    name: lista2[posicion-1].name
                }
            }))
        } else {
            const webm = lista[posicion-1].link
        
            const playlistSp = JSON.parse(localStorage.getItem('playlistSp'));
            localStorage.setItem('playlistSp', JSON.stringify({
                ...playlistSp,
            [webm]: {
                    eliminada: true,
                    name: lista[posicion-1].name
                }
            }))
        }
    } else {
        
        if(variosAnos) {
            const webm = lista2[posicion-1].link   
            const playlistSp = JSON.parse(localStorage.getItem('playlistSp'))
    
            localStorage.setItem('playlistSp', JSON.stringify({
                ...playlistSp,
            [webm]: {
                    eliminada: true,
                    name: lista2[posicion-1].name
                }
            }))
        } else {
            const webm = lista[posicion-1].link
        
            const playlistSp = JSON.parse(localStorage.getItem('playlistSp'));
            localStorage.setItem('playlistSp', JSON.stringify({
                ...playlistSp,
            [webm]: {
                    eliminada: true,
                    name: lista[posicion-1].name
                }
            }))
        }
    }
}

function restaurarTodo() {
    if (confirm("¿Estás seguro de que quieres restaurar todas las canciones elimindas?")) {
        localStorage.removeItem('playlistSp')
      } else {

      }
}