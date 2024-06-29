import { Outlet, NavLink, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { sha256 } from 'js-sha256'




const Navbar = () => {
    const navigate = useNavigate();


    
    async function logout() {

    }




    return (
        <div id='navbar-global'>
            <nav>
                    <NavLink to="/comuniwall" className='link'>ComuniWall</NavLink>
                    <NavLink to="/" className='link' onClick={logout}>Logout</NavLink>
            </nav>
            <Outlet />
        </div>
    )
};



export {
    Navbar
}