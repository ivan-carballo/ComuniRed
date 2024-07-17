import React, { useState } from 'react';

function ImageResizer({id}, {perfil}) {
  const [imageSrc, setImageSrc] = useState(null);
  const [resizedImageSrc, setResizedImageSrc] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        //setImageSrc(event.target.result);
        resizeImage(event.target.result, 400); // Redimensionar especificando solo el ancho
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeImage = (src, newWidth) => {
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.height / img.width;
      const newHeight = newWidth * aspectRatio;
      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      const resizedBase64 = canvas.toDataURL('image/webp'); // Puedes cambiar el formato si lo deseas
      //setResizedImageSrc(resizedBase64);
    };
    img.src = src;
  };

  return (
    <div>
      <input type="file" accept="image/*" id='imageResize' onChange={handleImageChange} />
      {imageSrc && (
        <div>
          <h2>Imagen Original:</h2>
          <img src={imageSrc} alt="Original" style={{ maxWidth: '100%' }} />
        </div>
      )}
      {resizedImageSrc && (
        <div>
          <h2>Imagen Redimensionada:</h2>
          <img src={resizedImageSrc} alt="Resized" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}

export default ImageResizer;
