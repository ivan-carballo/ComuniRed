// Pagina para gestionar todos los mensajes privados enviados y recibidos


import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { Navbar } from "../componentes/navbar";
import { getInboxByProperty } from '../api/inboxAPI'

import '../saas/inbox/inbox.scss'



function Inbox() {
    const userCurrentID = Cookies.get('id')

    const [reboot, setReboot] = useState(true)
    const [state, setState] = useState()


    // UseEffect para recopilar todos los mensajes relacionados con el usuario logueado
    useEffect(() => {
        if (reboot) {

            getInboxByUser()
            async function getInboxByUser() {
                // Traer los mensajes relacionados con este usuario, se usan dos llamadas para traer tanto si ha enviado como si ha recibido





            }

        }
        setReboot(false)

    }, [reboot])



    return (
        <>
        
            <Navbar />

            <div id="inbox-body">
                <h3>Inbox</h3>
            </div>
        
        </>
    )
}



export {
    Inbox
}