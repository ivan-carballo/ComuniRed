// Funciones de llamadas API hacia Backend para un CRUD de los usuarios a los que sigue el user logueado



import { API_URL } from "./API.js"


async function getFollow() {
  let dato = await fetch(`${API_URL}/follow`);
  dato = await dato.json();
  return (dato)
}


async function getFollowByID(id) {
  let dato = await fetch(`${API_URL}/follow/${id}`);
  dato = await dato.json();
  return (dato)
}



async function getFollowByProperty(property, value) {
  try {
    const post = await fetch(`${API_URL}/follow/find`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ property, value })
    });

    if (!post.ok) {
      throw new Error(`Error al buscar los follos 1 (HTTP ${post.status})`);
    }

    const result = await post.json();
    //console.log('Follow buscado:', result);
    return (result)
  } catch (error) {
    console.error('Error al buscar los follows 2:', error);
  }
}



async function followCreate(data) {
  try {
    const response = await fetch(`${API_URL}/follow`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al crear los follows (HTTP ${response.status})`);
    }

    const result = await response.json();
    //console.log('Follow creado:', result);
  } catch (error) {
    console.error('Error al crear los follow:', error);
  }
}



async function followUpdate(id, data) {
  try {
    const response = await fetch(`${API_URL}/follow/update/${id}`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar el follow (HTTP ${response.status})`);
    }

    const result = await response.json();
    //console.log('Follow actualizado:', result);
  } catch (error) {
    console.error('Error al actualizar el Follow:', error);
  }
}




async function followDelete(id) {
  try {
    const response = await fetch(`${API_URL}/follow/remove/${id}`, {
      method: 'POST',
      headers: { 
        'Content-type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el follow (HTTP ${response.status})`);
    }

    const result = await response.json();
    //console.log('Follow eliminado:', result);
  } catch (error) {
    console.error('Error al eliminar el follow:', error);
  }
}






  export {
    getFollow,
    getFollowByID,
    getFollowByProperty,
    followCreate,
    followDelete,
    followUpdate
  }