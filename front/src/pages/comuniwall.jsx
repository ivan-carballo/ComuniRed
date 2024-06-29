import { useState, useEffect } from "react";
import { Navbar } from "../componentes/navbar.jsx";
import { useNavigate } from "react-router-dom";
import { obtenerToken } from "../funciones/token.js";





function ComuniWall() {


    
    setInterval(() => {
        const token = obtenerToken()

        if (token === null) {
            navigate("/")
        }
    }, 60000);



    return (
        <div id='index-cuerpo'>
            <Navbar />
            <h2>ComuniWall</h2>



        </div>
    )
}




export {
    ComuniWall
}