// Funciones de llamadas API hacia Backend validar el correo del usuario nuevo


import { API_URL } from "./API.js"





async function validateEmailByID(id) {
  let dato = await fetch(`${API_URL}/validate/${id}`);
  dato = await dato.json();
  return (dato)
}






  export {
    validateEmailByID
  }