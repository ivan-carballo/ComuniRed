import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../componentes/navbar";
import { getInboxByID } from "../api/inboxAPI";
import Cookies from 'js-cookie'

import '../saas/inbox/inboxChat.scss'



function InboxChat() {
    const { id } = useParams()

    const userCurrentID = Cookies.get('id')

    const [reboot, setReboot] = useState(true)
    const [data, setData] = useState()


    // useEffect para traer todos los mensajes que se han mandado entre ambos usuarios
    useEffect(() => {
        if (reboot){

            getInbox()
            async function getInbox() {
                const getInboxByUser = await getInboxByID(id)

                const inboxMap = await getInboxByUser.data.text.map((data) => 
                    <div id="inboxChat-div" key={data.date}>
                        <p>{data.dateString}</p>
                        <p>{data.text}</p>
                    </div>
                )
                setData(inboxMap)
            }

        }
        setReboot(false)
    }, [reboot])



    return (
        <>
        
            <Navbar /> 


            <div id="inboxChat-body">
                <h2>chatsssss</h2>
                {data}
            </div>
        
        </>
    )

}


export {
    InboxChat
}