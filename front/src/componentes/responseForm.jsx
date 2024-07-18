import React from "react";
import { useState, useEffect } from "react";
import { dateFormat } from "../funciones/fecha";
import { getpostByID } from "../api/postAPI";
import { getUserByID } from "../api/userAPI";
import { responseCreate } from "../api/responseAPI";
import { ImageUpload } from "../funciones/resizeIMG";
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
        const postIMG = await ImageUpload(e.target.parentElement.childNodes[0].files[0])

        const responsePost = document.getElementById('responseForm-textarea')
        const responseIMG = document.getElementById('file')

        const responseArray = {'postID': id,
                            'username': userData.data.username,
                            'dateString': await dateFormat(Date.now()),
                            'post': responsePost.value,
                            'img': postIMG}

        const responseSend = await responseCreate(responseArray)   
        responsePost.value = ''
        responseIMG.value = ''
        setReboot(true)
    }




    return (
        <>
        
            <div id="responseForm-body">
                <h3>Responder a {userPost}</h3>
                <textarea id='responseForm-textarea' cols='40' rows='5'></textarea>
                <div id="responseForm-buttons">
                    <input type="file" name="file" id="file" />
                    <input type="button" value="Enviar" onClick={sendResponse} />
                </div>
            </div>
        
        </>
    )
}


export {
    ResponseForm
}