import { Outlet, NavLink, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'




const Navbar = () => {
    const navigate = useNavigate();


    
    async function logout() {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
        Cookies.remove('id')
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