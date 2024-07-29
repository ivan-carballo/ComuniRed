// Funciones de llamadas API hacia Backend para un CRUD de notificaciones para avisar de que se siguen los usuarios



import { API_URL } from "./API.js"


async function getNotiFollow() {
  let dato = await fetch(`${API_URL}/notifollow`);
  dato = await dato.json();
  return (dato)
}


async function getNotiFollowByID(id) {
  let dato = await fetch(`${API_URL}/notifollow/${id}`);
  dato = await dato.json();
  return (dato)
}



async function getNotiFollowByProperty(property, value) {
  try {
    const post = await fetch(`${API_URL}/notifollow/find`,
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
    //console.log('notifollow buscado:', result);
    return (result)
  } catch (error) {
    console.error('Error al buscar los notifollows 2:', error);
  }
}



async function notiFollowCreate(data) {
  try {
    const response = await fetch(`${API_URL}/notifollow`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al crear los notifollows (HTTP ${response.status})`);
    }

    const result = await response.json();
    //console.log('notifollow creado:', result);
  } catch (error) {
    console.error('Error al crear los notifollow:', error);
  }
}



async function notiFollowUpdate(id, data) {
  try {
    const response = await fetch(`${API_URL}/notifollow/update/${id}`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar el notifollow (HTTP ${response.status})`);
    }

    const result = await response.json();
    //console.log('notifollow actualizado:', result);
  } catch (error) {
    console.error('Error al actualizar el notifollow:', error);
  }
}




async function notiFollowDelete(id) {
  try {
    const response = await fetch(`${API_URL}/notifollow/remove/${id}`, {
      method: 'POST',
      headers: { 
        'Content-type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el notifollow (HTTP ${response.status})`);
    }

    const result = await response.json();
    //console.log('notifollow eliminado:', result);
  } catch (error) {
    console.error('Error al eliminar el notifollow:', error);
  }
}






  export {
    getNotiFollow,
    getNotiFollowByID,
    getNotiFollowByProperty,
    notiFollowCreate,
    notiFollowDelete,
    notiFollowUpdate
  }