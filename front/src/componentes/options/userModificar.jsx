import '../../saas/options/userModificar.scss'

import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import sha256 from 'js-sha256'
import { userUpdate } from '../../api/userAPI.js'


function UserModificar() {
    const userCurrentID = Cookies.get('id')




    async function sendNewData(e) {
        const newUsername = e.target.parentElement.childNodes[0].value
        const newEmail = e.target.parentElement.childNodes[1].value
        const newPassword = e.target.parentElement.childNodes[2].value
        const newRepeatPassword = e.target.parentElement.childNodes[3].value
        const newIMG = e.target.parentElement.childNodes[4].value

        const newUserData = {'username': newUsername,
                            'email': newEmail,
                            'password': sha256(newPassword),
                            }
        
        if (newPassword === newRepeatPassword) {
            const userCurrentUpdate = await userUpdate(userCurrentID, newUserData)
        }
    }





    return (
        <div id="userModificar-body">
            <p id='userModificar-rotulo'>Modificar datos de usuario</p>

            <div id="userModificar-inputs">
                <input type="text" placeholder='Username' name="username" />
                <input type="email" placeholder='Email' name="email" />
                <input type="password" placeholder='Password' name="password" />
                <input type="password" placeholder='Repeat Password' name="repeatPassword" />
                <input type="file" name="file"/>
                <input type="button" id='userModificar-button' value="Modificar datos" onClick={sendNewData} />
            </div>

        </div>
    )
}



export {
    UserModificar
}