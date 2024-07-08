import '../saas/options/options.scss'

import React from "react";
import { useState, useEffect } from "react";
import { Navbar } from '../componentes/navbar'
import { UserData } from '../componentes/options/userData';


function Options() {

    return (
        <>
            <Navbar />

            <div id="options-body">            
                <h1 id='rotulo'>Opciones de usuario</h1>
                <UserData />

            </div>
        
        </>

    )
}


export {
    Options
}