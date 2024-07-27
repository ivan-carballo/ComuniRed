import React from "react";
import { Navbar } from "../componentes/navbar";
import '../saas/userRemove.scss'



// Componente para avisar de que el usuario del que quieres ver el perfil ya no existe
function UserRemove() {





    return (
        <div id="userDel-body">
            
            <Navbar />

            <div id="userDel-data">
                
                <div id="userDel-data-text">
                    <img src="../assets/alert.png" />
                    <p>El usuario seleccionado no existe o ha sido eliminado</p>
                </div>

            </div>

        </div>
    )
}


export { 
    UserRemove
}