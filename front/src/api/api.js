import dotenv from 'dotenv';


async function getDato() {
  let dato = await fetch(`${API_URL}/dato`);
  dato = await dato.json();
  return (dato)
}


async function getDatoByID(id) {
  let dato = await fetch(`${API_URL}/${id}`);
  dato = await dato.json();
  return (dato)
}



async function datoCreate(data) {
    fetch(`${API_URL}`, data)
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




  async function datoDelete(id) {
    try {
      const response = await fetch(`${API_URL}/remove/${id}`, {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error al eliminar la dato (HTTP ${response.status})`);
      }
  
      const result = await response.json();
      console.log('dato eliminada:', result);
    } catch (error) {
      console.error('Error al eliminar la dato:', error);
    }
  }


  async function datoUpdate(id, data) {
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
    getDato,
    getDatoByID,
    datoCreate,
    datoDelete,
    datoUpdate
  }