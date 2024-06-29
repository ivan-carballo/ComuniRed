import { sha256 } from 'js-sha256';
import { useNavigate } from "react-router-dom";
import { obtenerToken } from './token.js';




async function activeLogin() {
    const navigate = useNavigate();

    const token = obtenerToken()

    if (token === null) {
        navigate("/")
    }

}


export {
    activeLogin
}