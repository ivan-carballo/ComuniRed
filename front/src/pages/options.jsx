import '../saas/options/options.scss'

import React from "react";
import { useState, useEffect } from "react";
import { Navbar } from '../componentes/navbar'
import { UserData } from '../componentes/options/userData.jsx'
import { UserModificar } from '../componentes/options/userModificar.jsx'
import { UserDeleteButton } from '../componentes/options/userDelete.jsx'


// Pagina para las opciones del usuario logueado
// Se muestran los datos del usuario y la posibilidad de modificar cualquiera de sus datos
function Options() {

    return (
        <>
            <Navbar />

            <div id="options-body">            
                <h2 id='rotulo'>Opciones de usuario</h2>
                <UserData />
                <UserModificar />
                <UserDeleteButton />

            </div>
        
        </>

    )
}


export {
    Options
}