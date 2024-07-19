import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { getUserByID } from '../../api/userAPI'
import { getInboxByID } from '../../api/inboxAPI'

import '../../saas/inbox/header.scss'



function Header({id}) {
    const navigate = useNavigate()

    const userCurrentID = Cookies.get('id')

    const [data, setData] = useState('')


    let userID = ''


    
    useEffect(() => {

        getUser()       
        async function getUser() {

            const getInboxByUser = await getInboxByID(id)

            getInboxByUser.data.userID1 === userCurrentID ? userID = getInboxByUser.data.userID2 : userID = getInboxByUser.data.userID1

            const getUserData = await getUserByID(userID)

            setData(getUserData.data)
        }

    }, [])


    return (

        <div id="inboxChat-header">
            <img src={data.img}/>
            <p onClick={async () => {navigate(`/user/${data._id}`)}}>{data.username}</p>
        </div>

    )
}


export {
    Header
}