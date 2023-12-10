import './App.css';
import * as React from "react";
import {BrowserRouter as Router, Routes, Route, RouterProvider, Outlet, useParams} from "react-router-dom";
import Register from "./Register/register"
import Header from './Header/header';
import Login from './Login/login';
import Home from './Home/home';
import UserList from './Users/userList/userList';
import UserRoles from './Users/user/userRolesHandler/userRoles';
import UserLog from './Users/user/userLogs/userLog';
import Protected from './ProtectedRoutes';
import { UserContextProvider } from './Context/UserContext';
import UserDetailsComponent from './Users/user/userDetails/userDetails';
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ServiceClient from './ServiceClient';
import { userDataLoader } from './dataLoader';
import User from './Users/user/user';

function App() {

  const Root = ()=>{
    return(
      <>
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
      
      </>
    )
  }

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path:"register",
        element:<Register />
      },
      {
        path:"home",
        element:<Protected><Home /></Protected>
      },
      {
        path:"users",
        element:<Protected><UserList /></Protected>,
      },
      {
        path:"users/:userId",
        element:<Protected><User /></Protected>,
        loader:({params})=>{ return userDataLoader(params) },
        children:[
          {
            path:"",
            element:<UserDetailsComponent />,
            
          },
          {
            path:"roles",
            element:<UserRoles />
          },
          {
            path:"logs",
            element:<UserLog />
          }
        ]
      }
    ],
  },
]);
  
  

  return (
    <>
    <UserContextProvider>
      <RouterProvider router={router}/>
    </UserContextProvider>
    </>
  );
}

export default App;
