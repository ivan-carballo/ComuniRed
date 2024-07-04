import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { Navbar } from "../componentes/navbar.jsx";
import { useNavigate } from "react-router-dom";
import { obtenerToken } from "../funciones/token.js";
import Cookies from 'js-cookie'
import { PostProvider } from '../funciones/postContext.jsx';
import { NewPost } from "../componentes/index/newPost.jsx";
import { Post } from "../componentes/index/post.jsx"





function ComuniWall() {
    const navigate = useNavigate()

    const [recarga, setRecarga] = useState(true)
    const [recargaPost, setRecargaPost] = useState(true)

 

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
        <PostProvider>
            <div id='index-cuerpo'>
                <Navbar />
                <h2>ComuniWall</h2>

                <NewPost />
                <Post />

            </div>
        </PostProvider>
    )
}




export {
    ComuniWall
}