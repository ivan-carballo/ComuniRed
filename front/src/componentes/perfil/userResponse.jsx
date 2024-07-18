import React, { useSyncExternalStore } from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { getResponseByProperty, responseDelete } from '../../api/responseAPI.js'
import { getUserByID } from '../../api/userAPI.js'
import { UserStadistic } from "./userStadistic.jsx";

import '../../saas/perfil/userPost.scss'



function AllResponseByUser () {
    const [reboot, setReboot] = useState(true)
    const [show, setShow] = useState()



    useEffect(() => {
        if (reboot) {
            getAllPost()
            async function getAllPost() {
                const userID = Cookies.get('id')

                let getUser = await getUserByID(userID)
                getUser = getUser.data.username 

                let getResponse = await getResponseByProperty('username', getUser)
                getResponse = getResponse.data.reverse()

                const responseMap = getResponse.map((data) => 
                    <div id="responseMap-div" key={data._id}>
                        <p id='responseMap-date'>{data.dateString}</p>
                        <p id='responseMap-response'>{data.post}</p>
                        <img id='responseMap-img' src={data.img} />
                        <input type="button" value="Eliminar respuesta" id={data._id} onClick={responseDel} />
                    </div>
                )
                setShow(responseMap)
            }
        }
        setReboot(false)
    }, [reboot])


    async function responseDel(e) {
        const responseID = await e.target.id
        const responseRemove = await responseDelete(responseID)
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
    AllResponseByUser
}