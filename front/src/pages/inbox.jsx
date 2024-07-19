// Pagina para gestionar todos los mensajes privados enviados y recibidos


import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { Navbar } from "../componentes/navbar";
import { getInboxByProperty } from '../api/inboxAPI'
import { getUserByID } from '../api/userAPI'

import '../saas/inbox/inbox.scss'



function Inbox() {
    const userCurrentID = Cookies.get('id')

    const [reboot, setReboot] = useState(true)
    const [state, setState] = useState()
    const [data, setData] = useState()


    // UseEffect para recopilar todos los mensajes relacionados con el usuario logueado
    useEffect(() => {
        if (reboot) {

            getInboxByUser()
            async function getInboxByUser() {
                // Traer los mensajes relacionados con este usuario, se usan dos llamadas para traer tanto si ha enviado como si ha recibido

                const getInbox1 = await getInboxByProperty('userID1', userCurrentID)
                const getInbox2 = await getInboxByProperty('userID2', userCurrentID)

                // Unir ambos filtrados en un mismo array
                let getInboxJoin = [...getInbox1.data, ...getInbox2.data];

                let inboxMap = []

                // Añadir nuevos campos al array con el id de los usuarios ya localizados
                // Tambien añadir nombre e imagen del usuario opuesto llamandolo desde API
                const getInboxMap = await Promise.all (getInboxJoin.map( async (data) => {
                    let userOppositeID = ''
                    let userLogID = ''

                    // Ternarios para diferenciar el ID de cada usuario
                    data.userID1 === userCurrentID ? userOppositeID = data.userID2 : userOppositeID = data.userID1
                    data.userID1 === userCurrentID ? userLogID = data.userID1 : userLogID = data.userID2

                    // Llamada a getUserByID y sacar username e imagen de perfil
                    const getOppositeUser = await getUserByID(userOppositeID)

                    let username = getOppositeUser.data.username
                    let perfilIMG = getOppositeUser.data.img

                    // Meter los nuevos datos al array original
                    data.userOppositeID = userOppositeID
                    data.userLogID = userLogID
                    data.username = username
                    data.img = perfilIMG
                    inboxMap.push(data)
                }))



                // Crear un metodo map para mostrar en pantalla las conversaciones actuales y que pueda seleccionar la que desea abrir
                const inboxUserMap = inboxMap.map((data) => 
                    <div id="chat-div" key={data._id}>
                        <img src={data.img} />
                        <p>{data.username}</p>
                    </div>
                )

                setData(inboxUserMap)

            }

        }
        setReboot(false)

    }, [reboot])


    

    return (
        <>
        
            <Navbar />

            <div id="inbox-body">
                <h3>Inbox</h3>
                {data}
            </div>
        
        </>
    )
}



export {
    Inbox
}