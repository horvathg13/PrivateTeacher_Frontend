import './App.css';
import * as React from "react";
import {BrowserRouter as Router, Routes, Route, RouterProvider, Outlet, useParams} from "react-router-dom";
import Register from "./Register/register"
import Header from './Header/header';
import Login from './Login/login';
import Home from './Home/home';
import Users from './Users/user';
import userRoles from './Users/userRolesHandler/userRoles';
import Protected from './ProtectedRoutes';
import { UserContextProvider } from './Context/UserContext';
import SelectedUserComponent from './Users/selectedUserHandler/selectedUser';
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ServiceClient from './ServiceClient';
import { userDataLoader } from './dataLoader';

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
  const router =createBrowserRouter(
    createRoutesFromElements(
      
      <Route path='/' element={<Root/>}>
          
        <Route index element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route element={<Protected/>}>
          <Route path="/home" element={<Home />}/>
          <Route path="/users" element={<Users />}/>
          <Route path="/users/:userId" loader={({params})=>{ return userDataLoader(params) }} element={<SelectedUserComponent />}/>
          <Route path="/users/:userId/roles" element={<userRoles />}/>
          
        </Route>
          
      </Route>
      
    )
  )
    
  

  return (
    <>
    <UserContextProvider>
      <RouterProvider router={router}/>
    </UserContextProvider>
    </>
  );
}

export default App;
