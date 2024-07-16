import React from "react";
import { useState, useEffect } from "react";
import { Navbar } from "../componentes/navbar";
import Cookies from 'js-cookie'
import { getNotificationByProperty } from '../api/notificationAPI.js'


import '../saas/notification/notification.scss'



function Notification() {
    const userID = Cookies.get('id')

    const [reboot, setReboot] = useState(true)
    const [data, setData] = useState()




    useEffect(() => {
        if (reboot) {

            showNotification()
            async function showNotification() {
                const getNotificationByUser = await getNotificationByProperty('userPrincipalID', userID)
                
                if (getNotificationByUser.data.reverse().length > 0) {
                    const notificacionMap = getNotificationByUser.data.map((data) => 

                        <a id='notification-a' href="http://" key={data._id}>

                            <div key={data._id} id="notification-div">
                                <p>{data.username}</p>
                                <p>{data.dateString}</p>
                                <p>{data.post}</p>
                            </div>

                        </a>

                    )
                    setData(notificacionMap)
                }
            }
        }

        setReboot(false)
    }, [reboot])





    return (
        <>

            <Navbar />
        
            <div id="notification-body">

                {data}

            </div>
        
        </>
    )
}


export {
    Notification
}