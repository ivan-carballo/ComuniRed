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

    const [reboot, setReboot] = useState(true)
    const [data, setData] = useState()

    

    // useEffect para obtener todas las notificaciones del usuario logueado y mostrarlas en pantalla con un metodo map
    useEffect(() => {
        if(reboot) {

            getNotiFollow()
            async function getNotiFollow() {
                const getNotiFollowByUser = await getNotiFollowByProperty('followerID', userCurrentID)

                const notiFollowMap = getNotiFollowByUser.data.reverse().map((data) => 
                    <div id="notiFollowMap-div" key={data._id}>
                        <p id="notiFollowMap-date">{data.dateString}</p>
                        <div id="notiFollowMap-data">
                            <img id="notiFollowMap-data-img" src={data.img}></img>
                            <p id="notiFollowMap-data-username" value={data.followID} onClick={checkFollow}>{data.username}</p>
                            <input type="button" value='seguir' id="notiFollowMap-data-button" />
                        </div>
                    </div>
                )
                setData(notiFollowMap)
            }
        }
    }, [reboot])



    // Funcion para ir al perfil de un seguidor pulsando el nombre y eliminar la notificacion asociada a ese seguidor
    async function checkFollow(e) {
        const getFollowID = e.target.attributes[1].value
        
        // Buscar el ID de la notificacion y eliminarlo
        const getFollowByFollowID = await getNotiFollowByProperty('followerID', userCurrentID)
        const getFollowerFilter = await getFollowByFollowID.data.filter(data => data.followID == getFollowID)
        const notiFollowRemove = await notiFollowDelete(getFollowerFilter[0]._id)

        // Llevar al perfil del usuario
        navigate(`/user/${getFollowID}`)
    }



    // Funcion para marcar todas las notificaciones de nuevos seguidores como vistas
    async function Allcheck(e) {
        const getAllNotiFollow = await getNotiFollowByProperty('followerID', userCurrentID)
        const followDeleteMap = Promise.all( getAllNotiFollow.data.map( async (data) => {
            const followAllDelete = await notiFollowDelete(data._id)
        }))
        setReboot(true)
        
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