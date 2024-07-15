import React from "react";
import { useState, useEffect } from "react";
import { getUserByID } from "../../api/userAPI";

import '../../saas/otherPerfil/perfilData.scss'


function PerfilData({id}) {
    const [username, setUsername] = useState()
    const [perfilIMG, setPerfilIMG] = useState()
    const [date, setDate] = useState()


    useEffect(() => {
        showUser(id)
        async function showUser(id) {
            let getOtherUser = await getUserByID(id)
            getOtherUser = getOtherUser.data

            let date = getOtherUser.dateString
            date = date.split(",")[0].split(" de ")
            date = `${date[1]} ${date[2]}`
            date = date.charAt(0).toUpperCase() + date.slice(1).toLowerCase()

            setUsername(getOtherUser.username)
            setPerfilIMG(getOtherUser.img)
            setDate(date)

        }
    })



    return (
        <div id="perfilData-body">
            <div id="perfilData-data">

                <img src={perfilIMG} />
                <div id="perfilData-p">
                    <p id='perfilData-user'>{username}</p>
                    <p id='perfilData-date'>Usuario desde: {date}</p>
                </div>

            </div>
        </div>
    )
}


export {
    PerfilData
}