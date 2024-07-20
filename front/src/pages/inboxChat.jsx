import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../componentes/navbar";
import { getInbox, getInboxByID, inboxUpdate } from "../api/inboxAPI";
import { Header } from "../componentes/inbox/header";
import { dateFormat } from '../funciones/fecha.js'
import Cookies from 'js-cookie'

import '../saas/inbox/inboxChat.scss'




function InboxChat() {
    const { id } = useParams()

    const userCurrentID = Cookies.get('id')

    const [reboot, setReboot] = useState(true)
    const [data, setData] = useState()


    
    // Intervalo de tiempo para que se actualice cada 10 segundos por si hay nuevos mensajes
    setInterval(() => {
        getInbox()
    }, 10000);    



    // useEffect para traer todos los mensajes que se han mandado entre ambos usuarios
    useEffect(() => {
        if (reboot){

            getInbox()
            async function getInbox() {
                const getInboxByUser = await getInboxByID(id)

                // Map para mostrar en pantalla los mensajes ordenados por fecha
                const inboxMap = await getInboxByUser.data.text.reverse().map((data) => 
                    <div id="inboxChat-div" key={data.date}>
                        <p className={data.userID != userCurrentID ? "start" : "end"}>{data.dateString}</p>
                        <p className={data.userID != userCurrentID ? "start" : "end"} id='inboxChat-text'>{data.text}</p>
                    </div>
                )
                setData(inboxMap)
            }
        }
        setReboot(false)
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