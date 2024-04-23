let json = localStorage.getItem('playlistSp')
let playlistSp = JSON.parse(json)

function joder() {
    const tabla = document.querySelector('#miTabla tbody');
    for (const url in playlistSp) {

        const nuevaFila = document.createElement('tr')
        const celdaURL = document.createElement('td')
        const celdaName = document.createElement('td')
        const celdaBoton = document.createElement('td')
        const boton = document.createElement('button')

        celdaName.textContent = playlistSp[url].name
        nuevaFila.appendChild(celdaName)

        celdaURL.textContent = url
        nuevaFila.appendChild(celdaURL)

        boton.textContent = 'Añadir'
        boton.addEventListener('click', () => {
            delete playlistSp[url]
            const objetoActualizado = JSON.stringify(playlistSp)
            localStorage.setItem('playlistSp', objetoActualizado)
            tabla.removeChild(nuevaFila);
        });
        celdaBoton.appendChild(boton)
        nuevaFila.appendChild(celdaBoton)
            
        tabla.appendChild(nuevaFila)
      }
}

window.addEventListener('load', joder, false)