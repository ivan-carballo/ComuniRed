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

                const postMap = getPost.map((data) => 
                    <div id='postMap-div' key={data._id}>
                        <p id='postMap-date'>{data.dateString}</p>
                        <p id='postMap-post'>{data.post}</p>
                        <div id="postMap-buttons">
                            <input type="button" value="Ver respuestas" id={data._id} onClick={postShow} />
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
                <p>{data.dateString}</p>
                <p>{data.username}</p>
                <p>{data.post}</p>
            </div>
        )

        setModalResponse(responseMap)
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
                        {/* <button className='allResponse-button' id={allResponseID} onClick={responsePost}>Responder</button> */}
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