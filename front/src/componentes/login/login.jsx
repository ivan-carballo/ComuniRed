import React from "react";
import { useState, useEffect } from "react";
import { getUser } from "../../api/userAPI";



function LoginForm() {
    const [aviso, setAviso] = useState('')


    async function validar(e) {
        const formRuta = e.target.form
        const formEmail = formRuta[0].value
        const formPassword = formRuta[1].value
    }


    return (
        <>
            <div id='form-completo'>
                <h5>{aviso}</h5>
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