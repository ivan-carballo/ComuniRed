import React from "react";
import { useState, useEffect, useContext } from "react";
import { dateFormat } from "../../funciones/fecha";
import { getpostByID } from "../../api/postAPI";
import { getUserByID } from "../../api/userAPI";
import { responseCreate } from "../../api/responseAPI";
import { ImageUpload } from "../../funciones/resizeIMG";
import { useNavigate } from "react-router-dom";
import { ContextoCompartido } from "../../funciones/context";
import Cookies from 'js-cookie'

import '../../saas/response/responseForm.scss'


// Componente de un formulario para poder responder a post desde la pagina de detalle de post
function ResponseForm({id}) {
    const navigate = useNavigate()
    const userCurrentID = Cookies.get('id')

    const [reboot, setReboot] = useState(true)
    const [userPost, setUserPost] = useState()
    const { setValorResponse } = useContext(ContextoCompartido);



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
        const userData = await getUserByID(userCurrentID)
        let postIMG = ''

        // Ternario para evitar que si no hay foto de error la funcion de redimensionar
        e.target.parentElement.childNodes[0].files[0] != undefined ? postIMG = await ImageUpload(e.target.parentElement.childNodes[0].files[0]) : postIMG

        const responsePost = document.getElementById('responseForm-textarea')
        const responseIMG = document.getElementById('file')

        // Obtener datos del usuario para la foto de perfil
        const getUserIMG = await getUserByID(userCurrentID)

        // Objeto con todos los datos para guardar en MongoDB
        const responseArray = {'postID': id,
                            'username': userData.data.username,
                            'dateString': await dateFormat(Date.now()),
                            'post': responsePost.value,
                            'img': postIMG,
                            'userID': userCurrentID}

        const responseSend = await responseCreate(responseArray, getUserIMG.data.img)   
        responsePost.value = ''
        responseIMG.value = ''

        setReboot(true)
        setValorResponse(true)
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