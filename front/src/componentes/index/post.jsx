import '../../saas/index/post.scss'
import { getUserByID } from '../../api/userAPI'
import { postCreate } from '../../api/postAPI';
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'


function NewPost() {
    const [usernamePost, setUsernamePost] = useState('')
    const [userIMG, setUserIMG] = useState('')

    const userID = Cookies.get('id')


    useEffect(() => {
        userFind()
        async function userFind() {
            const userByID = await getUserByID(userID)

            setUsernamePost(`Cuentanos tus divagaciones, ${userByID.data.username}`)
            setUserIMG(userByID.data.img)

            const img = document.getElementById('user-img')
            img.src = userByID.data.img
        }
    }) 


    async function enviarPost(e) {
        const postText = e.target.form[0].value
        const postIMG = e.target.form[1].files[0]

        const arrayNewPost = {'userID': userID,
                                'post': postText,
                                'img': postIMG}

        const dataNewPost = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify(arrayNewPost),
            };

            const sendNewPost = await postCreate(dataNewPost)

/*         new Compressor(file, {
            quality: 0,

            success(result) {
                const formData = new formData();

                formData.append('file', result, result.name)

                axios.post('/path/to/upload', formData).then(() => {
                    console.log('upload success')
                })
            },
            error(err) {
                console.log(err.message)
            },
        }) */

    }






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