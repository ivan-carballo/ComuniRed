import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { validateEmailByID } from '../api/validateAPI.js'
import { ValidateCorrect } from "../componentes/validate/correct.jsx";
import { ValidateError } from "../componentes/validate/error.jsx";
import { ValidateExpired } from "../componentes/validate/expired.jsx";
import comunired from '../assets/comunired.png'

import '../saas/validate/header.scss'



function Validate() {
    const { id } = useParams()

    const [text, setText] = useState('')



    // useEffect para pasar la ID al back, comprobar el usuario y devolver la info actualizada del usuario
    useEffect(() => {

        validateByID(id)
        async function validateByID(id) {
            const sendValidateByID = await validateEmailByID(id)

            if (sendValidateByID.data[1] == true) {
                // Ha validado bien
                setText(<ValidateCorrect username={sendValidateByID.data[0]} />)

            } else if (sendValidateByID.data[0] != false && sendValidateByID.data[1] == false) {
                // Enlace ya usado y validado de antes
                setText(<ValidateExpired username={sendValidateByID.data[0]} />)

            } else {
                // Ha habido un error, pedir nuevo correo de verificacion
                setText(<ValidateError />)
            }
        }

    }, [])





    return (

        <div id="validate-body">
            
            <div id="validate-header">
                <img src={comunired} />
                <h3>Bienvenid@ a ComuniRed</h3>
            </div>

            <div id="validate-data">
                {text}
            </div>

        </div>

    )
}



export {
    Validate
}