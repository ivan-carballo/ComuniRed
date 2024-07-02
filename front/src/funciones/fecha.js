
async function dateFormat(date) {
    const fechaFormateada = new Date(date);
    const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
    return fechaFormateada.toLocaleDateString('es-ES', opciones);
}


export {
    dateFormat
}