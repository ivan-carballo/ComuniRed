import { useState, useEffect } from "react";
import { Navbar } from "../componentes/navbar.jsx";
import { useNavigate } from "react-router-dom";
import { obtenerToken } from "../funciones/token.js";
import { Navigate } from "react-router-dom";



function UserPerfil() {
    const navigate = useNavigate()

    const [recarga, setRecarga] = useState(false)




    useEffect(() => {
        if (recarga) {
            const token = obtenerToken()

            if (token === null) {
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
            <h1>Perfil de usuario</h1>
        </>
    )
}


export {
    UserPerfil
}