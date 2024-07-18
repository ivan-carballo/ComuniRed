import { createBrowserRouter } from "react-router-dom";
import { ComuniWall } from "./pages/comuniwall.jsx";
import { Login } from "./pages/login.jsx";
import { UserPerfil } from "./pages/user.jsx";
import { Perfil } from "./pages/perfil.jsx";
import { Options } from "./pages/options.jsx";
import { Response } from "./pages/response.jsx";
import { Notification } from "./pages/notification.jsx";
import { Search } from './pages/search.jsx'
import React from 'react';






const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Login />
  },

  {
    path: "/comuniwall",
    element: <ComuniWall />
  },

  {
    path: "/user",
    element: <UserPerfil />
  },

  {
    path: "/search",
    element: <Search />
  },

  {
    path: "/options",
    element: <Options />
  },

  {
    path: "/user/:id",
    element: <Perfil />
  },

  {
    path: "/response/:id",
    element: <Response />
  },

  {
    path: "/notification",
    element: <Notification />
  }

]);


export default router; 