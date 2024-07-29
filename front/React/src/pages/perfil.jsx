import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../componentes/navbar";
import { PerfilData } from "../componentes/otherPerfil/perfilData";
import { OtherPost } from "../componentes/otherPerfil/otherPost";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { getUserByID } from "../api/userAPI";

import '../saas/otherPerfil/perfil.scss'


// Pagina para ver el perfil de otro usuario, se muestra una cabecera con sus datos y los posts creados
function Perfil() {
    const navigate = useNavigate()
    const { id } = useParams()
    const userCurrentID = Cookies.get('id')


    // useEffect para detectar si el usuario logueado quiere ver su propio perfil se le manda a la pagina para ello y no a los perfiles de otros usuarios
    useEffect(() => {

        if (userCurrentID === id) {
            navigate('/user')
        }

        // Comprobar que el usuario no este eliminado
        userRemove(id)
        async function userRemove(id) {
            const getUser = await getUserByID(id)
            if (getUser.data.del === true) {
                navigate('/userRemove')
            }
        }

    }, [])


    return (
        <>
            <Navbar />
        
            <div id="perfil-body">

                <div id="perfil-responsive">
                
                    <PerfilData id={id} />
                    
                    <OtherPost id={id} />

                </div>

            </div>
        </>
    )
}



export {
    Perfil
}