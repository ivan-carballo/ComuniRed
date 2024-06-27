import { createBrowserRouter } from "react-router-dom";
import { Root } from './root.jsx'
import { Escaner } from "./pages/escaner.jsx";
import { Login } from "./pages/login.jsx";
import { Analisis } from "./pages/analisis.jsx";


const router = createBrowserRouter([
    {
      path: "/",
      //element: <Root />,
      children: [
        {
          path: "/",
          element: <Root />
        },

        {
          path: "/escaner",
          element: <Escaner />
        },

        {
          path: "/analisis",
          element: <Analisis />
        },

        {
          path: "/login",
          element: <Login />
        },


      ]
    }    
  ]);


export default router;