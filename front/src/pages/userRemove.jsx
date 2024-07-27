import React from "react";
import { Navbar } from "../componentes/navbar";
import '../saas/userRemove.scss'
import alert from '../assets/alert.png'


// Componente para avisar de que el usuario del que quieres ver el perfil ya no existe
function UserRemove() {





    return (
        <div id="userDel-body">
            
            <Navbar />

            <div id="userDel-data">
                
                <div id="userDel-data-text">
                    <img src={alert} />
                    <p>El usuario seleccionado no existe o ha sido eliminado</p>
                </div>

            </div>

        </div>
    )
}


export { 
    UserRemove
}