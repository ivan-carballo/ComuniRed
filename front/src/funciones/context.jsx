import React, { createContext, useState } from 'react';


export const ContextoCompartido = createContext();




export const ProveedorContexto = ({ children }) => {

  const [valorCompartido, setValorCompartido] = useState(true);
  const [valorResponse, setValorResponse] = useState(true);


  const values = {
                  valorCompartido, 
                  setValorCompartido,
                  valorResponse,
                  setValorResponse
  }

  

  return (
    <ContextoCompartido.Provider value={ values }>
      {children}
    </ContextoCompartido.Provider>
  );
};