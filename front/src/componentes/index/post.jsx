import '../../saas/index/post.scss'
import { useState, useEffect } from "react";
import { obtenerToken } from '../../funciones/token';
import { API_URL } from '../../api/API';


function NewPost() {



    async function getUserByToken(token) {
        fetch(`${API_URL}/user/tk`, token)
        .then(data => {
            if (!data.ok) {
            throw Error(data.status);
            }
            return data.json();
            }).then(update => {
            console.log(update);
            }).catch(e => {
            console.log(e);
            });
    }




    useEffect(() => {
        userFind()
        async function  userFind() {
            const token = obtenerToken()

            const userArrayToken = {'token':token}

            const data = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(userArrayToken),
                };   

            const userToken = await getUserByToken(data)

            
        }
    })





    return (
        <div id='newPost-body'>
            <div id="newPost-div-form">
                    <form>
                        <div id="newPost-row-1">
                            <img src="" alt="user-img" />
                            <input type="text" id="newPost-input" placeholder="Comparte tus pensamientos" />
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