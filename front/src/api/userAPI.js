import { API_URL } from "./API.js"
import { guardarToken, obtenerToken } from "../funciones/token.js";


async function getUser() {
  let dato = await fetch(`${API_URL}/user`);
  dato = await dato.json();
  return (dato)
}


async function getUserByID(id) {
  let dato = await fetch(`${API_URL}/user/${id}`);
  dato = await dato.json();
  return (dato)
}




async function userCreate(data) {
  try {
    const response = await fetch(`${API_URL}/user`,
      {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
        },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al crear el user (HTTP ${response.status})`);
    }

    const result = await response.json();
    console.log('user creado:', result);
  } catch (error) {
    console.error('Error al user el user:', error);
  }
}
  


  
  async function login(data) {
    fetch(`${API_URL}/user/login`, data)
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
         }
         return data.json();
        }).then(update => {
        //console.log(update);
        guardarToken(update.data)
        }).catch(e => {
        //console.log(e);
        });
  }



  async function userDelete(id) {
    try {
      const response = await fetch(`${API_URL}/user/remove/${id}`, {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error al eliminar el user (HTTP ${response.status})`);
      }
  
      const result = await response.json();
      console.log('user eliminada:', result);
    } catch (error) {
      console.error('Error al eliminar el user:', error);
    }
  }




  async function userUpdate(id, data) {
    try {
      const response = fetch(`${API_URL}/user/update/${id}`,
        {
          method: 'POST',
          headers: { 
            'Content-type': 'application/json',
          },
            body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Error al actualizar el user (HTTP ${response.status})`);
      }
  
      const result = await response.json();
      console.log('user actualizado:', result);
    } catch (error) {
      console.error('Error al actualizar el user:', error);
    }
  }




  export {
    getUser,
    getUserByID,
    userCreate,
    login,
    userDelete,
    userUpdate
  }