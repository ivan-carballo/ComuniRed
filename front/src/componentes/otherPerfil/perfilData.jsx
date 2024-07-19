// Componente para la cabecera de su perfil visto desde otro usuario
// Contiene los datos basicos del usuario


import React from "react";
import { useState, useEffect } from "react";
import { getUserByID } from "../../api/userAPI";
import { getPostByProperty } from "../../api/postAPI";
import { FaInbox } from 'react-icons/fa'


import '../../saas/otherPerfil/perfilData.scss'


function PerfilData({id}) {
    const [username, setUsername] = useState()
    const [perfilIMG, setPerfilIMG] = useState()
    const [date, setDate] = useState()
    const [post, setPost] = useState()


    // UseEffect para recopilar los datos del usuario con una llamada API
    useEffect(() => {
        showUser(id)
        async function showUser(id) {
            let getOtherUser = await getUserByID(id)
            getOtherUser = getOtherUser.data

            // Sacar solo el mes y año de la fecha de registro
            let date = getOtherUser.dateString
            date = date.split(",")[0].split(" de ")
            date = `${date[1]} ${date[2]}`
            date = date.charAt(0).toUpperCase() + date.slice(1).toLowerCase()

            // Buscar todos los posts del usuario para la estadistica
            const getPostByUser = await getPostByProperty('userID', id)

            setUsername(getOtherUser.username)
            setPerfilIMG(getOtherUser.img)
            setDate(date)
            setPost(getPostByUser.data.length)

        }
    })



    return (
        <div id="perfilData-body">
            <div id="perfilData-data">

                <img src={perfilIMG} />
                <div id="perfilData-p">
                    <div id="perfilData-header">
                        <p id='perfilData-user'>{username} </p>
                        <FaInbox id='perfilData-inbox' />
                    </div>
                    <p id='perfilData-date'>Registrado: {date}</p>
                    <p id='perfilData-post'>Nº post: {post}</p>
                </div>

            </div>
        </div>
    )
}


export {
    PerfilData
}