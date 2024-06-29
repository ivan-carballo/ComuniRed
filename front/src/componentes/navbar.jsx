import { Outlet, NavLink, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { sha256 } from 'js-sha256'




const Navbar = () => {
    const navigate = useNavigate();


    
    async function logout() {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
        navigate('/')
    }




    return (
        <div id='navbar-global'>
            <nav>
                    <NavLink to="/comuniwall" className='link'>ComuniWall</NavLink>
                    <NavLink to="/user" className='link'>Perfil</NavLink>
                    <NavLink to="/" className='link' onClick={logout}>Logout</NavLink>
            </nav>
            <Outlet />
        </div>
    )
};



export {
    Navbar
}