import React from "react";
import { useState, useEffect } from "react";
import { getUser } from "../../api/userAPI";



function LoginForm() {


    async function validar(e) {
        const formRuta = e.target.form
        const formEmail = formRuta[0].value
        const formPassword = formRuta[1].value
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