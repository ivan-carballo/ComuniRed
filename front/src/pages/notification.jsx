import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../componentes/navbar";
import Cookies from 'js-cookie'
import { getNotificationByID, getNotificationByProperty, notificationDelete } from '../api/notificationAPI.js'
import { responseUpdate } from '../api/responseAPI.js'


import '../saas/notification/notification.scss'



function Notification() {
    const navigate = useNavigate()
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

                        //<a id='notification-a' href={`/response/${data.postPrincipalID}`} key={data._id}>

                            <div key={data._id} name={data._id} id="notification-div" onClick={notificationDetail}>
                                <p id='notification-p-username' name={data._id}>{data.username}</p>
                                <p id='notification-p-date' name={data._id}>{data.dateString}</p>
                                <p id='notification-p-post' name={data._id}>{data.post}</p>
                            </div>

                        //</a>

                    )
                    setData(notificacionMap)
                }
            }
        }

        setReboot(false)
    }, [reboot])




    
    async function notificationDetail(e) {
        const notificationID = e.target.attributes.name.value
        
        const notificacionPostPrincipal = await getNotificationByID(notificationID)
        const postPrincipalID = await notificacionPostPrincipal.data.postPrincipalID

        const notificationRemove = await notificationDelete(notificationID)

        navigate(`/response/${postPrincipalID}`)
    }






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