// Funcion para guardar el token en las Cookies
function guardarToken(token) {
    // Se le da una caducidad de 24 horas
    document.cookie = `token=${token}; expires=${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString()}; path=/; secure; samesite=none;`;
}
  

// Funcion para poder sacar el token de las Cookies para hacer comprobaciones
function obtenerToken() {
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        
        if (name === 'token') {
            return value;
        }
    }

        return null;
}
  

  
export {
    guardarToken, 
    obtenerToken
}
  