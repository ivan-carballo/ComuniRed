import '../saas/user/user.scss'

import { useState, useEffect } from "react";
import { Navbar } from "../componentes/navbar.jsx";
import { useNavigate } from "react-router-dom";
import { obtenerToken } from "../funciones/token.js";
import { Navigate } from "react-router-dom";
import { UserStadistic } from '../componentes/perfil/userStadistic.jsx';
import { AllPostByUser } from '../componentes/perfil/userPost.jsx';
import { AllResponseByUser } from '../componentes/perfil/userResponse.jsx';



// Pagina de perfil del usuario logueado
// Se muestra en la cabecera el username, foto de perfil y estadisticas
// Con dos botones se puede alternar la vista entre posts creados y respuestas dadas
function UserPerfil() {
    const navigate = useNavigate()

    const [recarga, setRecarga] = useState(false)
    const [show, setShow] = useState(<AllPostByUser />)
    const [buttonResponse, setButtonResponse] = useState()
    const [buttonPost, setButtonPost] = useState('active')



    // Funcion para comprobar que el token es valido
    comprobacionToken()
    async function comprobacionToken() {
        const comprobarToken = await obtenerToken()
        if (comprobarToken == null) {
            navigate('/')
        }
    }
    

    useEffect(() => {
        if (recarga) {
            const token = obtenerToken()

            if (token === null) {
                document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
                navigate("/")
            }
            setRecarga(false)
        }
    })

    setInterval(() => {
        setRecarga(true)
    }, 60000);


    

    // Funcion para alternar la vista de post y la vista de respuestas
    // Las vistas son componentes externos
    async function buttonShow(e) {
        const buttonValue = e.target.value

        if (buttonValue === 'Posts') {
            setShow(<AllPostByUser />)
            setButtonPost('active')
            setButtonResponse('')
        } else {
            setShow(<AllResponseByUser />)
            setButtonPost('')
            setButtonResponse('active')
        }
    }


    
    return (
        <>
            <Navbar />

            <div id="user-body">

                <UserStadistic />

            <div id="postByUser-buttons">
                <input type="button" value="Posts" id={buttonPost} onClick={buttonShow} />
                <input type="button" value="Respuestas" id={buttonResponse} onClick={buttonShow} />
            </div>

                {show}

            </div>
            
        </>
    )
}


export {
    UserPerfil
}