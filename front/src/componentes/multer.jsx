import React, { useState } from 'react';
import { uploadFile } from '../funciones/uploadImage.js'


function AppImage() {
  const [file, setFile] = useState(null);



  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };


  const onFileUpload = async () => {
    if (!file) {
      setMessage('Por favor selecciona un archivo primero');
      return
    }

    try {
      const data = await uploadFile(file);
    } catch (error) {
      setMessage('Error al subir el archivo');
    }
  }




  return (
    <div className="inputMulter">
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Subir Archivo</button>
    </div>
  )

}




export {
    AppImage
}
