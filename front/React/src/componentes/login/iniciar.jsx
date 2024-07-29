import React from "react";
import { sha256 } from 'js-sha256'
import Cookies from 'js-cookie'
import { useState } from "react";
import { getUser, login } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";

import '../../saas/login.scss'


// Componente con el formulario para iniciar sesion
function LoginForm() {
    const navigate = useNavigate();
    const [aviso, setAviso] = useState('')


    async function validar(e) {
        // Se mete en variables la informacion de los inputs
        const delete_formEmail = document.getElementById('login-email')
        const delete_formPassword = document.getElementById('login-password')

        const formRuta = e.target.form
        const formEmail = formRuta[0].value
        const formPassword = formRuta[1].value

        const userAll = await getUser()
        const userFilter = userAll.data.filter((data) => data.email === formEmail)

        // Condicional para controlar que se rellenan todos los campos y que las credenciales son validas con lo que hay en MongoDB
        if (formEmail.length < 1 || formPassword.length < 1) {
            setAviso('Debe rellenar todos los campos para poder iniciar sesion')
        } else if (userFilter.length == 1) {

            if (userFilter[0].password === sha256(formPassword)) {

                
                if (userFilter[0].validateEmail) {


                    if(userFilter[0].del === false) {
                        Cookies.set('id', userFilter[0]._id, { sameSite: 'Lax', secure: true })

                        const userArrayLogin = {'email':formEmail}

                        const data = {
                            method: 'POST',
                            headers: {
                            'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(userArrayLogin),
                            };   
                            
                            const userLogin = await login(data) 

                            setTimeout(() => {
                                navigate('/comuniwall')
                            }, 300);
                    } else {
                        setAviso('El usuario al que hace referencia ha sido eliminado y no hay posibilidad de volver a usarlo. Debe crear un usuario nuevo con un username y email distintos.')
                    }
                    

                } else {
                    setAviso('Su usuario y/o email aun no ha sido validados')
                }


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
            <div id='loginForm-body'>
                <h4>{aviso}</h4>
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