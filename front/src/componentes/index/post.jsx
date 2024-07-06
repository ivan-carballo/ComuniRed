import '../../saas/index/post.scss'
import React from 'react';
import Cookies from 'js-cookie'
import { dateFormat } from '../../funciones/fecha.js';
import { Modal } from '../modal.jsx'
import { useState, useEffect, useContext } from "react";
import { getPost, postDelete } from "../../api/postAPI.js"
import { getUserByID } from '../../api/userAPI.js';
import { responseCreate, getPostByProperty } from '../../api/responseAPI.js';




function Post() {
    const userID = Cookies.get('id')

    const [recarga, setRecarga] = useState(true)
    const [data, setData] = useState('')
    const [response, setResponse] = useState('')


    let sacarResponses = []


/*     useEffect(() => {
        prueba()
        async function prueba() {
            sacarResponses = await getPostByProperty('postID', '6687260a23c37e089fc62831')
            console.log('klhjaskdjklajdlkjakldjssa   ' + sacarResponses.data[0].username)
        }
    }) */


   

    useEffect(() => {
        if(recarga) {

            allPost()
            async function allPost() {
                let AllPostData = await getPost()
                AllPostData = AllPostData.data
                AllPostData.reverse()

                let datosIMG = []

                const allPostIMG = await AllPostData.map( async (dataIMG) => {
                    let userIMG = await getUserByID(dataIMG.userID)
                    userIMG = userIMG.data.img
                    dataIMG.userimg = userIMG
                    datosIMG.push(dataIMG)
                })


                const allPostResponse = await allPostIMG.map( async (dataResponse) => {
                    let userResponse = await getPostByProperty('postID', dataResponse._id)
                    userResponse = userResponse.data
                    dataResponse.response = userResponse
                    datosIMG.push(dataResponse)
                })


                
                setTimeout(() => {
                    mapPost()
                    console.log(datosIMG)
                }, 1500);

                async function mapPost() {
                    const allPostMap = await datosIMG.map((data) => 
                        <div id='post-div' key={data._id}>
                            <img src={data.userimg} />                        
                            <h3>{data.username}</h3>
                            <h4>{data.dateString}</h4>
                            <p>{data.post}</p>
                            <img src={data.img} />
                            <input type="button" value="Responder" id={data._id} onClick={async ()=>{setResponse(data)}} />
                            {userID == data.userID ? <input type="button" value="Eliminar Post" id={data._id} onClick={deletePost} /> : <></>}
                        </div>
                    )
                    setData(allPostMap)
                }
                setRecarga(false)
            }
        }
    }, [recarga]);




    async function deletePost(e) {
        const deletePostAPI = await postDelete(e.target.id)
        setRecarga(true)
    }



    async function responsePost(e) {
        let userName = await getUserByID(Cookies.get('id'))

        const postUser = userName.data.username
        const postOriginID = e.target.id
        const postDate = await dateFormat(Date.now())
        const postResponse = e.target.offsetParent.children[0].lastChild.value

        const arrayResponse = {'postID': postOriginID,
                                'username': postUser,
                                'dateString': postDate,
                                'post': postResponse}

        const sendResponse = await responseCreate(arrayResponse)
        setResponse(null)
    }


    async function close() {
        setResponse(null)
    }




    return (
        <div id="post-body">

            {response && 
                <Modal isOpen={true}>

                    <div id="completo">
                        <img src="" />
                        <p>Responder a {response.username}</p>
                        <p>{response.post}</p>

                        <img src="" />
                        <textarea cols="25" rows="8" placeholder={`Escriba su respuesta`} />
                    </div>
                    <div id="buttons">
                        <button onClick={close}>Cerrar</button>
                        <button id={response._id} onClick={responsePost}>Responder</button>
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