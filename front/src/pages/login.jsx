import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import '../saas/login.scss'

import { LoginForm } from "../componentes/login/iniciar.jsx";
import { RegisterForm } from "../componentes/login/register.jsx";



function Login() {
    const [form, setForm] = useState(<LoginForm />)
    const [buttonValue, setButtonValue] = useState('Register')


    useEffect(() => {
        Cookies.remove('id')
        Cookies.remove('token')
    })



    async function cambiarForm(e) {
        if (e.target.value === 'Login') {
            setForm(<LoginForm />) 
            setButtonValue('Register')
        } else {
            setForm(<RegisterForm />) 
            setButtonValue('Login')
        }
    }



    return (
        <div id='login-cuerpo'>
            <h2>¡Bienvenid@ a ComuniRed!</h2>

            <p>En ComuniRed la mayor ambicion es crear conexiones auténticas y significativas entre personas de todas partes del mundo. Aquí podrás conocer gente, compartir intereses y experiencias, y crear lazos de amistad que perdurarán en el tiempo.</p>
            
            <p>Únete a ComuniRed en esta nueva era de conexiones humanas donde la tecnología se convierte en la herramienta perfecta para acercarnos más que nunca.</p>

            <h3>¡Regístrate ahora y forma parte de la comunidad de ComuniRed!</h3>

            <input type="button" value={buttonValue} onClick={cambiarForm} />

            {form}




        </div>
    )
}




export {
    Login
}