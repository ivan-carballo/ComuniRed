import '../saas/options/options.scss'

import React from "react";
import { useState, useEffect } from "react";
import { Navbar } from '../componentes/navbar'


function Options() {

    return (
        <>
            <Navbar />

            <div id="options-body">            
                <h1>Estas en opciones de usuario</h1>
            </div>
        
        </>

    )
}


export {
    Options
}