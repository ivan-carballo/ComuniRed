import '../saas/navbar.scss'
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { FaHome, FaUserSlash, FaUserCircle, FaCog } from 'react-icons/fa'




const Navbar = () => {

    const navigate = useNavigate();


    
    async function logout() {
        Cookies.remove('id')
        Cookies.remove('token')
        navigate('/')
    }





    return (
        <div id='navbar-global'>
            <nav id='navbar-links'>
                    <NavLink to="/comuniwall" id='comuniwall' title='ComuniWall' className='link'><FaHome /></NavLink>
                    <NavLink to="/user" id='user' title='Perfil' className='link'><FaUserCircle /></NavLink>
                    <NavLink to="/options" id='options' title='options' className='link'><FaCog /></NavLink>
                    <NavLink to="/" className='link' title='Cerrar sesion' onClick={logout}><FaUserSlash/></NavLink>
            </nav>
        </div>
    ) 
};



export {
    Navbar
}