import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../componentes/navbar";
import { PerfilData } from "../componentes/otherPerfil/perfilData";
import { OtherPost } from "../componentes/otherPerfil/otherPost";

import '../saas/otherPerfil/perfil.scss'


// Pagina para ver el perfil de otro usuario, se muestra una cabecera con sus datos y los posts creados
function Perfil() {
    const { id } = useParams()


    return (
        <>
            <Navbar />
        
            <div id="perfil-body">
                
                <PerfilData id={id} />
                
                <OtherPost id={id} />

            </div>
        </>
    )
}



export {
    Perfil
}