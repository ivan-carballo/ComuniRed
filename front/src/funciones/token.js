function guardarToken(token) {
    document.cookie = `token=${token}; expires=${new Date(new Date().getTime() + 60 * 60 * 1000).toUTCString()}; path=/; secure; samesite=none;`;
  }
  
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
  