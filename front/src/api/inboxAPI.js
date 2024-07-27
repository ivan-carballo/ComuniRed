// Funciones de llamadas API hacia Backend para un CRUD de mensajes privados entre usuarios



import { API_URL } from "./API.js"


async function getInbox() {
  let dato = await fetch(`${API_URL}/inbox`);
  dato = await dato.json();
  return (dato)
}


async function getInboxByID(id) {
  let dato = await fetch(`${API_URL}/inbox/${id}`);
  dato = await dato.json();
  return (dato)
}



async function getInboxByProperty(property, value) {
  try {
    const post = await fetch(`${API_URL}/inbox/find`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ property, value })
    });

    if (!post.ok) {
      throw new Error(`Error al buscar los mensajes 1 (HTTP ${post.status})`);
    }

    const result = await post.json();
    //console.log('Mensaje buscado:', result);
    return (result)
  } catch (error) {
    console.error('Error al buscar los mensajes 2:', error);
  }
}



async function inboxCreate(data) {
  try {
    const response = await fetch(`${API_URL}/inbox`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al crear los mensajes (HTTP ${response.status})`);
    }

    const result = await response.json();
    //console.log('Mensaje creado:', result);
  } catch (error) {
    console.error('Error al crear los mensajes:', error);
  }
}



async function inboxUpdate(id, data) {
  try {
    const response = await fetch(`${API_URL}/inbox/update/${id}`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar el mensaje (HTTP ${response.status})`);
    }

    const result = await response.json();
    //console.log('Mensaje actualizado:', result);
  } catch (error) {
    console.error('Error al actualizar el mensaje:', error);
  }
}




async function inboxDelete(id) {
  try {
    const response = await fetch(`${API_URL}/inbox/remove/${id}`, {
      method: 'POST',
      headers: { 
        'Content-type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el mensaje (HTTP ${response.status})`);
    }

    const result = await response.json();
    //console.log('Mensaje eliminado:', result);
  } catch (error) {
    console.error('Error al eliminar el mensaje:', error);
  }
}






  export {
    getInbox,
    getInboxByID,
    getInboxByProperty,
    inboxCreate,
    inboxDelete,
    inboxUpdate
  }