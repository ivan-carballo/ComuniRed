import { createBrowserRouter, useLocation } from "react-router-dom";
import { ComuniWall } from "./pages/comuniwall.jsx";
import { Login } from "./pages/login.jsx";
import { UserPerfil } from "./pages/user.jsx";
import { Perfil } from "./pages/perfil.jsx";
import { Options } from "./pages/options.jsx";
import { Response } from "./pages/response.jsx";
import { Notification } from "./pages/notification.jsx";
import { Search } from './pages/search.jsx'
import { Inbox } from "./pages/inbox.jsx";
import { InboxChat } from "./pages/inboxChat.jsx";
import { Validate } from "./pages/validate.jsx";
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';



// Asociacion entre rutas y paginas que mostrar
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
    path: "/inbox",
    element: <Inbox />
  },

  {
    path: "/inbox/:id",
    element: <InboxChat />
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
  },

  {
    path: "/validate/:id",
    element: <Validate />
  }


]);




export default router; 