import { API_URL } from "./API.js"

import Cookies from 'js-cookie'
import { dateFormat } from '../funciones/fecha.js'
import { notificationCreate } from "./notificationAPI.js"
import { getpostByID } from "./postAPI.js"
import { getUserByID } from './userAPI.js'





async function getresponse() {
  let dato = await fetch(`${API_URL}/response`);
  dato = await dato.json();
  return (dato)
}


async function getresponseByID(id) {
  let dato = await fetch(`${API_URL}/response/${id}`);
  dato = await dato.json();
  return (dato)
}





async function getResponseByProperty(property, value) {
  try {
    const response = await fetch(`${API_URL}/response/find`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ property, value })
    });

    if (!response.ok) {
      throw new Error(`Error al buscar el response 1 (HTTP ${response.status})`);
    }

    const result = await response.json();
    console.log('response buscado:', result);
    return (result)
  } catch (error) {
    console.error('Error al buscar el response 2:', error);
  }
}







async function responseCreate(data) {
  try {
    const response = await fetch(`${API_URL}/response`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al crear el response 1 (HTTP ${response.status})`);
    }

    const result = await response.json();
    console.log('response creado:', result);

    const userCurrentID = Cookies.get('id')
    const getPostID = await getpostByID(data.postID)

    const notificationArray = {'postPrincipalID': data.postID,
                            'username': data.username,
                            'dateString': await dateFormat(Date.now()),
                            'post': data.post,
                            'userPrincipalID': getPostID.data.userID}

    if (userCurrentID != getPostID.data.userID) {
      const notificationSend = await notificationCreate(notificationArray)
    }

  } catch (error) {
    console.error('Error al crear el response 2:', error);
  }
  
}






async function responseUpdate(id, data) {
  try {
    const response = await fetch(`${API_URL}/response/update/${id}`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar el response (HTTP ${response.status})`);
    }

    const result = await response.json();
    console.log('response actualizado:', result);
  } catch (error) {
    console.error('Error al actualizar el response:', error);
  }
}







async function responseDelete(id) {
  try {
    const response = await fetch(`${API_URL}/response/remove/${id}`, {
      method: 'POST',
      headers: { 
        'Content-type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el response (HTTP ${response.status})`);
    }

    const result = await response.json();
    console.log('response eliminada:', result);
  } catch (error) {
    console.error('Error al eliminar el response:', error);
  }
}






  export {
    getresponse,
    getresponseByID,
    getResponseByProperty,
    responseCreate,
    responseDelete,
    responseUpdate
  }