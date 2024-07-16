import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { getUserByID } from "../../api/userAPI.js";
import { getPostByProperty } from '../../api/postAPI.js'
import { getResponseByProperty } from '../../api/responseAPI.js'

import '../../saas/perfil/userStadistic.scss'




function UserStadistic() {
    const [userPost, setUserPost] = useState()
    const [userResponse, setUserResponse] = useState()
    const [user, setUser] = useState()


    
    useEffect(() => {
        dataStadistic()
        async function dataStadistic() {
            const userID = Cookies.get('id')

            const userUsername = await getUserByID(userID)
            const username = userUsername.data.username
            setUser(username)

            const userPost = await getPostByProperty('userID', userID)
            const userResponse = await getResponseByProperty('username', username)

            setUserPost(userPost.data.length)
            setUserResponse(userResponse.data.length)
        }

    }, [])



    return (
        <div id="userStadistic-body">
            <p id='userStadistic-welcome'>Bienvenido {user}</p>
            <p>Nº posts: {userPost} - Nº respuestas: {userResponse}</p>
        </div>
    )
}


export {
    UserStadistic
}