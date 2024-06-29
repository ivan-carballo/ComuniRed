import React from "react";
import { sha256 } from 'js-sha256'
import { useState, useEffect } from "react";
import { getUser, login } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";




function LoginForm() {
    const navigate = useNavigate();
    const [aviso, setAviso] = useState('')


    async function validar(e) {
        const delete_formEmail = document.getElementById('login-email')
        const delete_formPassword = document.getElementById('login-password')

        const formRuta = e.target.form
        const formEmail = formRuta[0].value
        const formPassword = formRuta[1].value

        const userAll = await getUser()

        const userFilter = userAll.data.filter((data) => data.email === formEmail)

        if (formEmail.length < 1 || formPassword.length < 1) {
            setAviso('Debe rellenar todos los campos para poder iniciar sesion')
        } else if (userFilter.length == 1) {

            if (userFilter[0].password === sha256(formPassword)) {

                const userArrayLogin = {'email':formEmail}

                const data = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userArrayLogin),
                    };   
                    
                    const userLogin = await login(data) 
                    navigate('/comuniwall')

            } else {
                setAviso('Su email y/o contraseña no son correctas')
            }

        } else if (userFilter.length == 0) {
            setAviso('Su email y/o contraseña no son correctas')
            delete_formPassword.value = ''
        } else {
            setAviso('Ha ocurrido un error inesperado, recargue la pagina y vuelva a intentarlo')
            delete_formEmail.value = ''
            delete_formPassword.value = ''
        }
    }


    return (
        <>
            <div id='form-completo'>
                <h5>{aviso}</h5>
                <form id='form'>
                    <input type="email" placeholder='Email' id="login-email" />
                    <input type="password" placeholder='Password' id="login-password" />
                    <input type="button" value="Login" onClick={validar} />
                </form>
            </div>
        </>
    )
}



export {
    LoginForm
}