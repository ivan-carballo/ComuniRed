import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { getNotiFollowByProperty, notiFollowDelete } from '../../api/notiFollowAPI'


import '../../saas/notification/notiFollow.scss'


// Componente para mostrar en las notificaciones los nuevos seguidores que se ha tenido
function NotificationFollow() {
    const navigate = useNavigate()
    const userCurrentID = Cookies.get('id')

    const [data, setData] = useState()




    // Funcion para marcar todas las notificaciones de nuevos seguidores como vistas
    async function Allcheck(e) {
        const getAllNotiFollow = await getNotiFollowByProperty('followerID', userCurrentID)
        const followDeleteMap = Promise.all( getAllNotiFollow.data.map( async (data) => {
            const followAllDelete = await notiFollowDelete(data._id)
        }))
        
    }



    return (
        <>
        
            <div id="notificationFollow-body">

                <div id="notificationFollow-button">
                    <input type="button" value="Marcar todo como visto" onClick={Allcheck} />
                </div>

                <div id="notificationFollow-data">
                    {data}
                </div>

            </div>
        
        </>
    )
}


export {
    NotificationFollow
}