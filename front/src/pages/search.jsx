import React from "react";
import { useState, useEffect } from "react";
import { Navbar } from "../componentes/navbar";


import '../saas/search/search.scss'



function Search() {



    return (
        <>

            <Navbar />
        
            <div id="search-body">
                <h2>Estas en search</h2>
            </div>
        
        </>
    )
}


export {
    Search
}