import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { Navbar } from "../componentes/navbar";
import { ResponseForm } from "../componentes/responseForm";
import { useParams } from "react-router-dom";
import { getpostByID } from "../api/postAPI";
import { getresponseByID, getResponseByProperty, responseDelete } from "../api/responseAPI";
import { getUserByID } from "../api/userAPI";
import { getNotificationByProperty, getNotificationByID, notificationDelete } from "../api/notificationAPI";

import '../saas/response/response.scss'


function Response() {
    const { id } = useParams()
    const userCurrentID = Cookies.get('id')

    const [dataResponse, setDataResponse] = useState()
    const [reboot, setReboot] = useState(true)

    const [username, setUsername] = useState()
    const [dateString, setDateString] = useState()
    const [postPrincipal, setPostPrincipal] = useState()
    const [userIMG, setUserIMG] = useState()
    

    useEffect(() => {
        if (reboot) {
            getPost(id)
            async function getPost(id) {
                const getPostPrincipal = await getpostByID(id)
                const getUserPrincipal = await getUserByID(getPostPrincipal.data.userID)
                setUsername(getPostPrincipal.data.username)
                setDateString(getPostPrincipal.data.dateString)
                setPostPrincipal(getPostPrincipal.data.post)
                setUserIMG(getUserPrincipal.data.img)

                const userCurrentUsername = await getUserByID(userCurrentID)

                const getResponseChildren = await getResponseByProperty('postID', id)
                
                const getResponseChildrenMap = await getResponseChildren.data.reverse().map((data) =>
                    <div key={data._id} id="getResponse-div">
                        <p id='getResponse-div-username'>{data.username}</p>
                        <p>{data.dateString}</p>
                        <p id='getResponse-div-post'>{data.post}</p>
                        {userCurrentUsername.data.username === data.username ? <div id="getResponse-div-button"> <input type="button" value="Eliminar respuesta" id={data._id} onClick={responseDeleteByUser} /> </div> : <></>}
                    </div>
                )
                setDataResponse(getResponseChildrenMap)

            }
        }
        setReboot(false)
    }, [reboot])
    




    async function responseDeleteByUser(e) {
        const responseID = e.target.id

        const getNotificationID = await getNotificationByProperty('responseID', responseID)

        const responseRemove = await responseDelete(responseID)
        const notificationRemove = await notificationDelete(getNotificationID.data[0]._id)

        setReboot(true)
    }





    return (

        <>
            <Navbar />

            <div id="response-body">

                <div id="response-responseForm">
                    <ResponseForm id={id} />
                </div>

                <div id="response-postPrincipal">

                    <div id="response-postPrincipal-header">
                        <div id="response-postPrincipal-header-img">
                            <img src={userIMG} />
                        </div>
                        <div id="response-postPrincipal-header-userData">
                            <p id='userData-username'>{username}</p>
                            <p>{dateString}</p>
                        </div>                     
                    </div>

                    <p id='response-postPrincipal-post'>{postPrincipal}</p>
                </div>


                <div id="response-responses">
                    <div id="response-border">
                        {dataResponse}
                    </div>
                </div>

            </div>


        </>

    )
}


export {
    Response
}