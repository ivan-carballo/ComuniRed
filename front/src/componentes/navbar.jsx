import '../saas/navbar.scss'
import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { FaHome, FaUserSlash, FaUserCircle, FaCog, FaBell, FaChartBar } from 'react-icons/fa'
import { getPostByProperty } from '../api/postAPI';




const Navbar = () => {
    const navigate = useNavigate();
    const userID = Cookies.get('id')

    const [notification, setNotification] = useState(false)


   
    async function logout() {
        Cookies.remove('id')
        Cookies.remove('token')
        navigate('/')
    }




    useEffect(() => {
        alertNotification()
        async function alertNotification() {
            const getPostByUser = await getPostByProperty('userID', userID)

            const  getPostMap = await getPostByUser.data.map(data => data._id)

            

        }

    }, [])




    return (
        <div id='navbar-global'>
            <nav id='navbar-links'>
                    <NavLink to="/comuniwall" id='comuniwall' title='ComuniWall' className='link'><FaHome /></NavLink>
                    <NavLink to="/user" id='user' title='Perfil' className='link'><FaUserCircle /></NavLink>
                    <NavLink to="/options" id='options' title='options' className='link'><FaCog /></NavLink>
                    <NavLink to="/notification" id='notifications' title='notificacions' className='notification'><FaBell /></NavLink>
                    <NavLink to="/" className='link' title='Cerrar sesion' onClick={logout}><FaUserSlash/></NavLink>
            </nav>
        </div>
    ) 
};



export {
    Navbar
}