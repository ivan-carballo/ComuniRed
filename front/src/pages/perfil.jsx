import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../componentes/navbar";
import { PerfilData } from "../componentes/otherPerfil/perfilData";
import { OtherPost } from "../componentes/otherPerfil/otherPost";

import '../saas/otherPerfil/perfil.scss'


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