import React from "react";
import { useState, useEffect } from "react";



function LoginForm() {


    async function validar() {
        // Aqui para comprobar credenciales y loguearse
    }


    return (
        <>
            <div id='form-completo'>
                <form id='form'>
                    <input type="email" placeholder='Email' name="" id="" />
                    <input type="password" placeholder='Password' name="" id="" />
                    <input type="button" value="Login" onClick={validar} />
                </form>
            </div>
        </>
    )
}



export {
    LoginForm
}