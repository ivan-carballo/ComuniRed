import { useState, useEffect } from "react";
import { Navbar } from "../componentes/navbar.jsx";
import Cookies from 'js-cookie';
import { sha256 } from 'js-sha256';
import '../saas/login.scss'





function Login() {





    return (
        <div id='login-cuerpo'>
            <h2>¡Bienvenid@ a ComuniRed!</h2>

            <p>En ComuniRed la mayor ambicion es crear conexiones auténticas y significativas entre personas de todas partes del mundo. Aquí podrás conocer gente, compartir intereses y experiencias, y crear lazos de amistad que perdurarán en el tiempo.</p>
            
            <p>Únete a ComuniRed en esta nueva era de conexiones humanas donde la tecnología se convierte en la herramienta perfecta para acercarnos más que nunca.</p>

            <h3>¡Regístrate ahora y forma parte de la comunidad de ComuniRed!</h3>






        </div>
    )
}




export {
    Login
}