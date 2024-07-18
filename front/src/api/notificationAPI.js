import { API_URL } from "./API.js"


async function getNotification() {
  let dato = await fetch(`${API_URL}/notification`);
  dato = await dato.json();
  return (dato)
}


async function getNotificationByID(id) {
  let dato = await fetch(`${API_URL}/notification/${id}`);
  dato = await dato.json();
  return (dato)
}



async function getNotificationByProperty(property, value) {
  try {
    const post = await fetch(`${API_URL}/notification/find`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ property, value })
    });

    if (!post.ok) {
      throw new Error(`Error al buscar la notificacion 1 (HTTP ${post.status})`);
    }

    const result = await post.json();
    //console.log('notificacion buscado:', result);
    return (result)
  } catch (error) {
    console.error('Error al buscar la notificacion 2:', error);
  }
}



async function notificationCreate(data) {
  try {
    const response = await fetch(`${API_URL}/notification`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al crear la notificacion (HTTP ${response.status})`);
    }

    const result = await response.json();
    console.log('Notificacion creada:', result);
  } catch (error) {
    console.error('Error al crear la notificacion:', error);
  }
}



async function notificationUpdate(id, data) {
  try {
    const response = await fetch(`${API_URL}/notification/update/${id}`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar la notificacion (HTTP ${response.status})`);
    }

    const result = await response.json();
    console.log('post actualizado:', result);
  } catch (error) {
    console.error('Error al actualizar la notificacion:', error);
  }
}




async function notificationDelete(id) {
  try {
    const response = await fetch(`${API_URL}/notification/remove/${id}`, {
      method: 'POST',
      headers: { 
        'Content-type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar la notificacion (HTTP ${response.status})`);
    }

    const result = await response.json();
    console.log('post eliminada:', result);
  } catch (error) {
    console.error('Error al eliminar la notificacion:', error);
  }
}






  export {
    getNotification,
    getNotificationByID,
    getNotificationByProperty,
    notificationCreate,
    notificationDelete,
    notificationUpdate
  }