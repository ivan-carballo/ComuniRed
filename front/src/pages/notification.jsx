import React from "react";
import { useState, useEffect } from "react";
import { Navbar } from "../componentes/navbar";
import Cookies from 'js-cookie'
import { NotificationResponse } from "../componentes/notification/notificationResponse.jsx";
import { NotificationFollow } from "../componentes/notification/notificationFollow.jsx";



import '../saas/notification/notification.scss'
import { getNotificationByProperty } from "../api/notificationAPI.js";
import { getNotiFollowByProperty } from "../api/notiFollowAPI.js";


// Pagina para ver todas las notificaciones de respuestas a post propios y follows
// Se cargaran desde los componentes
function Notification() {
    const userCurrentID = Cookies.get('id')

    const [show, setShow] = useState(<NotificationResponse />)
    const [buttonFollow, setButtonFollow] = useState('')
    const [buttonResponse, setButtonResponse] = useState('active')
    const [reboot, setReboot] = useState(true)

    

    // useEffect para detectar de donde son las notificaciones y poner el boton en rojo
    useEffect(() => {
        if (reboot) {

            getNotiAll()
            async function getNotiAll() {

                const getNotiResponse = await getNotificationByProperty('userPrincipalID', userCurrentID)
                const getNotiFollow = await getNotiFollowByProperty('followerID', userCurrentID)

                if (getNotiResponse.data.length > 0) {
                    setButtonResponse('notification')
                }

                if (getNotiFollow.data.length > 0) {
                    setButtonFollow('notification')
                }
            }

            setReboot(false)
        }
    }, [reboot])




    // Funcion para controlar los estilos de los botones y lo que se muestra en pantalla, follow o followers
    async function buttonShow(e) {
        const buttonValue = e.target.value

        if (buttonValue === 'Respuestas') {
            setShow(<NotificationResponse />)
            setButtonResponse('active')
            setButtonFollow('')
            setReboot(true)
        } else if (buttonValue === 'Seguidores') {
            setShow(<NotificationFollow />)
            setButtonResponse('')
            setButtonFollow('active')
            setReboot(true)
        }
    }



    return (
        <>

            <Navbar />

            <div id="notification-body">

                <div id="notification-buttons">
                        <input type="button" value="Respuestas" id={buttonResponse} onClick={buttonShow} />
                        <input type="button" value="Seguidores" id={buttonFollow} onClick={buttonShow} />
                </div>

                <div id="notification-show">
                    {show}
                </div>

            </div>
        
        </>
    )
}


export {
    Notification
}