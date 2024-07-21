// Funciones de llamadas API hacia Backend para un CRUD de mensajes privados entre usuarios



import { API_URL } from "./API.js"


async function getNotiInbox() {
  let dato = await fetch(`${API_URL}/notiinbox`);
  dato = await dato.json();
  return (dato)
}


async function getNotiInboxByID(id) {
  let dato = await fetch(`${API_URL}/notiinbox/${id}`);
  dato = await dato.json();
  return (dato)
}



async function getNotiInboxByProperty(property, value) {
  try {
    const post = await fetch(`${API_URL}/notiinbox/find`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ property, value })
    });

    if (!post.ok) {
      throw new Error(`Error al buscar las noti inbox 1 (HTTP ${post.status})`);
    }

    const result = await post.json();
    //console.log('Noti inbox buscado:', result);
    return (result)
  } catch (error) {
    console.error('Error al buscar las noti inbox 2:', error);
  }
}



async function notiInboxCreate(data) {
  try {
    const response = await fetch(`${API_URL}/notiinbox`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al crear las noti inbox (HTTP ${response.status})`);
    }

    const result = await response.json();
    //console.log('Noti inbox creada:', result);
  } catch (error) {
    console.error('Error al crear las noti inbox:', error);
  }
}



async function notiInboxUpdate(id, data) {
  try {
    const response = await fetch(`${API_URL}/notiinbox/update/${id}`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar las noti inbox (HTTP ${response.status})`);
    }

    const result = await response.json();
    //console.log('Noti inbox actualizado:', result);
  } catch (error) {
    console.error('Error al actualizar las noti inbox:', error);
  }
}




async function notiInboxDelete(id) {
  try {
    const response = await fetch(`${API_URL}/notiinbox/remove/${id}`, {
      method: 'POST',
      headers: { 
        'Content-type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar las noti inbox (HTTP ${response.status})`);
    }

    const result = await response.json();
    //console.log('Noti inbox eliminada:', result);
  } catch (error) {
    console.error('Error al eliminar la noti inbox:', error);
  }
}






  export {
    getNotiInbox,
    getNotiInboxByID,
    getNotiInboxByProperty,
    notiInboxCreate,
    notiInboxDelete,
    notiInboxUpdate
  }