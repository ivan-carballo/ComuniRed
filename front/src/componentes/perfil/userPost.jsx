import React, { useSyncExternalStore } from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { getPost, getPostByProperty, postDelete } from '../../api/postAPI.js'
import { getResponseByProperty, responseDelete } from "../../api/responseAPI.js"
import { getUserByID } from '../../api/userAPI.js'
import { postRemove } from "../../funciones/postDelete.js";

import '../../saas/perfil/userPost.scss'



function AllPostByUser () {
    const navigate = useNavigate()

    const [reboot, setReboot] = useState(true)
    const [show, setShow] = useState()




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
        const deletePostResponse = await postRemove(postID)
        setReboot(true)
    }





    async function postShow(e) {
        const postID = await e.target.id
        navigate(`/response/${postID}`)
    }






    return (
        <>
        
            <div id="postByUser-body">
                {show}
            </div>
        
        </>
    )
}



export {
    AllPostByUser
}