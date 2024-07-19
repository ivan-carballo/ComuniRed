// Componente para mostrar todos los posts de los usuarios, sin filtros de busqueda


import '../../saas/index/post.scss'

import React from 'react';
import Cookies from 'js-cookie'
import { dateFormat } from '../../funciones/fecha.js';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../modal.jsx'
import { useState, useEffect, useContext } from "react";
import { getPost, postDelete } from "../../api/postAPI.js"
import { getUserByID } from '../../api/userAPI.js';
import { getResponseByProperty, responseDelete, responseCreate } from '../../api/responseAPI.js';
import { notificationDelete, getNotificationByProperty } from '../../api/notificationAPI.js';
import { Response } from '../../pages/response.jsx';
import { postRemove } from '../../funciones/postDelete.js';
import { ImageUpload } from '../../funciones/resizeIMG.js';




function Post() {
    const navigate = useNavigate()
    const userID = Cookies.get('id')

    const [recarga, setRecarga] = useState(true)
    const [data, setData] = useState('')
    const [response, setResponse] = useState('')


  
    // UseEffect para traer todos los posts creados
    useEffect(() => {
        if(recarga) {

            allPost()
            async function allPost() {
                let AllPostData = await getPost()
                AllPostData = AllPostData.data.reverse()
                
                let datosIMG = []

                // Sacar datos de las tablas post y user para poder mostrar la foto de perfil de cada usuario al lado de su post
                const allPostIMG = await AllPostData.map( async (dataIMG) => {
                    let userIMG = await getUserByID(dataIMG.userID)
                    userIMG = userIMG.data.img
                    dataIMG.userimg = userIMG

                    let userResponse = await getResponseByProperty('postID', dataIMG._id)
                    dataIMG.responses = userResponse.data.length
                    datosIMG.push(dataIMG)
                })

                
                // Limite de espera para evitar que continue antes de que se hayan podido guardar correctamente las fotos de perfil
                setTimeout(async () => {
                    await mapPost()
                }, 500);


                // Meter todos los resultados en un metodo map para estructurarlo y poder mostrarlo en pantalla
                async function mapPost() {
                    const allPostMap = await datosIMG.map((data) => 
                        <div id='post-div' key={data._id}>
                            <div id="post-header">
                                <img src={data.userimg} />
                                <div id="post-header-data">
                                    <h2 onClick={async () => {navigate(`/user/${data.userID}`)}}>{data.username}</h2>
                                    <h4 id='post-date'>{data.dateString}</h4>
                                </div>
                            </div>
                            <p id='post-post'>{data.post}</p>
                            <img id='post-img' src={data.img} />
                            <div id="buttons-post">
                                <input type="button" value="Responder" id={data._id} onClick={async ()=>{setResponse(data)}} />
                                <input type="button" value='Ver detalle' id={data._id} onClick={async ()=> {navigate(`/response/${data._id}`)}} />
                                {userID == data.userID ? <input type="button" value="Eliminar" id={data._id} onClick={deletePost} /> : <></>} {/* Ternario para que el dueño del post pueda eliminarlo, pero no visible para el resto de users */}
                            </div>
                        </div>
                    )
                    setData(allPostMap)
                }
                setRecarga(false)
            }
        }
    }, [recarga]);




    // Funcion para poder eliminar posts por usuario
    // Elimina tanto el post original como todas las respuestas asociadas a dicho post
    async function deletePost(e) {
        const postID = e.target.id

        const responsebyPost = await getResponseByProperty('postID', postID)
        const notificationByPost = await getNotificationByProperty('postPrincipalID', postID)

        for (let i = 0; responsebyPost.data.length > i; i++) {
            const responseRemoveLoop = await responseDelete(responsebyPost.data[i]._id)
        }

        for (let i = 0; notificationByPost.data.length > i; i++) {
            const notificationRemoveLoop = await notificationDelete(notificationByPost.data[i]._id)
        }

        const deletePostAPI = await postRemove(postID)
        setRecarga(true)
    }



    // Funcion para responder a un post, a esta funcion se accede desde el modal
    async function responsePost(e) {
        let userName = await getUserByID(Cookies.get('id'))

        const postUser = userName.data.username
        const postOriginID = e.target.id
        const postDate = await dateFormat(Date.now())
        const postResponse = document.getElementById('modalResponse-textarea')
        const postIMG = e.target.offsetParent.childNodes[0].childNodes[1].childNodes[0].files[0]


        // Condicional para diferenciar si se carga una imagen o no junto con la respuesta
        // Para evitar errores con MongoDB y la funcion ImageUpload que es externa
        if (postIMG === undefined) {
            const arrayResponse = {'postID': postOriginID,
                'username': postUser,
                'dateString': postDate,
                'post': postResponse.value,
                'userID': userID}

            const sendResponse = await responseCreate(arrayResponse)
            setResponse(null)
            setRecarga(true)
        } else {
            const postIMGBase64 = await ImageUpload(postIMG)

            const arrayResponse = {'postID': postOriginID,
                'username': postUser,
                'dateString': postDate,
                'post': postResponse.value,
                'img': postIMGBase64,
                'userID': userID}

            const sendResponse = await responseCreate(arrayResponse)

            setResponse(null)
            setRecarga(true)
        }
    }





    return (
        <div id="post-body">

            {/* Modal para poder enviar una respuesta */}
            {response && 
                <Modal isOpen={true}>

                    <div id="modalResponse-body">

                        <div id="modalResponse-form">

                            <div id="modalResponse-form-header">
                                <p>Responder a {response.username}</p>
                            </div>

                            <div id="modalResponse-form-response">
                                <textarea id='modalResponse-textarea' cols="35" rows="10" placeholder='Escriba su respuesta' />
                            </div>

                        </div>

                        <div id="modalResponse-upload">
                            <input type="file" name="file" id="file" />
                        </div>

                        <div id="modalResponse-buttons">
                            <button onClick={async () => {setResponse(null)}}>Cerrar</button>
                            <button id={response._id} onClick={responsePost}>Enviar respuesta</button>
                        </div>

                    </div>

                </Modal>
            }


            {/* Lista de post que viene del metodo map */}
            <div id="listPost">
                {data}
            </div>
        </div>
    )
}




export {
    Post
}