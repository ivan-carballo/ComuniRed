import '../../saas/options/userData.scss'

import React from "react";
import Cookies from 'js-cookie'
import { useState, useEffect } from "react";
import { getUserByID } from '../../api/userAPI.js'


// Componente para usar en la pagina de opciones, se muestran los datos del usuario logueado
function UserData() {
    const [data, setData] = useState([])

    const userID = Cookies.get('id')

    
    // useEffect para traer los datos de MongoDB
    useEffect(() => {
        getUser()
        async function getUser() {
            let getUserData = await getUserByID(userID)
            setData(getUserData.data)
        }
    })



 

    return (

        <div id="userData-body">

            <div id="userData-responsive">

                <div id="userData-img">
                    <img src={data.img} />
                </div>
                
                <div id="userData-data">
                    <p>Nombre de usuario: {data.username}</p>
                    <p>Email: {data.email}</p>
                </div>

            </div>

        </div>

    )
}


export {
    UserData
}