// Funciones para poder redimensionar imagenes y de esta forma ocupen menos tamaño en MongoDB



const ImageUpload = async (e) => {
    const file = e
    const maxWidth = 300;
    const maxHeight = undefined;
  
    try {
      const base64Image = await resizeImageToBase64(file, { maxWidth, maxHeight });
      //console.log('Imagen redimensionada en base64:', base64Image);
      return base64Image

    } catch (error) {
      console.error('Error al redimensionar la imagen:', error);
    }
  };




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
  
          const base64Image = canvas.toDataURL('image/jpeg');
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


  export {
    ImageUpload
  }