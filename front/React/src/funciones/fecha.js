
// Funcion para poder dar formato a las fechas que da por defecto Javascript
async function dateFormat(date) {
    const fechaFormateada = new Date(date);
    const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
    return fechaFormateada.toLocaleDateString('es-ES', opciones);
}


// Funcion para revertir el formateo de las fechas
function parseDate(date) {
    return new Date(date);
}


export {
    dateFormat,
    parseDate
}