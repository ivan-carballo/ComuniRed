import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { getUserByID } from "../../api/userAPI.js";
import { getPostByProperty } from '../../api/postAPI.js'
import { getResponseByProperty } from '../../api/responseAPI.js'

import '../../saas/perfil/userStadistic.scss'



// Componente para poder ver las estadisticas de tu usuario
function UserStadistic() {
    const [userPost, setUserPost] = useState()
    const [userResponse, setUserResponse] = useState()
    const [user, setUser] = useState()
    const [userIMG, setUserIMG] = useState()


    // useEffect para traer la informacion de tu usuario, post y respuestas
    // Solo interesa saber el numero de cada uno para sacar en la cabecera, junto con un saludo, foto de perfil y username
    useEffect(() => {
        dataStadistic()
        async function dataStadistic() {
            const userID = Cookies.get('id')

            const userUsername = await getUserByID(userID)
            const username = userUsername.data.username
            setUser(username)
            setUserIMG(userUsername.data.img)

            const userPost = await getPostByProperty('userID', userID)
            const userResponse = await getResponseByProperty('username', username)

            setUserPost(userPost.data.length)
            setUserResponse(userResponse.data.length)
        }

    }, [])



    return (
        <div id="userStadistic-body">
            <div id="userStadistic-header">
                <p id='userStadistic-welcome'>Bienvenido {user}</p>
                <img id='userStadistic-img' src={userIMG} />
            </div>
            <p>Posts: {userPost} - Respuestas: {userResponse}</p>
        </div>
    )
}


export {
    UserStadistic
}