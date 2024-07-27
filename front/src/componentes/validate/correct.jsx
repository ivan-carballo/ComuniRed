import React from "react";
import { useState, useEffect } from "react";

import '../../saas/validate/text.scss'


function ValidateCorrect({username}) {




    return (
        <div id="validate-body">

            <div id="validate-responsive">
            
                <h3>¡Verificación completada!</h3>

                <p id='greeting'>¡Hola {username}!</p>
                <p>Nos complace informarte que tu correo electrónico ha sido verificado con éxito. Ya puedes iniciar sesión en ComuniRed y comenzar a disfrutar de todas las funcionalidades de nuestra red social.</p>
                
                <a href="http://comunired.ivancm.info">Iniciar sesión en ComuniRed</a>

                <p>Gracias por unirte a nuestra comunidad. ¡Esperamos que disfrutes de la experiencia!</p>
                <p>Saludos cordiales,</p>
                <b id='greeting'>El equipo de ComuniRed</b>

            </div>

        </div>
    )
}



export {

    ValidateCorrect
}