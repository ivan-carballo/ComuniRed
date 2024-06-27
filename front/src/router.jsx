import { createBrowserRouter } from "react-router-dom";
import { Root } from './root.jsx'
import { ComuniWall } from "./pages/comuniwall.jsx";
import { Login } from "./pages/login.jsx";


const router = createBrowserRouter([
  
        {
          path: "/",
          element: <Login />
        },

        {
          path: "/comuniwall",
          element: <ComuniWall />
        },

      ]);


export default router;