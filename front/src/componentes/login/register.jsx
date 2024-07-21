import React from "react";
import sha256 from 'js-sha256'
import { useState, useEffect, useContext } from "react";
import { getUser, userCreate } from "../../api/userAPI";
import { dateFormat } from "../../funciones/fecha.js";
import { useNavigate } from 'react-router-dom'



// Componente para registrarse como nuevo usuario
function RegisterForm() {
    const navigate = useNavigate()
    const [aviso, setAviso] = useState('')


    // Expresiones regulares para controlar la validez de lo que se escribe en el formulario
    const regexUsername = /^[A-Za-z0-9]+$/
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#%&_])[a-zA-Z0-9@#%&_]+$/


    async function registrar(e) {
        // Se mete en variables los datos de los inputs
        const formRuta = e.target.form
        const formUsername = formRuta[0].value
        const formEmail = formRuta[1].value
        const formPassword = formRuta[2].value
        const formRepeatPassword = formRuta[3].value
        const formDate = await dateFormat(Date.now())

        // Se hace un filtrado de los datos en MongoDB con lo escrito en el formulario para comprobar que el username y el email no estan ya en uso
        const usersAll = await getUser()
        const emailFiltrar = usersAll.data.filter((data) => data.email === formEmail)
        const userFiltrar = usersAll.data.filter((data) => data.username === formUsername)

        // Condicional para poder validar correctamente los datos, usando las expresiones regulares anteriores
        if (formUsername.length < 1 || formEmail.length < 1 || formPassword.length < 1 || formRepeatPassword.length < 1) {
            setAviso('Debes rellenar todos los campos')
        } else if (formUsername.length < 4) {
            setAviso('Su username debe tener al menos cuatro caracteres')
        } else if (!regexUsername.test(formUsername)) {
            setAviso('Su username solo debe tener letras minusculas, mayusculas y numeros')    
        } else if (!regexEmail.test(formEmail)) {
            setAviso('La direccion de email no es correcta')
        } else if (formPassword !== formRepeatPassword) {
            setAviso('Las contraseñas no coinciden')
        } else if (formPassword.length < 8) {
            setAviso('Su contraseña debe tener al menos 8 caracteres')
        } else if (!regexPassword.test(formPassword)) {
            setAviso('Su contraseña debe tener al menos una mayuscula, una minuscula, un numero y un caracter especial (_ @ # % &)')
        } else if (userFiltrar.length > 0) {
            setAviso('El username ya esta en uso')
        } else if (emailFiltrar.length > 0) {
            setAviso('El email ya esta en uso')
        } else {
            setAviso('Su usuario ha sido creado correctamente')
            
            const userArrayNew = {'username':formUsername, 
                                'email':formEmail, 
                                'password':sha256(formPassword), 
                                'role':'user',
                                'dateString': formDate}

            const userCrear = await userCreate(userArrayNew)

            // Vaciar todos los inputs una vez creado el usuario
            const delete_formUsername = document.getElementById('register-username')
            const delete_formEmail = document.getElementById('register-email')
            const delete_formPassword = document.getElementById('register-password')
            const delete_formRepeatPassword = document.getElementById('register-repeatPassword')
            delete_formUsername.value = ''
            delete_formEmail.value = ''
            delete_formPassword.value = ''
            delete_formRepeatPassword.value = ''
        }

    }




    return (
        <>
            <div id='registerForm-body'>
                <h5>{aviso}</h5>
                <form id='form'>
                    <input type="text" placeholder='Username' id='register-username' />
                    <input type="email" placeholder='Email' id='register-email' />
                    <input type="password" placeholder='Password' id='register-password' />
                    <input type="password" placeholder='Repeat Password' id='register-repeatPassword' />
                    <input type="button" value="Register" onClick={registrar} />
                </form>
            </div>
        </>
    )
}



export {
    RegisterForm
}