import '../../saas/index/newPost.scss'
import { getUserByID } from '../../api/userAPI'
import { postCreate } from '../../api/postAPI';
import React from 'react';
import { useState, useEffect, useContext } from "react";
import { dateFormat } from '../../funciones/fecha.js';
import Cookies from 'js-cookie'
import { validImageTypes } from '../../funciones/resizeIMG.js';
import { ContextoCompartido  } from '../../funciones/context.jsx';
import Swal from 'sweetalert2'
import { uploadFile } from '../../funciones/uploadImage.js'

import { API_URL } from '../../api/API.js';



// Componente de formulario para poder escribir nuevos posts
function NewPost({  }) {
    const [usernamePost, setUsernamePost] = useState('')
    const [userIMG, setUserIMG] = useState('')
    const [alert, setAlert] = useState()

    const { setValorCompartido } = useContext(ContextoCompartido);

    const userID = Cookies.get('id')
    let username_data = ''



    // UseEffect a la carga del componente para traer los datos del usuario logueado y usarlos en el formulario
    useEffect(() => {
        userFind()
        async function userFind() {
            const userByID = await getUserByID(userID)

            setUsernamePost(`Cuenta tus divagaciones, ${userByID.data.username}`)
            setUserIMG(userByID.data.img)
            username_data = userByID.data.username
        }
    }) 




    // Funcion para crear un post nuevo
    async function enviarPost(e) {
        // Sacar los valores de los inputs
        const postText = e.target.form[0].value
        let postIMG = e.target.form[1].files[0]
        
        let routeFile = ''

        // Condicional para evitar que se carguen archivos que no sean de imagen
        if (postIMG) {
            if (validImageTypes(postIMG.type)) {
                // Condicional para que cuando no haya cargada una imagen, no ejecute la funcion para evitar errores
                if (postIMG != undefined && postIMG != null) {
                    postIMG = await uploadFile(postIMG);
                    routeFile = `${API_URL}${postIMG.filePath}`
                }
            } else {
              setAlert('Solo son validos archivos de imagen')
              return
            }
        }

        const postDate = await dateFormat(Date.now()) // Sacar fecha actual de una funcion externa

        const arrayNewPost = {'userID': userID,
                            'post': postText,
                            'username': username_data,
                            'dateString': postDate,
                            'img': routeFile}

        // Condicional para obligar a que haya un mensaje o una imagen, al menos uno de ellos debe estar con informacion
        if (postText.length > 0 || postIMG != undefined) {
            setAlert('')
            const sendNewPost = await postCreate(arrayNewPost, userIMG)
        } else {
            setAlert('Debe rellenar al menos uno de los campos')
            return
        }

        // Capturar textarea e input de imagen y vaciarlos una vez creado el post
        const textareaDel = document.getElementById('newPost-input')
        const inputFileDel = document.getElementById('file')
        textareaDel.value = ''
        inputFileDel.value = ''

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Su mensaje ha sido creado",
            showConfirmButton: false,
            timer: 1500
          });

          setTimeout(() => {
            setValorCompartido(true)
          }, 500);
        
    }






    return (
        <div id='newPost-body'>
            <div id="newPost-div-form">
                    <form id='newPost-form'>
                        <div id="newPost-row-1">
                            <img src={userIMG} alt="user-img" id='user-img' />
                            <textarea id="newPost-input" rows='5' cols='15' placeholder={usernamePost} />
                        </div>
                        <div id="newPost-row-2">
                            <input type="file" name="file" id="file"/>
                            <input type="button" id='newPost-button' value="Enviar" onClick={enviarPost} />
                            {alert}
                        </div>
                    </form>
                </div>
        </div>
    )
}


export {
    NewPost
}