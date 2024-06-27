import { Outlet, NavLink, useSearchParams } from "react-router-dom";
import Cookies from 'js-cookie'
import { sha256 } from 'js-sha256'




const Navbar = () => {





    return (
        <div id='navbar-global'>
            <nav>
                    <NavLink to="/escaner" className='link'>Escaner</NavLink>
                    <NavLink to="/analisis" className="link">Analisis</NavLink>
                    <NavLink to="/login" className='link'>Login / Logout</NavLink>
            </nav>
            <Outlet />
        </div>
    )
};



export {
    Navbar
}