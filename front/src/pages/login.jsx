import { useState, useEffect } from "react";
import { Navbar } from "../componentes/navbar.jsx";
import Cookies from 'js-cookie';
import { sha256 } from 'js-sha256';
import '../saas/login.scss'

import { LoginForm } from "../componentes/login/login.jsx";
import { RegisterForm } from "../componentes/login/register.jsx";



function Login() {
    const [form, setForm] = useState(<RegisterForm />)
    const [buttonValue, setButtonValue] = useState('Login')


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