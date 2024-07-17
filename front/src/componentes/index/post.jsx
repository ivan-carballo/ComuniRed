import '../../saas/index/post.scss'

import React from 'react';
import Cookies from 'js-cookie'
import { dateFormat } from '../../funciones/fecha.js';
import { Modal } from '../modal.jsx'
import { useState, useEffect, useContext } from "react";
import { getPost, postDelete } from "../../api/postAPI.js"
import { getUserByID } from '../../api/userAPI.js';
import { responseCreate, getResponseByProperty, responseDelete } from '../../api/responseAPI.js';
import { notificationDelete, getNotificationByProperty } from '../../api/notificationAPI.js';
import { Response } from '../../pages/response.jsx';
import { postRemove } from '../../funciones/postDelete.js';




function Post() {
    const userID = Cookies.get('id')

    const [recarga, setRecarga] = useState(true)
    const [data, setData] = useState('')
    const [response, setResponse] = useState('')


    let sacarResponses = []


   

    useEffect(() => {
        if(recarga) {

            allPost()
            async function allPost() {
                let AllPostData = await getPost()
                AllPostData = AllPostData.data.reverse()

                let datosIMG = []

                const allPostIMG = await AllPostData.map( async (dataIMG) => {
                    let userIMG = await getUserByID(dataIMG.userID)
                    userIMG = userIMG.data.img
                    dataIMG.userimg = userIMG

                    let userResponse = await getResponseByProperty('postID', dataIMG._id)
                    dataIMG.responses = userResponse.data.length
                    datosIMG.push(dataIMG)
                })

                
                setTimeout(async () => {
                    await mapPost()
                }, 1000);


                async function mapPost() {
                    const allPostMap = await datosIMG.map((data) => 
                        <div id='post-div' key={data._id}>
                            <div id="post-header">
                                <img src={data.userimg} />
                                <div id="post-header-data">
                                    <a href={`/user/${data.userID}`}> <h2>{data.username}</h2> </a>
                                    <h4 id='post-date'>{data.dateString}</h4>
                                </div>
                            </div>
                            <p id='post-post'>{data.post}</p>
                            <img src={data.img} />
                            <div id="buttons-post">
                                <input type="button" value="Responder" id={data._id} onClick={async ()=>{setResponse(data)}} />
                                
                                <a href={`/response/${data._id}`}>
                                    <input type="button" value='Ver detalle' id={data._id} />
                                </a>

                                {userID == data.userID ? <input type="button" value="Eliminar" id={data._id} onClick={deletePost} /> : <></>}
                            </div>
                        </div>
                    )
                    setData(allPostMap)
                }
                setRecarga(false)
            }
        }
    }, [recarga]);




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



    async function responsePost(e) {
        let userName = await getUserByID(Cookies.get('id'))

        const postUser = userName.data.username
        const postOriginID = e.target.id
        const postDate = await dateFormat(Date.now())
        const postResponse = document.getElementById('modalResponse-textarea')

        const arrayResponse = {'postID': postOriginID,
                                'username': postUser,
                                'dateString': postDate,
                                'post': postResponse.value}

        const sendResponse = await responseCreate(arrayResponse)
        setResponse(null)
        setRecarga(true)
    }




    async function close() {
        setResponse(null)
    }




    return (
        <div id="post-body">

            {response && 
                <Modal isOpen={true}>

                    <div id="modalResponse-body">

                        <div id="modalResponse-form">

                            <div id="modalResponse-form-header">
                                <img src="" />
                                <p>Responder a {response.username}</p>
                                <p>{response.post}</p>
                            </div>

                            <div id="modalResponse-form-response">
                                <img src="" />
                                <textarea id='modalResponse-textarea' cols="32" rows="10" placeholder='Escriba su respuesta' />
                            </div>

                        </div>

                        <div id="modalResponse-buttons">
                            <button onClick={close}>Cerrar</button>
                            <button id={response._id} onClick={responsePost}>Enviar respuesta</button>
                        </div>

                    </div>

                </Modal>
            }


            <div id="listPost">
                {data}
            </div>
        </div>
    )
}




export {
    Post
}