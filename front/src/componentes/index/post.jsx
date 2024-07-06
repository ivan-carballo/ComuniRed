import '../../saas/index/post.scss'
import React from 'react';
import Cookies from 'js-cookie'
import { dateFormat, parseDate } from '../../funciones/fecha.js';
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

                    let userResponse = await getPostByProperty('postID', dataIMG._id)
                    dataIMG.responses = userResponse.data.length
                    datosIMG.push(dataIMG)

                  
                })

                
                setTimeout(() => {
                    mapPost()
                }, 1500);


                async function mapPost() {

                    //datosIMG.sort((a, b) => parseDate(b.date) - parseDate(a.date));

                    const allPostMap = await datosIMG.map((data) => 
                        <div id='post-div' key={data._id}>
                            <img src={data.userimg} />                        
                            <h3>{data.username}</h3>
                            <h4>{data.dateString}</h4>
                            <p>{data.post}</p>
                            <img src={data.img} />
                            <input type="button" value="Enviar respuesta" id={data._id} onClick={async ()=>{setResponse(data)}} />
                            <input type="button" value={`Ver respuestas (${data.responses})`} id={data._id} onClick={allResponse} />
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


    async function allResponse() {

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