import '../saas/user/user.scss'

import { useState, useEffect } from "react";
import { Navbar } from "../componentes/navbar.jsx";
import { useNavigate } from "react-router-dom";
import { obtenerToken } from "../funciones/token.js";
import { Navigate } from "react-router-dom";



function UserPerfil() {
    const navigate = useNavigate()

    const [recarga, setRecarga] = useState(false)



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




    
    return (
        <>
            <Navbar />
            <div id="user-body">
                <h1>Perfil de usuario</h1>
            </div>
            
        </>
    )
}


export {
    UserPerfil
}