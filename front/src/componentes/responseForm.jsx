import React from "react";
import { useState, useEffect } from "react";
import { dateFormat } from "../funciones/fecha";
import { getpostByID } from "../api/postAPI";
import { getUserByID } from "../api/userAPI";
import { responseCreate } from "../api/responseAPI";
import { ImageUpload } from "../funciones/resizeIMG";
import Cookies from 'js-cookie'

import '../saas/response/responseForm.scss'


// Componente de un formulario para poder responder a post desde la pagina de detalle de post
function ResponseForm({id}) {
    const userID = Cookies.get('id')

    const [reboot, setReboot] = useState(true)
    const [userPost, setUserPost] = useState()


    // useEffect para mostrar la informacion del post desde el id que se ha mandado como argumento de la funcion principal
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




    // Funcion para guardar una nueva respuesta
    async function sendResponse(e) {
        // Se meten los datos de los inputs en variables
        const userData = await getUserByID(userID)
        const postIMG = await ImageUpload(e.target.parentElement.childNodes[0].files[0])

        const responsePost = document.getElementById('responseForm-textarea')
        const responseIMG = document.getElementById('file')

        // Objeto con todos los datos para guardar en MongoDB
        const responseArray = {'postID': id,
                            'username': userData.data.username,
                            'dateString': await dateFormat(Date.now()),
                            'post': responsePost.value,
                            'img': postIMG,
                            'userID': userID}

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