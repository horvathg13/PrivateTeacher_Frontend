import './App.css';
import * as React from "react";
import {BrowserRouter as Router, Routes, Route, RouterProvider, Outlet, useParams} from "react-router-dom";
import Register from "./Register/register"
import Header from './Header/header';
import Login from './Login/login';
import Home from './Home/home';
import UserList from './Users/userList';
import UserRoles from './Users/user/userRoles';
import UserLog from './Users/user/userLog';
import Protected from './ProtectedRoutes';
import { TabMenuContextProvider, UserContextProvider } from './Context/UserContext';
import UserDetailsComponent from './Users/user/userDetails';
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ServiceClient from './ServiceClient';
import {
  generatedUserLoader,
  userDataLoader,
  getSchoolInfo,
  getSchoolYearInfos,
  getSchoolBreaks,
  getSchoolCourses,
  getSchoolCourseStatuses,
  getSchoolCourseInfo,
  getUserRoles,
  getRolesandSchools,
  getConnectedChildren,
  getSchoolYearStatuses,
  getSchoolYears, getSchoolLocations, getSchoolLocation
} from './dataLoader';
import User from './Users/user/user';
import Users from './Users/users';
import UserCreate from './Users/createUser';
import GeneratedUser from './Users/generatedUser';
import SchoolHome from "./Schools/schoolsHome";
import SchoolList from "./Schools/schoolList";
import SchoolCreate from "./Schools/School/schoolCreate";
import School from './Schools/School/school';
import SchoolDetails from './Schools/School/schoolDetails';
import SchoolYear from './Schools/School/schoolYearList';
import SchoolYearList from './Schools/School/schoolYearList';
import SchoolYearDetails from './Schools/School/schoolYearDetails/schoolYearDetails';
import SchoolYearInfos from './Schools/School/schoolYearDetails/schoolYearInfos';
import SchoolBreaks from './Schools/School/schoolYearDetails/schoolBreaks';
import SchoolSpecialWorkDays from './Schools/School/schoolYearDetails/schoolSpecialWokDays';
import SchoolCoursesList from './Schools/School/schoolYearDetails/schoolCoursesList';
import SchoolCourseCreate from './Schools/School/schoolYearDetails/schoolCourseCreate';
import SchoolCourseInfo from './Schools/School/schoolYearDetails/schoolCourseInfo';
import CreateUserRole from "./Users/user/createUserRole";
import Child from './Child/child';
import ChildList from './Child/childList';
import CreateChild from './Child/createChild';
import ChildConnect from './Child/childConnect';
import Search from './Search/search';
import SearchTeacher from './Search/searchTeacher';
import SearchSchool from './Search/searchSchool';
import SearchCourse from './Search/searchCourse';
import TeachingDaysList from "./Schools/School/DaysAndTimes/teachingDaysList";
import AddTeachingDay from "./Schools/School/DaysAndTimes/addTeachingDay";
import LocationList from "./Schools/School/Locations/locationList";
import AddNewLocation from "./Schools/School/Locations/addNewLocation";
import Location from "./Schools/School/Locations/location";
import LocationOutlet from "./Schools/School/Locations/locationOutlet";
import TeacherOutlet from "./Schools/School/Teachers/teacherOutlet";
import SearchResult from "./Search/searchResult";
import TeachersList from "./Schools/School/Teachers/teachersList";

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
            loader:({params})=>{return Promise.all([getSchoolYearStatuses(), getSchoolYears(params)]) },
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
                path:"teaching-days",
                element:<TeachingDaysList/>,
                loader:({params})=>{return getSchoolBreaks(params)},
              },
              {
                path:"create-teaching-day",
                element:<AddTeachingDay/>,
                loader:({params})=>{return getSchoolBreaks(params)},
              },
              /*{
                path:"students",
                element:<StudentList/>,
                loader:({params})=>{return },
              },*/
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
          {
            path:"locations",
            element: <LocationOutlet/>,
            /*location loader*/
            children:[
              {
                path:"",
                element: <LocationList/>,
                loader:({params})=>{return  getSchoolLocations(params)}

              },
              {
                path:":locationId",
                element: <Location/>,
                loader:({params})=>{return getSchoolLocation(params)}

              },
              {
                path:"create-location",
                element: <AddNewLocation/>
              }
            ]
          },
          {
            path:"teachers",
            element: <TeachersList/>,

          }
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
