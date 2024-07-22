import '../saas/user/user.scss'

import { useState } from "react";
import { Navbar } from "../componentes/navbar.jsx";
import { UserStadistic } from '../componentes/perfil/userStadistic.jsx';
import { AllPostByUser } from '../componentes/perfil/userPost.jsx';
import { AllResponseByUser } from '../componentes/perfil/userResponse.jsx';



// Pagina de perfil del usuario logueado
// Se muestra en la cabecera el username, foto de perfil y estadisticas
// Con dos botones se puede alternar la vista entre posts creados y respuestas dadas
function UserPerfil() {

    const [show, setShow] = useState(<AllPostByUser />)
    const [buttonResponse, setButtonResponse] = useState()
    const [buttonPost, setButtonPost] = useState('active')



    

    // Funcion para alternar la vista de post y la vista de respuestas
    // Las vistas son componentes externos
    async function buttonShow(e) {
        const buttonValue = e.target.value

        if (buttonValue === 'Posts') {
            setShow(<AllPostByUser />)
            setButtonPost('active')
            setButtonResponse('')
        } else {
            setShow(<AllResponseByUser />)
            setButtonPost('')
            setButtonResponse('active')
        }
    }


    
    return (
        <>
            <Navbar />

            <div id="user-body">

                <UserStadistic />

            <div id="postByUser-buttons">
                <input type="button" value="Posts" id={buttonPost} onClick={buttonShow} />
                <input type="button" value="Respuestas" id={buttonResponse} onClick={buttonShow} />
            </div>

                {show}

            </div>
            
        </>
    )
}


export {
    UserPerfil
}