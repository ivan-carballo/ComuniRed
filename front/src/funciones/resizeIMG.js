// Funciones para poder redimensionar imagenes y de esta forma ocupen menos tamaño en MongoDB


// Funcion reutilizable para poder disminuir el tamaño de las imagenes que se quieran cargar
// De esta forma ocupan mucho menos, tarda menos en cargar en pantalla y se guardan en mongoDB como base64
const ImageUpload = async (e) => {
    const file = e
    // Se define un tamaño estandar en pixeles
    const maxWidth = 350;
    const maxHeight = undefined;
  
    try {
      // Se manda la informacion a la funcion para redimensionar la imagen
      const base64Image = await resizeImageToBase64(file, { maxWidth, maxHeight });
      return base64Image

    } catch (error) {
      console.error('Error al redimensionar la imagen:', error);
    }
  };



  // Funcion para redimensionar la imagen
  // Se usa Canvas para redimensionar y Filereader para convertir a base64
  const resizeImageToBase64 = (file, options) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
  
        img.onload = () => {
          let width = img.width;
          let height = img.height;
  
          if (options.maxWidth && !options.maxHeight) {
            height = Math.round((height * options.maxWidth) / width);
            width = options.maxWidth;
          } else if (!options.maxWidth && options.maxHeight) {
            width = Math.round((width * options.maxHeight) / height);
            height = options.maxHeight;
          } else if (options.maxWidth && options.maxHeight) {
            if (width > height) {
              height = Math.round((height * options.maxWidth) / width);
              width = options.maxWidth;
            } else {
              width = Math.round((width * options.maxHeight) / height);
              height = options.maxHeight;
            }
          }
  
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
  
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
  
          const base64Image = canvas.toDataURL('image/webp');
          resolve(base64Image);
        };
  
        img.onerror = (error) => {
          reject(error);
        };
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(file);
    });
  };




  const validImageTypes = [
    'image/jpeg', 
    'image/png', 
    'image/gif', 
    'image/bmp', 
    'image/webp'
  ]




  export {
    ImageUpload,
    validImageTypes
  }