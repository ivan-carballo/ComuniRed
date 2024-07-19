import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { Navbar } from "../componentes/navbar";


import '../saas/inbox/inbox.scss'



function Inbox() {
    const userCurrentID = Cookies.get('id')



    return (
        <>
        
            <Navbar />

            <div id="inbox-body">
                <h3>Inbox</h3>
            </div>
        
        </>
    )
}



export {
    Inbox
}