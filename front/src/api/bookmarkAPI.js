import { API_URL } from "./API.js"


async function getBookmark() {
  let dato = await fetch(`${API_URL}/bookmark`);
  dato = await dato.json();
  return (dato)
}


async function getBookmarkByID(id) {
  let dato = await fetch(`${API_URL}/bookmark/${id}`);
  dato = await dato.json();
  return (dato)
}



async function getBookmarkByProperty(property, value) {
  try {
    const post = await fetch(`${API_URL}/bookmark/find`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ property, value })
    });

    if (!post.ok) {
      throw new Error(`Error al buscar el guardado 1 (HTTP ${post.status})`);
    }

    const result = await post.json();
    //console.log('Guardado buscado:', result);
    return (result)
  } catch (error) {
    console.error('Error al buscar el guardado 2:', error);
  }
}



async function bookmarkCreate(data) {
  try {
    const response = await fetch(`${API_URL}/bookmark`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al crear el guardado (HTTP ${response.status})`);
    }

    const result = await response.json();
    console.log('Guardado creada:', result);
  } catch (error) {
    console.error('Error al crear el guardado:', error);
  }
}



async function bookmarkUpdate(id, data) {
  try {
    const response = await fetch(`${API_URL}/bookmark/update/${id}`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar el guardado (HTTP ${response.status})`);
    }

    const result = await response.json();
    console.log('post actualizado:', result);
  } catch (error) {
    console.error('Error al actualizar el guardado:', error);
  }
}




async function bookmarkDelete(id) {
  try {
    const response = await fetch(`${API_URL}/bookmark/remove/${id}`, {
      method: 'POST',
      headers: { 
        'Content-type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el guardado (HTTP ${response.status})`);
    }

    const result = await response.json();
    console.log('post eliminada:', result);
  } catch (error) {
    console.error('Error al eliminar el guardado:', error);
  }
}






  export {
    getBookmark,
    getBookmarkByID,
    getBookmarkByProperty,
    bookmarkCreate,
    bookmarkDelete,
    bookmarkUpdate
  }