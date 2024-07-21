import '../saas/options/options.scss'

import React from "react";
import { useState, useEffect } from "react";
import { Navbar } from '../componentes/navbar'
import { UserData } from '../componentes/options/userData';
import { UserModificar } from '../componentes/options/userModificar';


// Pagina para las opciones del usuario logueado
// Se muestran los datos del usuario y la posibilidad de modificar cualquiera de sus datos
function Options() {

    return (
        <>
            <Navbar />

            <div id="options-body">            
                <h1 id='rotulo'>Opciones de usuario</h1>
                <UserData />
                <UserModificar />

            </div>
        
        </>

    )
}


export {
    Options
}