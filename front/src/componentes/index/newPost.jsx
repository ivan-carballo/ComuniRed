import '../../saas/index/newPost.scss'
import { getUserByID } from '../../api/userAPI'
import { postCreate } from '../../api/postAPI';
import React from 'react';
import { useState, useEffect, useContext } from "react";
import { dateFormat } from '../../funciones/fecha.js';
import Cookies from 'js-cookie'


function NewPost() {
    const [usernamePost, setUsernamePost] = useState('')
    const [userIMG, setUserIMG] = useState('')

    const userID = Cookies.get('id')
    let username_data = ''


    useEffect(() => {
        userFind()
        async function userFind() {
            const userByID = await getUserByID(userID)

            setUsernamePost(`Cuentanos tus divagaciones, ${userByID.data.username}`)
            setUserIMG(userByID.data.img)
            username_data = userByID.data.username
        }
    }) 


    async function enviarPost(e) {
        const postText = e.target.form[0].value
        const postIMG = e.target.form[1].files[0]
        const postDate = await dateFormat(Date.now())

        const arrayNewPost = await {'userID': userID,
                                'post': postText,
                                'img': postIMG,
                                'username': username_data,
                                'dateString': postDate}

        const sendNewPost = await postCreate(arrayNewPost)

        const textareaDel = document.getElementById('newPost-input')
        textareaDel.value = ''

    }






    return (
        <div id='newPost-body'>
            <div id="newPost-div-form">
                    <form>
                        <div id="newPost-row-1">
                            <img src={userIMG} alt="user-img" id='user-img' />
                            <textarea id="newPost-input" rows='4' cols='50' placeholder={usernamePost} />
                        </div>
                        <div id="newPost-row-2">
                            <input type="file" name="" id="" />
                            <input type="button" id='newPost-button' value="Enviar" onClick={enviarPost} />
                        </div>
                    </form>
                </div>
        </div>
    )
}


export {
    NewPost
}