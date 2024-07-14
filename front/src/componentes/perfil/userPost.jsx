import React, { useSyncExternalStore } from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { Modal } from '../modal.jsx'
import { getPost, getPostByProperty, postDelete } from '../../api/postAPI.js'
import { getResponseByProperty, responseDelete } from "../../api/responseAPI.js";
import { getUserByID } from '../../api/userAPI.js'

import '../../saas/perfil/userPost.scss'



function AllPostByUser () {
    const [reboot, setReboot] = useState(true)
    const [show, setShow] = useState()
    const [modalResponse, setModalResponse] = useState('')




    useEffect(() => {
        if (reboot) {
            getAllPost()
            async function getAllPost() {
                const userID = Cookies.get('id')

                let getPost = await getPostByProperty('userID', userID)
                getPost = getPost.data.reverse()

                let getPostArray = []

                for (let i = 0; getPost.length > i; i++) {
                    let numberResponses = await getResponseByProperty('postID', getPost[i]._id)
                    numberResponses = numberResponses.data.length
                    getPost[i].responses = numberResponses
                    getPostArray.push(getPost[i])
                }


                const postMap = getPostArray.map((data) => 
                    <div id='postMap-div' key={data._id}>
                        <p id='postMap-date'>{data.dateString}</p>
                        <p id='postMap-post'>{data.post}</p>
                        <div id="postMap-buttons">
                            <input type="button" value={`Ver respuestas (${data.responses})`} id={data._id} onClick={postShow} />
                            <input type="button" value="Eliminar" id={data._id} onClick={postDel} />
                        </div>
                    </div>
                )
                setShow(postMap)
            }
        }
        setReboot(false)
    }, [reboot])





    async function postDel(e) {
        const postID = await e.target.id

        let getResponseByPost = await getResponseByProperty('postID', postID)
        getResponseByPost = await getResponseByPost.data

        for (let i = 0; getResponseByPost.length > i; i++) {
            const responseID = await getResponseByPost[i]._id
            const responseRemove = await responseDelete(responseID)
        }

        const postRemove = await postDelete(postID)
        setReboot(true)
    }





    async function postShow(e) {
        const postID = await e.target.id

        let getResponseByPost = await getResponseByProperty('postID', postID)
        getResponseByPost = await getResponseByPost.data
        
        const responseMap = getResponseByPost.map((data) => 
            <div id="responseMap-div" key={data._id}>
                <h2>{data.username}</h2>
                <p>{data.dateString}</p>
                <p id='reponseMap-post'>{data.post}</p>
            </div>
        )

        responseMap.length > 0 ? setModalResponse(responseMap) : setModalResponse(null)
    }



    async function close() {
        setModalResponse(null)
    }


 





    return (
        <>
        
            <div id="postByUser-body">
                

                {modalResponse &&
                    <Modal isOpen={true}>
                        
                    <div id="allResponse-completo">
                        {modalResponse}
                    </div>
                    <div id="allResponse-buttons">
                        <button className='allResponse-button' onClick={close}>Cerrar</button>
                    </div>

                    </Modal>
                }


                {show}
            </div>
        
        </>
    )
}



export {
    AllPostByUser
}