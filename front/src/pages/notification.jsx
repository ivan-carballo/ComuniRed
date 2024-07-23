import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../componentes/navbar";
import Cookies from 'js-cookie'
import { getNotificationByID, getNotificationByProperty, notificationDelete } from '../api/notificationAPI.js'
import { responseUpdate } from '../api/responseAPI.js'


import '../saas/notification/notification.scss'


// Pagina para ver todas las notificaciones de respuestas a post propios
function Notification() {
    const navigate = useNavigate()
    const userID = Cookies.get('id')

    const [reboot, setReboot] = useState(true)
    const [data, setData] = useState()



    // useEffect para traer de MongoDB todas las notificaciones asociadas a post del usuario logueado y un metodo map para mostrarlas en el return
    useEffect(() => {
        if (reboot) {

            showNotification()
            async function showNotification() {
                const getNotificationByUser = await getNotificationByProperty('userPrincipalID', userID)
                
                if (getNotificationByUser.data.reverse().length > 0) {
                    const notificacionMap = getNotificationByUser.data.map((data) => 

                            <div key={data._id} name={data._id} id="notification-div" onClick={notificationDetail}>
                                <div id="notification-div-header">
                                    <p id='notification-p-username' name={data._id}>{data.username}</p>
                                    <p id='notification-p-date' name={data._id}>{data.dateString}</p>
                                </div>
                                { data.post.length > 0 ? <p id='notification-p-post' name={data._id}>{data.post}</p> : <></> }
                                { data.img != undefined && data.img != null ? <img id='notification-img' src={data.img} /> : <></> }
                            </div>

                    )
                    setData(notificacionMap)
                    setReboot(false)
                }
            }
        }

        
    }, [reboot])




    // Funcion para poder ver los detalles de la notificacion, lo que es el post completo al que va escrito y todas las respuestas
    // Se debe pulsar en el div de la respuesta para cargar esta funcion
    async function notificationDetail(e) {
        const notificationID = e.target.attributes.name.value
        
        const notificacionPostPrincipal = await getNotificationByID(notificationID)
        const postPrincipalID = await notificacionPostPrincipal.data.postPrincipalID

        const notificationAllByPost = await getNotificationByProperty('postPrincipalID', postPrincipalID)

        // Una vez que entras a verlo, se elimina la notificacion
        for (let i = 0; notificationAllByPost.data.length > i; i++) {
            const notificationRemove = await notificationDelete(notificationAllByPost.data[i]._id)
        }

        navigate(`/response/${postPrincipalID}`)
    }




    // Funcion para poder dar como vistas todas las notificaciones (Sin necesidad de entrar a verlas) y eliminar dichas notificaciones pendientes
    async function notificationView() {
        const notificationRemoveAll = await getNotificationByProperty('userPrincipalID', userID)

        for (let i = 0; notificationRemoveAll.data.length > i; i++) {
            const notificationRemoveLoop = notificationDelete(notificationRemoveAll.data[i]._id)
        }

        setData(null)
        setReboot(true)
        
    }




    return (
        <>

            <Navbar />

            <div id="notification-readAll">
                <input type="button" value="Marcar todas como vistas" onClick={notificationView} />
            </div>
        
            <div id="notification-body">

                {data}

            </div>
        
        </>
    )
}


export {
    Notification
}