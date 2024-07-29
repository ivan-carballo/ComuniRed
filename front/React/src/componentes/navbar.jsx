import '../saas/navbar.scss'
import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { FaHome, FaUserSlash, FaUserCircle, FaCog, FaBell, FaSearch, FaInbox } from 'react-icons/fa'
import { getNotificationByProperty } from '../api/notificationAPI.js';
import { getNotiInboxByProperty } from '../api/notiInboxAPI.js';
import { getNotiFollowByProperty } from '../api/notiFollowAPI.js';
import { obtenerToken } from "../funciones/token.js";




// Componente de navbar principal
const Navbar = () => {
    const navigate = useNavigate();
    const userCurrentID = Cookies.get('id')

    const [notification, setNotification] = useState(false)
    const [reboot, setReboot] = useState(true)
    const [noti, setNoti] = useState('link')
    const [numberNoti, setNumberNoti] = useState(0)




    // useEffect para cargar la funcion de cerrar sesion cuando no se encuentran credenciales en las Cookies
    useEffect(() => {
        if (userCurrentID == null) {
            logout()
        }
    }, [])





    // Se comprueba que el token es valido, en caso contrario te manda al login
    useEffect(() => {
        if (reboot) {

            comprobacionToken()
            async function comprobacionToken() {
                const comprobarToken = obtenerToken()
                if (comprobarToken === null) {
                    logout()
                    navigate('/')
                }
            }

            const token = obtenerToken()

            if (token === null) {
                Cookies.remove('token')
                logout()
                close()
            }
        }
    }, [reboot])




   // Funcion para cerrar sesion, se eliminan las Cookies con las credenciales y se manda a la pagina de login
    async function logout() {
        Cookies.remove('id')
        Cookies.remove('token')
        navigate('/')
    }




    // Cada 10 segundos se carga el useEffect para comprobar si aun existen las credenciales en las Cookies
    setInterval(() => {
        setReboot(true)
    }, 5000);




    // useEffect para avisar cuando hay notificaciones de respuestas, de mensajes privados y de nuevos seguidores
    // Tambien se saca el numero total de notificaciones para poner al lado del icono
    useEffect(() => {
        if(reboot) {

            alertNotification()
            async function alertNotification() {
                const getNotificationByUser = await getNotificationByProperty('userPrincipalID', userCurrentID)
                const getNotiFollowByUser = await getNotiFollowByProperty('followerID', userCurrentID)
                getNotificationByUser.data.length > 0 || getNotiFollowByUser.data.length > 0 ? setNotification(true) : setNotification(false) 
                
                setNumberNoti(getNotificationByUser.data.length + getNotiFollowByUser.data.length)
            }

            alertInbox()
            async function alertInbox(){
                const getNotiInboxByUser = await getNotiInboxByProperty('userReceived', userCurrentID)
                getNotiInboxByUser.data.length > 0 ? setNoti('notification') : setNoti('link')
            }

        }
        setReboot(false)
    }, [reboot])





    return (

            <div id='navbar-global'>
                <nav id='navbar-links'>


                        <NavLink to="/comuniwall" id='comuniwall' title='ComuniWall' className='link'><FaHome /></NavLink>
                        <NavLink to="/user" id='user' title='Perfil' className='link'><FaUserCircle /></NavLink>
                        <NavLink to="/inbox" id="inbox" title="inbox" className={noti}><FaInbox /></NavLink>
                        {notification ? <NavLink to="/notification" id='notifications' title='notificacions' className='notification'><FaBell />{numberNoti}</NavLink> : <></>} {/* Operador ternario para que el icono de las notificaciones de respuestas solo aparezca si existen notificaciones */}
                        <NavLink to="/search" id='search' title='search' className='link'><FaSearch /></NavLink>
                        <NavLink to="/options" id='options' title='options' className='link'><FaCog /></NavLink>
                        <NavLink to="/" className='link' title='Cerrar sesion' onClick={logout}><FaUserSlash/></NavLink>


                </nav>
            </div>
    ) 
};



export {
    Navbar
}