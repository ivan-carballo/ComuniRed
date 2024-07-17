import '../saas/navbar.scss'
import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { FaHome, FaUserSlash, FaUserCircle, FaCog, FaBell } from 'react-icons/fa'
import { getNotificationByProperty } from '../api/notificationAPI';




const Navbar = () => {
    const navigate = useNavigate();
    const userID = Cookies.get('id')

    const [notification, setNotification] = useState(false)
    const [reboot, setReboot] = useState(true)




    useEffect(() => {
        if (userID == null) {
            logout()
        }

    }, [])


   
    async function logout() {
        Cookies.remove('id')
        Cookies.remove('token')
        navigate('/')
    }


    setInterval(() => {
        setReboot(true)
    }, 10000);



    useEffect(() => {
        if(reboot) {
            alertNotification()
            async function alertNotification() {
                const getNotificationByUser = await getNotificationByProperty('userPrincipalID', userID)
                getNotificationByUser.data.length > 0 ? setNotification(true) : setNotification(false)            
            }
        }
        setReboot(false)
    }, [reboot])




    return (
        <div id='navbar-global'>
            <nav id='navbar-links'>
                    <NavLink to="/comuniwall" id='comuniwall' title='ComuniWall' className='link'><FaHome /></NavLink>
                    <NavLink to="/user" id='user' title='Perfil' className='link'><FaUserCircle /></NavLink>
                    <NavLink to="/options" id='options' title='options' className='link'><FaCog /></NavLink>
                    {notification ? <NavLink to="/notification" id='notifications' title='notificacions' className='notification'><FaBell /></NavLink> : <></>}
                    <NavLink to="/" className='link' title='Cerrar sesion' onClick={logout}><FaUserSlash/></NavLink>
            </nav>
        </div>
    ) 
};



export {
    Navbar
}