import '../../saas/options/userModificar.scss'

import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'


function UserModificar() {





    return (
        <div id="userModificar-body">
            <p id='userModificar-rotulo'>Modificar datos de usuario</p>

            <div id="userModificar-inputs">
                <input type="text" placeholder='Username' name="" id="" />
                <input type="email" placeholder='Email' name="" id="" />
                <input type="password" placeholder='Password' name="" id="" />
                <input type="password" placeholder='Repeat Password' name="" id="" />
                <input type="file" name="" id="" />
                <input type="button" id='userModificar-button' value="Modificar datos" />
            </div>

        </div>
    )
}



export {
    UserModificar
}