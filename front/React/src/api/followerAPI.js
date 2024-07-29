// Funciones de llamadas API hacia Backend para un CRUD de los usuarios a los que sigue el user logueado



import { API_URL } from "./API.js"


async function getFollower() {
  let dato = await fetch(`${API_URL}/follower`);
  dato = await dato.json();
  return (dato)
}


async function getFollowerByID(id) {
  let dato = await fetch(`${API_URL}/follower/${id}`);
  dato = await dato.json();
  return (dato)
}



async function getFollowerByProperty(property, value) {
  try {
    const post = await fetch(`${API_URL}/follower/find`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ property, value })
    });

    if (!post.ok) {
      throw new Error(`Error al buscar los follower 1 (HTTP ${post.status})`);
    }

    const result = await post.json();
    //console.log('follower buscado:', result);
    return (result)
  } catch (error) {
    console.error('Error al buscar los followers 2:', error);
  }
}



async function followerCreate(data) {
  try {
    const response = await fetch(`${API_URL}/follower`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al crear los followers (HTTP ${response.status})`);
    }

    const result = await response.json();
    //console.log('follower creado:', result);
  } catch (error) {
    console.error('Error al crear los follower:', error);
  }
}



async function followerUpdate(id, data) {
  try {
    const response = await fetch(`${API_URL}/follower/update/${id}`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar el follower (HTTP ${response.status})`);
    }

    const result = await response.json();
    //console.log('follower actualizado:', result);
  } catch (error) {
    console.error('Error al actualizar el follower:', error);
  }
}




async function followerDelete(id) {
  try {
    const response = await fetch(`${API_URL}/follower/remove/${id}`, {
      method: 'POST',
      headers: { 
        'Content-type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el follower (HTTP ${response.status})`);
    }

    const result = await response.json();
    //console.log('follower eliminado:', result);
  } catch (error) {
    console.error('Error al eliminar el follower:', error);
  }
}






  export {
    getFollower,
    getFollowerByID,
    getFollowerByProperty,
    followerCreate,
    followerDelete,
    followerUpdate
  }