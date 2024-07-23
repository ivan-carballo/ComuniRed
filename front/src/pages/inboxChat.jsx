import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../componentes/navbar";
import { getInbox, getInboxByID, inboxUpdate } from "../api/inboxAPI";
import { Header } from "../componentes/inbox/header";
import { dateFormat } from '../funciones/fecha.js'
import { getNotiInboxByProperty, notiInboxCreate, notiInboxDelete } from "../api/notiInboxAPI.js";
import Cookies from 'js-cookie'

import '../saas/inbox/inboxChat.scss'



// Pagina para los mensajes privados entre usuarios, se ven todos los mensajes con un usuario en concreto
function InboxChat() {
    const { id } = useParams()

    const userCurrentID = Cookies.get('id')
    let userOpposite = ''

    const [reboot, setReboot] = useState(true)
    const [data, setData] = useState()
    const [userReceived, setUserReceived] = useState()


    

    // Intervalo de tiempo para que se actualice cada 10 segundos por si hay nuevos mensajes
    setInterval(() => {
        setReboot(true)
    }, 10000);    




    // useEffect para traer todos los mensajes que se han mandado entre ambos usuarios
    useEffect(() => {
        if (reboot){

            getInbox()
            async function getInbox() {
                const getInboxByUser = await getInboxByID(id)

                // Guardar en un estado el ID del usuario que recibe los mensajes
                getInboxByUser.data.userID1 === userCurrentID ? setUserReceived(getInboxByUser.data.userID2) : setUserReceived(getInboxByUser.data.userID1)

                // Map para mostrar en pantalla los mensajes ordenados por fecha
                // Operadores ternarios para poder visualizar que mensaje pertenece a cada usuario
                const inboxMap = await getInboxByUser.data.text.reverse().map((data) => 
                    <div id="inboxChat-div" key={data.date} className={data.userID != userCurrentID ? "opposite" : "current"}>
                        <p className={data.userID != userCurrentID ? "start" : "end"} id='inboxChat-date'>{data.dateString}</p>
                        <p className={data.userID != userCurrentID ? "start" : "end"} id='inboxChat-text'>{data.text}</p>
                    </div>
                )
                setData(inboxMap)

                // Eliminar las notificaciones que estan asociadas a esta conversacion
                // Ternario para saber cual es el ID del usuario que ha mandado mensaje
                getInboxByUser.data.userID1 === userCurrentID ? userOpposite = getInboxByUser.data.userID2 : userOpposite = getInboxByUser.data.userID1

                const getNotiInboxReceived = await getNotiInboxByProperty('userReceived', userCurrentID)
                const getNotiInboxReceivedFilter = await getNotiInboxReceived.data.filter( data => data.userSend == userOpposite)

                if (getNotiInboxReceivedFilter.length > 0) {
                    const notiInboxRemove = await notiInboxDelete(getNotiInboxReceivedFilter[0]._id)
                }
                setReboot(false)
            }
        }
    }, [reboot])




    
    // Funcion para enviar un nuevo mensaje al otro usuario
    async function sendChat(e) {
        const textarea = document.getElementById('inboxChat-textarea')

        const getInboxChat = await getInboxByID(id)
        let allChats = getInboxChat.data.text

        const updateArrayText = {'text': textarea.value,
                                'dateString': await dateFormat(Date.now()),
                                'date': Date.now(),
                                'userID': userCurrentID}

        allChats.push(updateArrayText)

        const updateArrayInbox = {'text': allChats,
                                'date': Date.now(),
                                'dateString': await dateFormat(Date.now()) }

        const UpdateNewChat = await inboxUpdate(id, updateArrayInbox)

        // Crear una notificacion al usuario contrario de los mensajes enviados
        const NotiInboxArray = {'userSend': userCurrentID,
                                'userReceived': userReceived }

        // Hacer comprobacion de que no tiene ninguna notificacion pendiente anterior y no repetir info en MongoDB
        const getNotiByUser = await getNotiInboxByProperty('userSend', userCurrentID)
        const getNotiByUserFilter = await getNotiByUser.data.filter( data => data.userReceived == userReceived)

        if (getNotiByUserFilter.length == 0) {
        const notiInboxSend = await notiInboxCreate(NotiInboxArray)
        }

        textarea.value = ''

        setReboot(true)
    }






    return (
        <>
        
            <Navbar /> 


            <div id="inboxChat-body">
                
                <Header id={id}/>


                <div id="inboxChat-input">
                    <textarea id='inboxChat-textarea' cols={40} rows={6}  placeholder="Escriba su mensaje aqui..." />
                    <input type="button" value="Enviar" onClick={sendChat} />
                </div>


                {data}
                
            </div>
        
        </>
    )

}


export {
    InboxChat
}