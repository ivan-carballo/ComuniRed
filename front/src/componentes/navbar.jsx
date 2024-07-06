import '../saas/navbar.scss'
import React, { useState } from 'react';
import { Outlet, NavLink, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { FaHome, FaUserSlash, FaUserCircle } from 'react-icons/fa'




const Navbar = () => {

    const navigate = useNavigate();


    
    async function logout() {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
        Cookies.remove('id')
        navigate('/')
    }





    return (
        <div id='navbar-global'>
            <nav id='navbar-links'>
                    <NavLink to="/comuniwall" id='comuniwall' title='ComuniWall' className='link'><FaHome /></NavLink>
                    <NavLink to="/user" id='user' title='Perfil' className='link'><FaUserCircle /></NavLink>
                    <NavLink to="/" className='link' title='Cerrar sesion' onClick={logout}><FaUserSlash/></NavLink>
            </nav>
            <Outlet />
        </div>
    ) 
};



export {
    Navbar
}