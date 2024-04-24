function deletePerm() {
    let playlistSp = JSON.parse(localStorage.getItem('playlistSp') || '{}');
    let webm = lista2[posicion - 1].link;
    let name = lista2[posicion - 1].name;

    playlistSp[webm] = { eliminada: true, name: name };
    localStorage.setItem('playlistSp', JSON.stringify(playlistSp));
}

function restaurarTodo() {
    if (confirm("¿Estás seguro de que quieres restaurar todas las canciones elimindas?")) {
        localStorage.removeItem('playlistSp')
      } else {

      }
}