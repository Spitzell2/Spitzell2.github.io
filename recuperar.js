let json = localStorage.getItem('playlistSp')
let playlistSp = JSON.parse(json)

function creaTabla() {
    const tabla = document.querySelector('#miTabla tbody')
    var cont = 0
    for (const url in playlistSp) {
        cont++
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
          video.controls
          video.src = url
          video.controls = true
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
            tabla.removeChild(nuevaFila);
        });
        celdaBoton.appendChild(boton)
        nuevaFila.appendChild(celdaBoton)
            
        tabla.appendChild(nuevaFila)
      }
      contador(cont)
}

function buscador() {
    let input = document.getElementById("buscador")
    let tabla = document.querySelector('#miTabla tbody')
    let filas = tabla.getElementsByTagName("tr")
    let filter = input.value.toUpperCase()
    var cont = 0
    for (var i=0; i < filas.length; i++) {
        var celdas = filas[i].getElementsByTagName("td")
        var mostrar = false
        for (var j=0; j < celdas.length; j++) {
          var texto = celdas[j].textContent.toUpperCase()
          if (texto.indexOf(filter) > -1) {
            mostrar = true
            break
          }
        }
        if (mostrar) {
          cont++
          filas[i].style.display = ""
        } else {
          filas[i].style.display = "none"
        }
      }
    contador(cont)  
}

function contador(cant) {
  document.getElementById("contRec").innerHTML = cant
}


window.addEventListener('load', creaTabla, false)