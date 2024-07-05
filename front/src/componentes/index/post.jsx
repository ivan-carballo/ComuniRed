import '../../saas/index/post.scss'
import React from 'react';
import Cookies from 'js-cookie'
import { dateFormat } from '../../funciones/fecha.js';
import { Modal } from '../modal.jsx'
import { useState, useEffect, useContext } from "react";
import { getPost, postDelete } from "../../api/postAPI.js"
import { getUserByID } from '../../api/userAPI.js';
import { responseCreate } from '../../api/responseAPI.js';




function Post() {
    const userID = Cookies.get('id')

    const [recarga, setRecarga] = useState(true)
    const [data, setData] = useState('')
    const [response, setResponse] = useState('')




    
   

    useEffect(() => {
        if(recarga) {

            allPost()
            async function allPost() {
                let AllPostData = await getPost()
                AllPostData = AllPostData.data
                AllPostData.reverse()

                let getUserIMG = []

                for (let i = 0; AllPostData.length > i; i++) {
                    let getUserIDIMG = await getUserByID(AllPostData[i].userID)
                    getUserIMG.push(getUserIDIMG.data.img)
                }

                let count = 0

                const allPostMap = await AllPostData.map((data) => 
                    <div id='post-div' key={data._id}>
                        <img src={getUserIMG[count]} />                        
                        <h3>{data.username}</h3>
                        <h4>{data.dateString}</h4>
                        <p>{data.post}</p>
                        <img src={data.img} />
                        <input type="button" value="Responder" id={data._id} onClick={async ()=>{setResponse(data)}} />
                        {userID == data.userID ? <input type="button" value="Eliminar Post" id={data._id} onClick={deletePost} /> : <></>}
                        {count++}
                    </div>
                )
                setData(allPostMap)
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
        console.log(sendResponse)
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