import React from "react";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import sha256 from 'js-sha256'
import { deleteAllUser } from '../../api/deleteAllAPI.js'
import { useNavigate } from 'react-router-dom'

import '../../saas/options/userDelete.scss'



function UserDeleteButton() {
    const userCurrentID = Cookies.get('id')
    const navigate = useNavigate()


    async function userRemove() {

        Swal.fire({
            title: "Su usuario va a ser eliminado",
            html: '<div style="text-align:justify;"><ul><li style="margin-bottom:5px;">Esta accion no se puede revertir</li><li style="margin-bottom:5px;">Tambien se eliminaran posts, respuestas, mensajes privados y configuraciones</li><li style="margin-bottom:20px;">Una vez eliminado su usuario no podra volver a usar la misma direccion de correo electronico</li><p style="margin-left:-50px;margin-right:-20px;">Escriba su contraseña para eliminar su usuario definitivamente</p></ul></div>',
            icon: "warning",
            input: "password",
            inputAttributes: {
              autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Si, eliminar todo",
            confirmButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#3085d6",
            showLoaderOnConfirm: true,
            preConfirm: async (pass) => {
              try {
                    const passEncrypt = sha256(pass)
                    const arraySend =  {'pass': passEncrypt}

                    const sendDataRemoveUser = await deleteAllUser(userCurrentID, arraySend)              
                
              } catch (error) {
                Swal.showValidationMessage(`Request failed: ${error}`);
              }

            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Usuario eliminado',
                html: '<p style="text-align:center;">Su usuario se ha eliminado correctamente junto con toda la informacion que hubiera asociada. No se puede recuperar ningun dato o informacion. Tanto el username como el email no se pueden volver a reutilizar, si desea volver a tener un usuario activo debe usar un username y un email diferentes</p>'
              });
            }
          })

        
        navigate('/')
    }



    return (
        <div id="userDelete-body">
        
            <input type="button" value="Eliminar usuario" onClick={userRemove} />
        
        </div>
    )
}


export {
    UserDeleteButton
}