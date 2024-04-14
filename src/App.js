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
import { TabMenuContextProvider, UserContextProvider } from './Context/UserContext';
import UserDetailsComponent from './Users/user/userDetails/userDetails';
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ServiceClient from './ServiceClient';
import { generatedUserLoader, userDataLoader, getSchoolInfo, getSchoolYearInfos, getSchoolBreaks, getSchoolCourses, getSchoolCourseStatuses, getSchoolCourseInfo, getUserRoles, getRolesandSchools, getConnectedChildren, getSchoolYearStatuses } from './dataLoader';
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
import SchoolYearDetails from './Schools/School/SchoolYearList/schoolYearDetails/schoolYearDetails';
import SchoolYearInfos from './Schools/School/SchoolYearList/schoolYearDetails/schoolYearInfos/schoolYearInfos';
import SchoolBreaks from './Schools/School/SchoolYearList/schoolYearDetails/schoolBreaks/schoolBreaks';
import SchoolSpecialWorkDays from './Schools/School/SchoolYearList/schoolYearDetails/schoolSpecialWorkDays/schoolSpecialWokDays';
import SchoolCoursesList from './Schools/School/SchoolYearList/schoolYearDetails/SchoolCourses/schoolCoursesList';
import SchoolCourseCreate from './Schools/School/SchoolYearList/schoolYearDetails/SchoolCourses/Create/schoolCourseCreate';
import SchoolCourseInfo from './Schools/School/SchoolYearList/schoolYearDetails/SchoolCourses/Info/schoolCourseInfo';
import CreateUserRole from "./Users/user/userRolesHandler/createUserRole";
import Child from './Child/child';
import ChildList from './Child/childList';
import CreateChild from './Child/createChild';
import ChildConnect from './Child/childConnect';
import Search from './Search/search';
import SearchTeacher from './Search/searchTeacher';
import SearchSchool from './Search/searchSchool';
import SearchCourse from './Search/searchCourse';

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
            element:<UserRoles />,
            loader:({params})=>{ return getUserRoles(params) },
          },
          {
            path:"create-role",
            element:<CreateUserRole />,
            loader:({params})=>{ return getRolesandSchools(params) },
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
            loader:()=>{return getSchoolYearStatuses()},
          },
          {
            path:"school-year/:schoolYearId",
            element:<SchoolYearDetails/>,
            loader:({params})=>{ return Promise.all ([getSchoolYearInfos(params), getSchoolYearStatuses()]) },
            children:
            [
              {
                path:"",
                element:<SchoolYearInfos/>,
              },
              {
                path:"breaks",
                element:<SchoolBreaks/>,
                loader:({params})=>{return getSchoolBreaks(params)},
              },
              {
                path:"special-work-days",
                element:<SchoolSpecialWorkDays/>,
                loader:({params})=>{return getSchoolBreaks(params)},
              },
              {
                path:"courses",
                element:<SchoolCoursesList/>,
                loader:({params})=>{return getSchoolCourses(params)},
              },
              {
                path:"create-course",
                element:<SchoolCourseCreate/>,
                loader:()=>{return getSchoolCourseStatuses()}
              },
              {
                path:"course/:courseId",
                element:<SchoolCourseInfo/>,
                loader:({params})=>{return  Promise.all ([getSchoolCourseInfo(params), getSchoolCourseStatuses()])}
              },
            ]
          },
        ]
      },
      {
        path:"child",
        element:<Child/>,
        children:
        [
          {
            path:"",
            element:<ChildList/>,
            loader:()=>{return getConnectedChildren()}
          },
          {
            path:"create",
            element:<CreateChild/>
          },
          {
            path:"connect",
            element:<ChildConnect/>
          }

        ]
      },
      {
        path:"search",
        element:<Search/>,
        children:
        [
          {
            path:"",
            element:<SearchTeacher/>,
            
          },
          {
            path:"school",
            element:<SearchSchool/>
          },
          {
            path:"course",
            element:<SearchCourse/>
          },

        ]
      }
      
      
    ],
  },
]);

  

  return (
    <>

    <UserContextProvider>
      <TabMenuContextProvider>
        <RouterProvider router={router}/>
      </TabMenuContextProvider>
    </UserContextProvider>
    </>
  );
}

export default App;
