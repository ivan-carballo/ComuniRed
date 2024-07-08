//import '../../saas/options/userData.scss'

import React from "react";
import Cookies from 'js-cookie'
import { useState, useEffect } from "react";
import { getUserByID } from '../../api/userAPI.js'


function UserData() {
    const [data, setData] = useState([])

    const userID = Cookies.get('id')

    useEffect(() => {
        getUser()
        async function getUser() {
            let getUserData = await getUserByID(userID)
            setData(getUserData.data)
        }
    })


    return (
        <div id="userData-body">
            <p>{data.username}</p>
        </div>
    )
}


export {
    UserData
}