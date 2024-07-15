import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../componentes/navbar";

import '../saas/otherPerfil/perfil.scss'


function Perfil() {
    const { id } = useParams()


    return (
        <>
            <Navbar />
        
            <div id="perfil-body">
                <h2>{id}</h2>
            </div>
        </>
    )
}



export {
    Perfil
}