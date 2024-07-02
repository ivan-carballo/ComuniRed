import { API_URL } from "./API.js"


async function getpost() {
  let dato = await fetch(`${API_URL}/post`);
  dato = await dato.json();
  return (dato)
}


async function getpostByID(id) {
  let dato = await fetch(`${API_URL}/post/${id}`);
  dato = await dato.json();
  return (dato)
}



async function postCreate(data) {
    fetch(`${API_URL}/post`, data)
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
         }
         return data.json();
        }).then(create => {
        console.log(create);
        }).catch(e => {
        console.log(e);
        });
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
      console.log('post eliminada:', result);
    } catch (error) {
      console.error('Error al eliminar el post:', error);
    }
  }


  async function postUpdate(id, data) {
    fetch(`${API_URL}/post/update/${id}`, data)
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
    getpost,
    getpostByID,
    postCreate,
    postDelete,
    postUpdate
  }