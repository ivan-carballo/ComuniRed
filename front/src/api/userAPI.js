import dotenv from 'dotenv';


async function getUser() {
  let dato = await fetch(`${API_URL}/user`);
  dato = await dato.json();
  return (dato)
}


async function getUserByID(id) {
  let dato = await fetch(`${API_URL}/${id}`);
  dato = await dato.json();
  return (dato)
}



async function UserCreate(data) {
    fetch(`${API_URL}/user`, data)
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
  }




  async function userDelete(id) {
    try {
      const response = await fetch(`${API_URL}/remove/${id}`, {
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
    fetch(`${API_URL}/update/${id}`, data)
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
  }




  export {
    getUser,
    getUserByID,
    UserCreate,
    userDelete,
    userUpdate
  }