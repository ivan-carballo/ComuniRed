import React from "react";
import { useState, useEffect } from "react";
import { dateFormat } from "../funciones/fecha";
import { getpostByID } from "../api/postAPI";
import { getUserByID } from "../api/userAPI";
import { responseCreate } from "../api/responseAPI";
import Cookies from 'js-cookie'

import '../saas/response/responseForm.scss'


function ResponseForm({id}) {
    const userID = Cookies.get('id')

    const [reboot, setReboot] = useState(true)
    const [userPost, setUserPost] = useState()


    useEffect(() => {
        if (reboot) {

            getData()
            async function getData() {
                const getPostPrincipal = await getpostByID(id)
                setUserPost(getPostPrincipal.data.username)
            }

        }
        setReboot(false)
    }, [reboot])




    async function sendResponse(e) {
        const userData = await getUserByID(userID)

        const responsePost = document.getElementById('responseForm-textarea')

        const responseArray = {'postID': id,
                            'username': userData.data.username,
                            'dateString': await dateFormat(Date.now()),
                            'post': responsePost.value}

        const responseSend = await responseCreate(responseArray)   
        responsePost.value = ''
    }




    return (
        <>
        
            <div id="responseForm-body">
                <h3>Responder a {userPost}</h3>
                <textarea id='responseForm-textarea' cols='40' rows='5'></textarea>
                <input type="button" value="Enviar respuesta" onClick={sendResponse} />
            </div>
        
        </>
    )
}


export {
    ResponseForm
}