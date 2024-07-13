import React, { useSyncExternalStore } from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { getPost, getPostByProperty, postDelete } from '../../api/postAPI.js'
import { getResponseByProperty, responseDelete } from '../../api/responseAPI.js'
import { getUserByID } from '../../api/userAPI.js'

import '../../saas/perfil/userPost.scss'



function AllPostByUser () {
    const [reboot, setReboot] = useState(true)
    const [post, setPost] = useState()
    const [response, setResponse] = useState()
    const [show, setShow] = useState()
    const [buttonResponse, setButtonResponse] = useState()
    const [buttonPost, setButtonPost] = useState('active')



    useEffect(() => {
        if (reboot) {
            getAllPost()
            async function getAllPost() {
                setButtonPost('active')
                setButtonResponse('')
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

                let getUser = await getUserByID(userID)
                getUser = getUser.data.username 

                let getResponse = await getResponseByProperty('username', getUser)
                getResponse = getResponse.data.reverse()

                const responseMap = getResponse.map((data) => 
                    <div id="responseMap-div" key={data._id}>
                        <p id='responseMap-date'>{data.dateString}</p>
                        <p id='responseMap-response'>{data.post}</p>
                        <input type="button" value="Eliminar respuesta" id={data._id} onClick={responseDelete} />
                    </div>
                )
                setResponse(responseMap)
            }
        }
        setReboot(false)
    }, [reboot])



    async function postDelete(e) {
        const postID = await e.target.id
        const postRemove = await postDelete(postID)
        setReboot(true)
    }



    async function responseDelete(e) {
        const responseID = await e.target.id
        const responseRemove = await responseDelete(responseID)
        setReboot(true)
    }


    
    async function buttonShow(e) {
        const buttonValue = e.target.value

        if (buttonValue === 'Posts') {
            setShow(post)
            setButtonPost('active')
            setButtonResponse('')
        } else {
            setShow(response)
            setButtonPost('')
            setButtonResponse('active')
        }
    }




    return (
        <>

            <div id="postByUser-buttons">
                <input type="button" value="Posts" id={buttonPost} onClick={buttonShow} />
                <input type="button" value="Respuestas" id={buttonResponse} onClick={buttonShow} />
            </div>
        
            <div id="postByUser-body">
                {show}
            </div>
        
        </>
    )
}



export {
    AllPostByUser
}