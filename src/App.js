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
import { generatedUserLoader, userDataLoader, getSchoolInfo } from './dataLoader';
import User from './Users/user/user';
import Users from './Users/userHome/users';
import UserCreate from './Users/createUser/createUser';
import GeneratedUser from './Users/GeneratedUser/generatedUser';
import SchoolHome from "./Schools/SchoolsHome/schoolsHome";
import SchoolList from "./Schools/SchoolsList/schoolList";
import SchoolCreate from "./Schools/SchoolsCreate/schoolCreate";
import School from './Schools/School/school';
import SchoolDetails from './Schools/School/SchoolDetails/schoolDetails';
import SchoolYear from './Schools/School/SchoolYearList/schoolYearList';
import SchoolYearList from './Schools/School/SchoolYearList/schoolYearList';

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
        element:<Protected><Users /></Protected>,
        children:[
          {
            path:"list",
            element:<UserList />,
          },
          {
            path:"create",
            element:<UserCreate />,
          }
        ]
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
      },
      {
        path:"/generated-user/:token",
        element:<GeneratedUser/>,
        loader:({params})=>{return generatedUserLoader(params)}
      },
      {
        path:"/schools",
        element:<Protected><SchoolHome/></Protected>,
        children:
        [
          {
            path:"list",
            element:<SchoolList/>
          },
          {
            path:"create",
            element:<SchoolCreate/>
          },
        ]
      },
      {
        path:"school/:schoolId",
        element:<Protected><School/></Protected>,
        loader:({params})=>{ return getSchoolInfo(params) },
        children:[
          {
            path:"",
            element:<SchoolDetails/>            
          },
          {
            path:"school-year-list",
            element:<SchoolYearList/>,
          }

         
        ]
      },
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
