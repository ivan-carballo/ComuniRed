import React from "react";
import { useState, useEffect } from "react";



function RegisterForm() {


    async function registrar(e) {
        const formRuta = e.target.form
        const formUsername = formRuta[0].value
        const formEmail = formRuta[1].value
        const formPassword = formRuta[2].value
        const formRepeatPassword = formRuta[3].value
    }


    return (
        <>
            <div id='form-completo'>
                <form id='form'>
                    <input type="text" placeholder='Username'/>
                    <input type="email" placeholder='Email'/>
                    <input type="password" placeholder='Password'/>
                    <input type="password" placeholder='Repeat Password'/>
                    <input type="button" value="Register" onClick={registrar} />
                </form>
            </div>
        </>
    )
}



export {
    RegisterForm
}