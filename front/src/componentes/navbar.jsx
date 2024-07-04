import '../saas/navbar.scss'
import React, { useState } from 'react';
import { Outlet, NavLink, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { FaHome, FaUserSlash, FaUserCircle } from 'react-icons/fa'




const Navbar = () => {

    const navigate = useNavigate();

    const [active, setActive] = useState('activeSection')
    const [noActive, setNoActive] = useState('link')

    
    async function activeLink_1(e) {
        let comuniwallID = document.getElementById('comuniwall')
        let userID = document.getElementById('user')

        comuniwallID.className = active
        userID.className = noActive
    }

    async function activeLink_2(e) {
        let comuniwallID = document.getElementById('comuniwall')
        let userID = document.getElementById('user') 
        
        comuniwallID.className = noActive
        userID.className = active
    }


    
    async function logout() {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
        Cookies.remove('id')
        navigate('/')
    }





    return (
        <div id='navbar-global'>
            <nav id='navbar-links'>
                    <NavLink to="/comuniwall" id='comuniwall' className='link' title='ComuniWall' onClick={activeLink_1}><FaHome /></NavLink>
                    <NavLink to="/user" id='user' className='link' title='Perfil' onClick={activeLink_2}><FaUserCircle /></NavLink>
                    <NavLink to="/" className='link' title='Cerrar sesion' onClick={logout}><FaUserSlash/></NavLink>
            </nav>
            <Outlet />
        </div>
    ) 
};



export {
    Navbar
}