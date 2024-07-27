import React from "react";
import { useState } from "react";
import Cookies from 'js-cookie'
import { Navbar } from "../componentes/navbar";
import { ResponseForm } from '../componentes//response/responseForm.jsx'
import { ResponsePost } from '../componentes//response/responsePost.jsx'
import { ProveedorContexto } from '../funciones/context.jsx'
import { useParams } from "react-router-dom";

import '../saas/response/response.scss'





// Pagina para poder ver el detalle de las respuestas de un post concreto
function Response() {
    const { id } = useParams()
    const userCurrentID = Cookies.get('id')





    



    return (

        <ProveedorContexto>

            <Navbar />

            <div id="response-body">

                <ResponseForm id={id} />

                <ResponsePost id={id} />

            </div>


        </ProveedorContexto>

    )
}


export {
    Response
}