// Funcion para poder eliminar una imagen usando multer

import { API_URL } from '../api/API.js'

export const deleteFile = async (filename) => {
    try {
      const response = await fetch(`${API_URL}/upload/${filename}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error al eliminar el archivo');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en la eliminación del archivo:', error);
      throw error;
    }
  };


