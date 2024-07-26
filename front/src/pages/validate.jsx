import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { validateEmailByID } from '../api/validateAPI.js'



function Validate() {
    const { id } = useParams()

    const [text, setText] = useState('')


    useEffect(() => {

        validateByID(id)
        async function validateByID(id) {
            const sendValidateByID = await validateEmailByID(id)
            console.log(sendValidateByID);

            if (sendValidateByID.data == true) {
                // Ha validado bien

            } else if (sendValidateByID.data == 'caducado') {
                // Enlace ya usado y validado de antes

            } else {
                // Ha habido un error, pedir nuevo correo de verificacion
            }
        }

    }, [])





    return (

        <div id="validate-body">
            
            <div id="validate-header">
                <img src="../assets/Comunired.png" alt="" />
                <p>Bienvenid@ a ComuniRed</p>
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