function guardarToken(token) {
    document.cookie = `token=${token}; path=/; secure; samesite=strict;`;
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
  
  guardarToken('miToken123');
  
  const token = obtenerToken();
  
export {
    guardarToken, 
    obtenerToken
}
  