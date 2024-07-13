import React, { useSyncExternalStore } from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { getPost, getPostByProperty, postDelete } from '../../api/postAPI.js'
import { getUserByID } from '../../api/userAPI.js'

import '../../saas/perfil/userPost.scss'



function AllPostByUser () {
    const [reboot, setReboot] = useState(true)
    const [post, setPost] = useState()
    const [show, setShow] = useState()




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
                            <input type="button" value="Ver respuestas" />
                            <input type="button" value="Eliminar" id={data._id} onClick={postDelete} />
                        </div>
                    </div>
                )
                setPost(postMap)
                setShow(postMap)

            }
        }
        setReboot(false)
    }, [reboot])



    async function postDelete(e) {
        const postID = await e.target.id
        const postRemove = await postDelete(postID)
        setReboot(true)
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