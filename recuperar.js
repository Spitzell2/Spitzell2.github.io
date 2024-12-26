let json = localStorage.getItem('playlistSp')
let playlistSp = JSON.parse(json)
let catboxURL = "https://naedist.animemusicquiz.com/"

let currentPage = 1
const itemsPerPage = 10
let filteredPlaylist = Object.keys(playlistSp) // Filas filtradas

function creaTabla() {
    const tabla = document.querySelector('#miTabla tbody')
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage

    tabla.innerHTML = "" // Limpiar la tabla antes de actualizarla

    for (let i = start; i < end && i < filteredPlaylist.length; i++) {
        const url = filteredPlaylist[i]
        const nuevaFila = document.createElement('tr')
        const celdaURL = document.createElement('td')
        const celdaName = document.createElement('td')
        const celdaBoton = document.createElement('td')
        const boton = document.createElement('button')

        celdaURL.addEventListener('click', (event) => {
            var filaClickeada = event.target.parentNode
            var filaVideo = document.createElement('tr')
            var celdaCerrar = document.createElement('td')
            var botonCerrar = document.createElement('button')
            botonCerrar.textContent = 'Cerrar'

            botonCerrar.addEventListener('click', (event2) => {
                event2.target.parentNode.parentNode.remove()
            });
            celdaCerrar.appendChild(botonCerrar)

            var video = document.createElement("video")
            video.width = "600"
            video.height = "280"
            video.id = "video"
            video.controls = true
            video.src = catboxURL + url
            video.play()
            filaVideo.appendChild(video)
            filaVideo.appendChild(celdaCerrar)
            filaClickeada.parentNode.insertBefore(filaVideo, filaClickeada.nextSibling)
        });

        celdaName.textContent = playlistSp[url].name
        nuevaFila.appendChild(celdaName)
        celdaURL.textContent = url
        nuevaFila.appendChild(celdaURL)

        boton.textContent = 'Añadir'
        boton.addEventListener('click', () => {
            delete playlistSp[url]
            const objetoActualizado = JSON.stringify(playlistSp)
            localStorage.setItem('playlistSp', objetoActualizado)
            filteredPlaylist = Object.keys(playlistSp) // Actualizar la lista filtrada
            creaTabla()
        });
        celdaBoton.appendChild(boton)
        nuevaFila.appendChild(celdaBoton)

        tabla.appendChild(nuevaFila)
    }
    contador(filteredPlaylist.length)
    crearPaginacion(filteredPlaylist.length)
}

function crearPaginacion(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const paginationDiv = document.getElementById('pagination')
    paginationDiv.innerHTML = ""

    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (startPage > 1) {
        const firstPageButton = document.createElement('button')
        firstPageButton.textContent = "1"
        firstPageButton.addEventListener('click', () => {
            currentPage = 1
            creaTabla()
        })
        paginationDiv.appendChild(firstPageButton)

        if (startPage > 2) {
            const ellipsis = document.createElement('span')
            ellipsis.textContent = "..."
            paginationDiv.appendChild(ellipsis)
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button')
        pageButton.textContent = i
        if (i === currentPage) {
            pageButton.disabled = true
        }
        pageButton.addEventListener('click', () => {
            currentPage = i
            creaTabla()
        })
        paginationDiv.appendChild(pageButton)
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span')
            ellipsis.textContent = "..."
            paginationDiv.appendChild(ellipsis)
        }

        const lastPageButton = document.createElement('button')
        lastPageButton.textContent = totalPages
        lastPageButton.addEventListener('click', () => {
            currentPage = totalPages
            creaTabla()
        })
        paginationDiv.appendChild(lastPageButton)
    }

    if (currentPage > 1) {
        const prevButton = document.createElement('button')
        prevButton.textContent = "Anterior"
        prevButton.addEventListener('click', () => {
            currentPage--
            creaTabla()
        })
        paginationDiv.insertBefore(prevButton, paginationDiv.firstChild)
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button')
        nextButton.textContent = "Siguiente"
        nextButton.addEventListener('click', () => {
            currentPage++
            creaTabla()
        })
        paginationDiv.appendChild(nextButton)
    }
}

function buscador() {
    let input = document.getElementById("buscador")
    let filter = input.value.toUpperCase()

    filteredPlaylist = Object.keys(playlistSp).filter(url => {
        return playlistSp[url].name.toUpperCase().indexOf(filter) > -1 || url.toUpperCase().indexOf(filter) > -1
    })

    currentPage = 1 // Reiniciar a la primera página tras la búsqueda
    creaTabla()
}

function contador(total) {
    document.getElementById("contRec").innerHTML = total
}

window.addEventListener('load', creaTabla, false)
