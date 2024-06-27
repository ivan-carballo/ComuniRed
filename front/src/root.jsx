import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { sha256 } from 'js-sha256';
import Cookies from 'js-cookie';
import { Navbar } from './componentes/navbar';




const Root = () => {






    return (
        <div>
            <Navbar />
            <h1>Estas en raiz</h1>
        </div>
    )
};

export {
    Root
}