import React from "react";
import { useState, useEffect } from "react";
import { Navbar } from "../componentes/navbar.jsx";
import { useNavigate } from "react-router-dom";
import { obtenerToken } from "../funciones/token.js";
import Cookies from 'js-cookie'
import { NewPost } from "../componentes/index/newPost.jsx";
import { Post } from "../componentes/index/post.jsx"




// Pagina principal de la web, aqui cargan todos los posts creados hasta el momento y hay un formulario para crear nuevo post
function ComuniWall() {
    const navigate = useNavigate()

    const [recarga, setRecarga] = useState(true)

 

    // Se comprueba que el token es valido, en caso contrario te manda al login
    comprobacionToken()
    async function comprobacionToken() {
        const comprobarToken = obtenerToken()
        if (comprobarToken === null) {
            navigate('/')
        }
    }
    


    useEffect(() => {
        if (recarga) {
            const token = obtenerToken()

            if (token === null) {
                Cookies.remove('token')
                close()
            }
            setRecarga(false)
        }
    })

    
    async function close() {
        navigate("/")
    }


    // Se hace una comprobacion cada 30 segundos
    setInterval(() => {
        setRecarga(true)
    }, 30000);






    return (
        <>
            <Navbar />

            <NewPost />
            <Post />

        </>
            
    )
}




export {
    ComuniWall
}