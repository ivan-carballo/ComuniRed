import React from "react";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { validateEmailByProperty } from '../../api/validateAPI.js'
import { useNavigate } from 'react-router-dom'

import '../../saas/validate/text.scss'


function ValidateError() {
    const navigate = useNavigate()

    let titleShow = ''
    let textShow = ''



    async function newEmail() {

        Swal.fire({
            title: "Escriba su dirección de correo electronico",
            input: "text",
            inputAttributes: {
            autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Enviar",
            showLoaderOnConfirm: true,
            preConfirm: async (email) => {
            try {
                    const validateFind = await validateEmailByProperty('email', email)

                    if (validateFind.data === true) {
                        titleShow = 'Email enviado'
                        textShow = 'Revise la carpeta de spam si no encuentra el email enviado en la bandeja de entrada.'
                    } else {
                        titleShow = 'Error de email'
                        textShow = 'Su email no esta en nuestro sistema. Escribalo correctamente o cree un usuario nuevo si no lo tiene.'
                    }
                
            } catch (error) {
                Swal.showValidationMessage(`Request failed: ${error}`);
            }

            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire({
                title: titleShow,
                text: textShow,
                
            })
            navigate('/')
            }
        })

    }






    return (
        <div id="validate-body">

            <div id="validate-responsive">
            
                <h3>Enlace no válido</h3>

                <p id='greeting'>¡Hola!</p>
                <p>Parece que el enlace que utilizaste no es válido. Esto puede deberse a que el código de verificación es incorrecto o ha sido manipulado. Para verificar tu cuenta, por favor solicita un nuevo correo electrónico con un enlace de verificación actualizado.</p>
                
                <input type="button" value="Enviar correo de validación" onClick={newEmail} />
                
                <p>Si necesitas ayuda adicional, no dudes en ponerte en contacto con nosotros. Estamos aquí para asistirte.</p>
                <p>Saludos cordiales,</p>
                <b id='greeting'>El equipo de ComuniRed</b>
                
            </div>

        </div>
    )
}



export {
    ValidateError
}