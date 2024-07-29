// Funciones de llamadas API hacia Backend eliminar un usuario de forma definitiva


import { API_URL } from "./API.js"





async function deleteAllUser(id, data) {
  try {
    const response = await fetch(`${API_URL}/remove/${id}`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar los datos 1 (HTTP ${response.status})`);
    }

    const result = await response.json();
    //console.log('Eliminacion correcta:', result);
  } catch (error) {
    console.error('Error al eliminar los datos 2:', error);
  }
}






  export {
    deleteAllUser
  }