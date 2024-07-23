import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../componentes/navbar";
import Cookies from 'js-cookie'
import { NotificationResponse } from "../componentes/notification/notificationResponse.jsx";
import { NotificationFollow } from "../componentes/notification/notificationFollow.jsx";



import '../saas/notification/notification.scss'


// Pagina para ver todas las notificaciones de respuestas a post propios y follows
// Se cargaran desde los componentes
function Notification() {
    const navigate = useNavigate()
    const userCurrentID = Cookies.get('id')

    const [show, setShow] = useState(<NotificationResponse />)
    const [buttonFollow, setButtonFollow] = useState('')
    const [buttonResponse, setButtonResponse] = useState('active')




    // Funcion para controlar los estilos de los botones y lo que se muestra en pantalla, follow o followers
    async function buttonShow(e) {
        const buttonValue = e.target.value

        if (buttonValue === 'Respuestas') {
            setShow(<NotificationResponse />)
            setButtonResponse('active')
            setButtonFollow('')
        } else if (buttonValue === 'Seguidores') {
            setShow(<NotificationFollow />)
            setButtonResponse('')
            setButtonFollow('active')
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