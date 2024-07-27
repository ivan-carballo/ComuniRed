import React from "react";
import { useState, useEffect } from "react";

import '../../saas/validate/text.scss'


function ValidateExpired({username}) {




    return (
        <div id="validate-body">

            <div id="validate-responsive">
            
                <h3>Enlace ya en uso</h3>

                <p id='greeting'>¡Hola {username}!</p>
                <p>El enlace de verificación ya ha sido utilizado y por lo tanto su usuario es valido. Para poder acceder a tu cuenta debe loguearse desde el formulario para tal fin.</p>
                
                <a href="http://comunired.ivancm.info">Iniciar sesión en ComuniRed</a>
                
                <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos. Estamos aquí para ayudarte.</p>
                <p>Saludos cordiales,</p>
                <b id='greeting'>El equipo de ComuniRed</b>

            </div>


        </div>
    )
}



export {

    ValidateExpired
}