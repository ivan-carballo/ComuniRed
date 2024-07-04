import { createBrowserRouter } from "react-router-dom";
import { ComuniWall } from "./pages/comuniwall.jsx";
import { Login } from "./pages/login.jsx";
import { UserPerfil } from "./pages/user.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';






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
  }

]);


export default router; 