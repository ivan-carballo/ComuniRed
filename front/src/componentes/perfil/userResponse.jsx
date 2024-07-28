import React, { useSyncExternalStore } from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import { getResponseByProperty, getresponseByID, responseDelete } from '../../api/responseAPI.js'
import { getNotificationByProperty } from '../../api/notificationAPI.js'
import { getUserByID } from '../../api/userAPI.js'
import { deleteFile } from '../../funciones/deleteImage.js'

import '../../saas/perfil/userPost.scss'



// Componente para poder ver todas las respuestas creadas por tu usuario
function AllResponseByUser () {
    const [reboot, setReboot] = useState(true)
    const [show, setShow] = useState()


    // useEffect para traer todas las respuestas y un metodo map para mostrarlas en el return
    useEffect(() => {
        if (reboot) {
            getAllPost()
            async function getAllPost() {
                const userID = Cookies.get('id')

                let getUser = await getUserByID(userID)
                getUser = getUser.data.username 

                let getResponse = await getResponseByProperty('username', getUser)
                getResponse = getResponse.data.reverse()

                const responseMap = getResponse.map((data) => 
                    <div id="responseMap-div" key={data._id}>
                        <p id='responseMap-date'>{data.dateString}</p>
                        { data.post.length > 1 ? <p id='responseMap-response'>{data.post}</p> : <></> }
                        { data.img != undefined && data.img != null ? <img id='responseMap-img' src={data.img} /> : <></> }
                        <input type="button" className="deletePost" value="Eliminar respuesta" id={data._id} onClick={sweetAlert} />
                    </div>
                )
                setShow(responseMap)
            }
        }
        setReboot(false)
    }, [reboot])




    // Funcion intermedia para desplegar un aviso al usuario antes de hacer la eliminacion por si es un error o se arrepiente
    async function sweetAlert(e) {
        Swal.fire({
            title: 'Confirmar eliminacion de respuesta',
            text: "Cuando se elimina una respuesta no se puede revertir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, elimina todo',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                responseDel(e);
                Swal.fire(
                    '¡Hecho!',
                    'Tu acción ha sido completada.',
                    'success'
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelado',
                    'Tu acción ha sido cancelada :)',
                    'error'
                )
            }
        })
    }



    // Funcion para eliminar una respuesta concreta
    async function responseDel(e) {
        const responseID = await e.target.id

        const getNotificationID = await getNotificationByProperty('responseID', responseID)
        const getResponseID = await getresponseByID(responseID)

        if (getNotificationID.data.length > 0) {
            const notificationRemove = await notificationDelete(getNotificationID.data[0]._id)
        }

        const responseRemove = await responseDelete(responseID)

        if (getResponseID.data.img.length > 0) {
            const filename = getResponseID.data.img.split('/').pop()
            const data = await deleteFile(filename)
        }

        
        setReboot(true)
    }




    return (
        <>
        
            <div id="postByUser-body">
                {show}
            </div>
        
        </>
    )
}



export {
    AllResponseByUser
}