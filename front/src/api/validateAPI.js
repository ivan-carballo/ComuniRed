// Funciones de llamadas API hacia Backend validar el correo del usuario nuevo


import { API_URL } from "./API.js"





async function validateEmailByID(id) {
  let dato = await fetch(`${API_URL}/validate/${id}`);
  dato = await dato.json();
  return (dato)
}



async function validateEmailByProperty(property, value) {
  try {
    const post = await fetch(`${API_URL}/validate/find`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ property, value })
    });

    if (!post.ok) {
      throw new Error(`Error al buscar al validar 1 (HTTP ${post.status})`);
    }

    const result = await post.json();
    //console.log('Validacion buscada:', result);
    return (result)
  } catch (error) {
    console.error('Error al buscar al validar 2:', error);
  }
}






  export {
    validateEmailByID,
    validateEmailByProperty
  }