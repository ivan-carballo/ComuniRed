import React from "react";
import { useState, useEffect } from "react";
import { getUser, userCreate } from "../../api/userAPI";



function RegisterForm() {
    const [aviso, setAviso] = useState('')


    async function registrar(e) {
        const formRuta = e.target.form
        const formUsername = formRuta[0].value
        const formEmail = formRuta[1].value
        const formPassword = formRuta[2].value
        const formRepeatPassword = formRuta[3].value

        //const usersAll = await getUser()
        //const userFiltrar = usersAll.data.filter((data) => data.email === formEmail)
        const userFiltrar = ''
        
        if (userFiltrar.length > 0) {
            setAviso('Ya existe un usuario asociado a ese email')
        } else {
            setAviso('')
            if (formPassword === formRepeatPassword) {
                const comprobarDificultad = /[a-zA-Z0-9][-_@#$%&+]/.test(formPassword)
                if (comprobarDificultad) {
                    if (formPassword.length > 7) {
                        // Aqui va la creacion del user con la API


                        setAviso('')
                    } else {
                        setAviso('Su contraseña debe tener al menos 8 caracteres')
                    }
                } else {
                    setAviso('Su contraseña debe tener al menos una mayuscula, una minuscula, un numero y un caracter especial (- _ @ # $ % & +)')
                }
            } else {
                setAviso('Las contraseñas no coinciden')
            }
        }
    }


    return (
        <>
            <div id='form-completo'>
                <h5>{aviso}</h5>
                <form id='form'>
                    <input type="text" placeholder='Username'/>
                    <input type="email" placeholder='Email'/>
                    <input type="password" placeholder='Password'/>
                    <input type="password" placeholder='Repeat Password'/>
                    <input type="button" value="Register" onClick={registrar} />
                </form>
            </div>
        </>
    )
}



export {
    RegisterForm
}