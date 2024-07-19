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

    console.log(id);



    return (
        <>
        
            <Navbar /> 


            <div id="inboxChat-body">
                <h2>chatsssss</h2>
            </div>
        
        </>
    )

}


export {
    InboxChat
}