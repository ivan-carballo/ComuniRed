// Funciones de llamadas API hacia Backend para un CRUD de posts



import { API_URL } from "./API.js"


async function getPost() {
  let dato = await fetch(`${API_URL}/post`)
  dato = await dato.json();
  return (dato)
}


async function getPostScroll(skip, limit) {
  let dato = await fetch(`${API_URL}/post/scroll?skip=${skip}&limit=${limit}`);
  dato = await dato.json();
  return (dato)
}


async function getpostByID(id) {
  let dato = await fetch(`${API_URL}/post/${id}`);
  dato = await dato.json();
  return (dato)
}



async function getPostByProperty(property, value) {
  try {
    const post = await fetch(`${API_URL}/post/find`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ property, value })
    });

    if (!post.ok) {
      throw new Error(`Error al buscar el post 1 (HTTP ${post.status})`);
    }

    const result = await post.json();
    //console.log('post buscado:', result);
    return (result)
  } catch (error) {
    console.error('Error al buscar el post 2:', error);
  }
}



async function postCreate(data, userIMG) {
  try {
    const response = await fetch(`${API_URL}/post`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al crear el post (HTTP ${response.status})`);
    }

    const result = await response.json();
    //console.log('post creado:', result);

    // Si existe una foto de perfil, hacer un update
    if (userIMG.length > 0) {
      const updateArray = {'userIMG': userIMG}
      const sendUpdate = await postUpdate(result.data._id, updateArray)
    }

  } catch (error) {
    console.error('Error al crear el post:', error);
  }
}



async function postUpdate(id, data) {
  try {
    const response = await fetch(`${API_URL}/post/update/${id}`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar el post (HTTP ${response.status})`);
    }

    const result = await response.json();
    //console.log('post actualizado:', result);
  } catch (error) {
    console.error('Error al actualizar el post:', error);
  }
}




async function postDelete(id) {
  try {
    const response = await fetch(`${API_URL}/post/remove/${id}`, {
      method: 'POST',
      headers: { 
        'Content-type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el post (HTTP ${response.status})`);
    }

    const result = await response.json();
    //console.log('post eliminada:', result);
  } catch (error) {
    console.error('Error al eliminar el post:', error);
  }
}



  export {
    getPost,
    getPostScroll,
    getpostByID,
    getPostByProperty,
    postCreate,
    postDelete,
    postUpdate
  }