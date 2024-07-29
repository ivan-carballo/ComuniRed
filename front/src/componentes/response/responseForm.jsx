import React from "react";
import { useState, useEffect, useContext } from "react";
import { dateFormat } from "../../funciones/fecha";
import { getpostByID } from "../../api/postAPI";
import { getUserByID } from "../../api/userAPI";
import { responseCreate } from "../../api/responseAPI";
import { validImageTypes } from "../../funciones/resizeIMG";
import { useNavigate } from "react-router-dom";
import { ContextoCompartido } from "../../funciones/context";
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import { uploadFile } from '../../funciones/uploadImage.js'

import '../../saas/response/responseForm.scss'

import { API_URL } from "../../api/API.js";


// Componente de un formulario para poder responder a post desde la pagina de detalle de post
function ResponseForm({id}) {
    const navigate = useNavigate()
    const userCurrentID = Cookies.get('id')

    const [reboot, setReboot] = useState(true)
    const [userPost, setUserPost] = useState()
    const [alert, setAlert] = useState()
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
        let postIMG = e.target.parentElement.childNodes[0].files[0]
        
        let routeFile = ''



        // Condicional para evitar que se carguen archivos que no sean de imagen o video
        if (postIMG) {
            if (validImageTypes(postIMG.type)) {
                
                // Condicional para que cuando no haya cargada una imagen, no ejecute la funcion para evitar errores
                if (postIMG != undefined && postIMG != null) {
                    // Datos de multer para subir el archivo al servidor
                    postIMG = await uploadFile(postIMG);
                    routeFile = `${API_URL}${postIMG.filePath}`

                }
            } else {
                setAlert('Solo son validos archivos de imagen')
                return
            }
        }

        


        const responsePost = document.getElementById('responseForm-textarea')
        const responseIMG = document.getElementById('file')

        // Obtener datos del usuario para la foto de perfil
        const getUserIMG = await getUserByID(userCurrentID)

        // Objeto con todos los datos para guardar en MongoDB
        const responseArray = {'postID': id,
                            'username': userData.data.username,
                            'dateString': await dateFormat(Date.now()),
                            'post': responsePost.value,
                            'img': routeFile,
                            'userID': userCurrentID}

        const responseSend = await responseCreate(responseArray, getUserIMG.data.img)   
        responsePost.value = ''
        responseIMG.value = ''

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Su respuesta ha sido enviada",
            showConfirmButton: false,
            timer: 2000
          });

        setReboot(true)
        setValorResponse(true)
        setAlert(null)
    }




    return (
        <>
        
            <div id="responseForm-body">
                <h3>Responder a {userPost}</h3>
                <textarea id='responseForm-textarea' cols='40' rows='5'></textarea>
                <div id="responseForm-buttons">
                    <input type="file" name="file" id="file" />
                    <input type="button" value="Enviar" onClick={sendResponse} />
                    {alert}
                </div>
            </div>
        
        </>
    )
}


export {
    ResponseForm
}