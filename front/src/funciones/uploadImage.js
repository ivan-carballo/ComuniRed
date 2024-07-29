// Funcion para cargar archivos usando Multer

import { API_URL } from '../api/API.js'

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Error al subir el archivo');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en la carga del archivo:', error);
      throw error;
    }
  };
  

