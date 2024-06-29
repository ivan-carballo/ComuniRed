import { useState, useEffect } from "react";
import { Navbar } from "../componentes/navbar.jsx";
import { useNavigate } from "react-router-dom";
import { activeLogin } from '../funciones/activeLogin.js'





function ComuniWall() {
    const navigate = useNavigate();


    
    setInterval(() => {
        activeLogin
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