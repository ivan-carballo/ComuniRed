import { useState, useEffect } from "react";
import { Navbar } from "../componentes/navbar.jsx";
import Cookies from 'js-cookie';
import { sha256 } from 'js-sha256';





function ComuniWall() {





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