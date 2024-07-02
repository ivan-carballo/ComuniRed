import { useState, useEffect } from "react";
import { Navbar } from "../componentes/navbar.jsx";
import { useNavigate } from "react-router-dom";
import { obtenerToken } from "../funciones/token.js";
import Cookies from 'js-cookie'
import { NewPost } from "../componentes/index/post.jsx";





function ComuniWall() {
    const navigate = useNavigate()

    const [recarga, setRecarga] = useState(false)


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
                navigate("/")
            }
            setRecarga(false)
        }
    })

    setInterval(() => {
        setRecarga(true)
    }, 60000);






    return (
        <div id='index-cuerpo'>
            <Navbar />
            <h2>ComuniWall</h2>

            <NewPost />



        </div>
    )
}




export {
    ComuniWall
}