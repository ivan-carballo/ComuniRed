import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { getUserByID } from "../../api/userAPI.js";
import { getPostByProperty } from '../../api/postAPI.js'
import { getResponseByProperty } from '../../api/responseAPI.js'
import { getFollowByProperty } from '../../api/followAPI.js'
import { getFollowerByProperty } from '../../api/followerAPI.js'

import '../../saas/perfil/userStadistic.scss'



// Componente para poder ver las estadisticas de tu usuario
function UserStadistic() {
    const userCurrentID = Cookies.get('id')

    const [userPost, setUserPost] = useState()
    const [userResponse, setUserResponse] = useState()
    const [userFollow, setUserFollow] = useState()
    const [userFollower, setUserFollower] = useState()
    const [user, setUser] = useState()
    const [userIMG, setUserIMG] = useState()



    // useEffect para traer la informacion de tu usuario, post y respuestas
    // Solo interesa saber el numero de cada uno para sacar en la cabecera, junto con un saludo, foto de perfil y username
    // Tambien aparece el numero de follow y followers
    useEffect(() => {
        dataStadistic()
        async function dataStadistic() {

            // Obtener datos de los posts y respuestas
            const userUsername = await getUserByID(userCurrentID)
            const username = userUsername.data.username
            setUser(username)
            setUserIMG(userUsername.data.img)

            const userPost = await getPostByProperty('userID', userCurrentID)
            const userResponse = await getResponseByProperty('username', username)

            setUserPost(userPost.data.length)
            setUserResponse(userResponse.data.length)

            // Obtener datos de los follow y followers
            const getFollow = await getFollowByProperty('userID', userCurrentID)
            const getFollower = await getFollowerByProperty('userID', userCurrentID)

            getFollow.data.length > 0 ? setUserFollow(getFollow.data[0].follow.length) : setUserFollow(0)
            getFollower.data.length > 0 ? setUserFollower(getFollower.data[0].follower.length) : setUserFollower(0)
        }

    }, [])





    return (
        <div id="userStadistic-body">
            <div id="userStadistic-header">
                <p id='userStadistic-welcome'>Bienvenido {user}</p>
                <img id='userStadistic-img' src={userIMG} />
            </div>
            <div id="userStadistic-stadistic">
                <p>Posts: {userPost} - Respuestas: {userResponse}</p>
                <p>Siguiendo: {userFollow} - Seguidores: {userFollower}</p>
            </div>
        </div>
    )
}


export {
    UserStadistic
}