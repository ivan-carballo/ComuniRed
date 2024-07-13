import React, { useSyncExternalStore } from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { getPost, getPostByProperty } from '../../api/postAPI.js'
import { getResponseByProperty } from '../../api/responseAPI.js'
import { getUserByID } from '../../api/userAPI.js'

import '../../saas/perfil/userPost.scss'



function AllPostByUser () {
    const [post, setPost] = useState()
    const [response, setResponse] = useState()
    const [show, setShow] = useState()
    const [buttonResponse, setButtonResponse] = useState()
    const [buttonPost, setButtonPost] = useState('active')



    useEffect(() => {
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
                        <input type="button" value="Eliminar" />
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
                    <input type="button" value="Eliminar respuesta" />
                </div>
            )
            setResponse(responseMap)
        }

    }, [])


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