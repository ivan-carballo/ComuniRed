import React, { useState } from "react"
import { Navbar } from "../componentes/navbar.jsx"
import { NewPost } from "../componentes/index/newPost.jsx"
import { Post } from "../componentes/index/post.jsx"
import { ProveedorContexto } from "../funciones/context.jsx"




// Pagina principal de la web, aqui cargan todos los posts creados hasta el momento y hay un formulario para crear nuevo post
// Toda la informacion viene de dos componentes
function ComuniWall() {



    return (

        <ProveedorContexto>
        
            <Navbar />

            <NewPost />
            <Post />
        
        </ProveedorContexto>
            
    )
}




export {
    ComuniWall
}