//funcion leer fichero
function read() {

}


function countWords(str, sep) {
    const arr = str.split(sep);
    return arr.filter(word => word !== '').length;
}