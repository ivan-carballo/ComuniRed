import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../componentes/navbar";
import { PerfilData } from "../componentes/otherPerfil/perfilData";

import '../saas/otherPerfil/perfil.scss'


function Perfil() {
    const { id } = useParams()


    return (
        <>
            <Navbar />
        
            <div id="perfil-body">
                
                <PerfilData id={id} />

            </div>
        </>
    )
}



export {
    Perfil
}