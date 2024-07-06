import { API_URL } from "./API.js"


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





async function getPostByProperty(property, value) {
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
    //console.log('response buscado:', result);
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
    //console.log('response eliminada:', result);
  } catch (error) {
    console.error('Error al eliminar el response:', error);
  }
}


/*   async function responseUpdate(id, data) {
    fetch(`${API_URL}/response/update/${id}`, data)
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
         }
         return data.json();
        }).then(update => {
        console.log(update);
        }).catch(e => {
        console.log(e);
        });
  } */




  export {
    getresponse,
    getresponseByID,
    getPostByProperty,
    responseCreate,
    responseDelete,
    responseUpdate
  }