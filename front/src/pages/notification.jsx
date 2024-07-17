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
                const getNotificationByUserFilter = getNotificationByUser.data.filter((data) => data.userPrincipalID != userID)
                
                if (getNotificationByUserFilter.reverse().length > 0) {
                    const notificacionMap = getNotificationByUserFilter.data.map((data) => 

                            <div key={data._id} name={data._id} id="notification-div" onClick={notificationDetail}>
                                <p id='notification-p-username' name={data._id}>{data.username}</p>
                                <p id='notification-p-date' name={data._id}>{data.dateString}</p>
                                <p id='notification-p-post' name={data._id}>{data.post}</p>
                            </div>

                    )
                    setData(notificacionMap)
                }
            }
            setReboot(false)
        }

        
    }, [reboot])




    
    async function notificationDetail(e) {
        const notificationID = e.target.attributes.name.value
        
        const notificacionPostPrincipal = await getNotificationByID(notificationID)
        const postPrincipalID = await notificacionPostPrincipal.data.postPrincipalID

        const notificationRemove = await notificationDelete(notificationID)

        navigate(`/response/${postPrincipalID}`)
    }




    
    async function notificationView() {
        const notificationRemoveAll = await getNotificationByProperty('userPrincipalID', userID)

        for (let i = 0; notificationRemoveAll.data.length > i; i++) {
            //const notificationRemoveLoop = notificationDelete(notificationRemoveAll.data[i]._id)
        }

        setReboot(true)
    }




    return (
        <>

            <Navbar />

            <div id="notification-readAll">
                <input type="button" value="Marcar todas como vistas" onClick={notificationView} />
            </div>
        
            <div id="notification-body">

                {data}

            </div>
        
        </>
    )
}


export {
    Notification
}