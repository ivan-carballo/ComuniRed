import '../../saas/index/post.scss'
import { getUserByID } from '../../api/userAPI'
import { useState, useEffect } from "react";
import { obtenerToken } from '../../funciones/token';
import Cookies from 'js-cookie'


function NewPost() {
    const [usernamePost, setUsernamePost] = useState('')
    const [userIMG, setUserIMG] = useState('')


    useEffect(() => {
        userFind()
        async function userFind() {
            const userID = Cookies.get('id')

            const userByID = await getUserByID(userID)

            setUsernamePost(`Cuentanos tus divagaciones, ${userByID.data.username}`)
            setUserIMG(userByID.data.img)

            const img = document.getElementById('user-img')
            img.src = userByID.data.img

        }
    }) 





    return (
        <div id='newPost-body'>
            <div id="newPost-div-form">
                    <form>
                        <div id="newPost-row-1">
                            <img alt="user-img" id='user-img' />
                            <input type="text" id="newPost-input" placeholder={usernamePost} />
                        </div>
                        <div id="newPost-row-2">
                            <input type="file" name="" id="" />
                            <input type="button" id='newPost-button' value="Enviar" />
                        </div>
                    </form>
                </div>
        </div>
    )
}


export {
    NewPost
}