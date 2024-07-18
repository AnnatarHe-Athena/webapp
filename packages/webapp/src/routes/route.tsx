import React from "react";
import Index from "../pages/index/Index";
import Welcome from "../pages/welcome/Welcome";
import AuthPage from "../pages/auth/Auth";
import ProfilePage from "../pages/profile/Profile";
import ProfileCellCreatePage from "../pages/add/Index";
import About from "../pages/info/Info";
import VenusPage from "../pages/venus/venus";
import { createBrowserRouter } from "react-router-dom";
import Root from '@athena/components/Root'
import PrivacyPage from '../pages/privacy/privacy'
// import Spinner from 'react-spinkit'

const r = [
  { path: "/", element: <Welcome /> },
  { path: "/category/:cid", element: <Index /> },
  { path: "/auth", element: <AuthPage /> },
  { path: "/profile/:id", element: <ProfilePage /> },
  { path: "/profile/:id/venus", element: <VenusPage /> },
  { path: "/profile/:id/create", element: <ProfileCellCreatePage /> },
  { path: "/about", element: <About /> },
  { path: '/privacy', element: <PrivacyPage /> }
];

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: r,
  },
]);

export default routes;
