import React from "react";
import { useState, useEffect } from "react";
import { Navbar } from "../componentes/navbar.jsx";
import { useNavigate } from "react-router-dom";
import { obtenerToken } from "../funciones/token.js";
import Cookies from 'js-cookie'
import { NewPost } from "../componentes/index/newPost.jsx";
import { Post } from "../componentes/index/post.jsx"





function ComuniWall() {
    const navigate = useNavigate()

    const [recarga, setRecarga] = useState(true)

 

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