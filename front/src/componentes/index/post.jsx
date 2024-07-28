
import '../../saas/index/post.scss'

import React from 'react';
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { dateFormat } from '../../funciones/fecha.js';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../modal.jsx'
import { useState, useEffect, useContext } from "react";
import { getPost, getpostByID, getPostScroll } from "../../api/postAPI.js"
import { getUserByID } from '../../api/userAPI.js';
import { getResponseByProperty, getresponseByID, responseDelete, responseCreate } from '../../api/responseAPI.js';
import { notificationDelete, getNotificationByProperty } from '../../api/notificationAPI.js';
import { Response } from '../../pages/response.jsx';
import { postRemove } from '../../funciones/postDelete.js';
import { validImageTypes } from '../../funciones/resizeIMG.js';
import { ContextoCompartido  } from '../../funciones/context.jsx';
import { uploadFile } from '../../funciones/uploadImage.js'
import { deleteFile } from '../../funciones/deleteImage.js'

import { API_URL } from '../../api/API.js';



// Componente para mostrar todos los posts de los usuarios, sin filtros de busqueda
function Post({  }) {
    const navigate = useNavigate()
    const userID = Cookies.get('id')

    const { valorCompartido } = useContext(ContextoCompartido);
    const { setValorCompartido } = useContext(ContextoCompartido);

    const [recarga, setRecarga] = useState(valorCompartido)
    const [data, setData] = useState('')
    const [response, setResponse] = useState('')
    const [aviso, setAviso] = useState()

    const [skip, setSkip] = useState(0)




    async function loadingPost(e) {
        const newPosts = await getPostScroll(skip + 15, 15);

        if (newPosts.data.length < 1) {
            return
        }

        setSkip(skip + 15);

        setValorCompartido(true);

        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });   
        }, 150);

    }



    async function loadingPostMinus(e) {
        const newPosts = await getPostScroll(skip - 15, 15);

        if (newPosts.data.length < 1 || skip < 15) {
            return
        } 

        setSkip(skip - 15);

        setValorCompartido(true);

        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });   
        }, 150);
    }
    



  
    // UseEffect para traer todos los posts creados
    useEffect(() => {
        if(valorCompartido) {

            allPost()
            async function allPost() {
                const allPostData = await getPostScroll(skip, 15)

                if (allPostData.data.length < 1) {
                    return
                }


                // Meter todos los resultados en un metodo map para estructurarlo y poder mostrarlo en pantalla
                const allPostMap = allPostData.data.map((data) => 
                    <div id='post-div' key={data._id}>
                        <div id="post-header">
                            <img src={data.userIMG} />
                            <div id="post-header-data">
                                <h2 onClick={async () => {navigate(`/user/${data.userID}`)}}>{data.username}</h2>
                                <h4 id='post-date'>{data.dateString}</h4>
                            </div>
                        </div>
                        <div id="post-data">
                            {/* Operadores ternarios para evitar que aparezca background-color y border cuando no existe informacion en MongoDB */}
                            { data.post.length > 1 ? <p id='post-post'>{data.post}</p> : <></> }
                            { data.img != null && data.img != undefined ? <img id='post-img' src={data.img} /> : <></> }
                        </div>
                        <div id="buttons-post">
                            <input type="button" value="Responder" id={data._id} onClick={async ()=>{setResponse(data)}} />
                            <input type="button" value='Ver detalle' id={data._id} onClick={async ()=> {navigate(`/response/${data._id}`)}} />
                            {userID == data.userID ? <input type="button" className='buttonDeletePost' value="Eliminar" id={data._id} onClick={sweetAlert} /> : <></>} {/* Ternario para que el dueño del post pueda eliminarlo, pero no visible para el resto de users */}
                        </div>
                    </div>
                )
                setData(allPostMap)
                setRecarga(false)
                setValorCompartido(false)
            }
        }
    }, [valorCompartido]);





    // Funcion intermedia para desplegar un aviso al usuario antes de hacer la eliminacion por si es un error o se arrepiente
    async function sweetAlert(e) {
        Swal.fire({
            title: 'Confirmar eliminacion de post',
            text: "Cuando se elimina un post tambien se eliminan todas las respuestas asociadas a dicho post. Esta operacion no se puede revertir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, elimina todo',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deletePost(e);
                Swal.fire(
                    '¡Hecho!',
                    'Tu acción ha sido completada.',
                    'success'
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelado',
                    'Tu acción ha sido cancelada :)',
                    'error'
                )
            }
        })
    }





    // Funcion para poder eliminar posts por usuario (Funcion externa)
    // Elimina tanto el post original como todas las respuestas asociadas a dicho post
    async function deletePost(e) {
        const postID = e.target.id
        const deletePostAPI = await postRemove(postID)

        setTimeout(() => {
            setRecarga(true)
            setValorCompartido(true)
        }, 1200);

    }

    


    // Funcion para responder a un post, a esta funcion se accede desde el modal
    async function responsePost(e) {
        let userName = await getUserByID(Cookies.get('id'))

        const postUser = userName.data.username
        const postOriginID = e.target.id
        const postDate = await dateFormat(Date.now())
        const postResponse = document.getElementById('modalResponse-textarea')
        let postIMG = e.target.offsetParent.childNodes[0].childNodes[1].childNodes[0].files[0]

        let routeFile = ''
        

        // Condicional para que no se pueda enviar una respuesta sin texto o sin imagen
        if (postIMG != undefined || postResponse.value.length > 0) {
                setAviso(null)

                // Condicional para diferenciar si se carga una imagen o no junto con la respuesta
                // Para evitar errores con MongoDB y la funcion ImageUpload que es externa
                if (postIMG === undefined) {
                    const arrayResponse = {'postID': postOriginID,
                                            'username': postUser,
                                            'dateString': postDate,
                                            'post': postResponse.value,
                                            'userID': userID}

                    const sendResponse = await responseCreate(arrayResponse, userName.data.img)
                    setResponse(null)
                    setRecarga(true)
                } else {

                    // Condicional para evitar que se carguen archivos que no sean de imagen
                    if (postIMG) {
                        if (validImageTypes(postIMG.type)) {
                            // Condicional para que cuando no haya cargada una imagen, no ejecute la funcion para evitar errores
                            if (postIMG != undefined && postIMG != null) {
                                postIMG = await uploadFile(postIMG);
                                routeFile = `${API_URL}${postIMG.filePath}`
                            }
                        } else {
                            setAviso('Solo son validos archivos de imagen')
                            return
                        }
                    }
                    

                    const arrayResponse = {'postID': postOriginID,
                        'username': postUser,
                        'dateString': postDate,
                        'post': postResponse.value,
                        'img': routeFile,
                        'userID': userID}

                    const sendResponse = await responseCreate(arrayResponse, userName.data.img)

                    setResponse(null)
                    setRecarga(true)
                    setValorCompartido(true)
                }

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Su respuesta ha sido enviada",
                    showConfirmButton: false,
                    timer: 2000
                })

        } else {
            setAviso('No se puede dejar la respuesta vacia')
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
                                    {aviso}
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

                <div id="listPost-button">
                    <input type="button" value="<- Mas antiguo" onClick={loadingPost} />
                    <input type="button" value="Mas actual ->" onClick={loadingPostMinus} />
                </div>
            </div>

        )
}




export {
    Post, 
}