import './App.css';
import * as React from "react";
import {RouterProvider, Outlet} from "react-router-dom";
import Register from "./Register/register"
import Header from './Header/header';
import Login from './Login/login';
import Home from './Home/home';
import UserList from './Users/userList';
import UserRoles from './Users/user/userRoles';
import UserLog from './Users/user/userLog';
import Protected from './ProtectedRoutes';
import {ComponentTitleProvider, TabMenuContextProvider, UserContextProvider} from './Context/UserContext';
import UserDetailsComponent from './Users/user/userDetails';
import { createBrowserRouter } from 'react-router-dom';
import {
  generatedUserLoader,
  userDataLoader,
  getCourseInfo,
  getCourses,
  getCourseStatuses,
  getUserRoles,
  getGlobalRoles,
  getConnectedChildren,
  getCourseLocations,
  getCourseLocation,
  getPaymentPeriods,
  getCurrenciesISO, getChildInfo
} from './dataLoader';
import User from './Users/user/user';
import Users from './Users/users';
import UserCreate from './Users/createUser';
import GeneratedUser from './Users/generatedUser';
import CourseHome from "./Course/courseHome";
import Course from './Course/course';
import CoursesList from './Course/coursesList';
import CourseCreate from './Course/courseCreate';
import CourseInfo from './Course/courseInfo';
import CreateUserRole from "./Users/user/createUserRole";
import Child from './Child/child';
import ChildList from './Child/childList';
import CreateChild from './Child/createChild';
import ChildConnect from './Child/childConnect';
import Search from './Search/search';
import SearchTeacher from './Search/searchTeacher';
import SearchSchool from './Search/searchSchool';
import SearchCourse from './Search/searchCourse';
import LocationList from "./Course/Locations/locationList";
import AddNewLocation from "./Course/Locations/addNewLocation";
import Location from "./Course/Locations/location";
import LocationOutlet from "./Course/Locations/locationOutlet";
import RouteBoundary from "./CommonComponents/RouteBoundary";
import AdminRight from "./AdminRight";
import ChildDetails from "./Child/childDetails";
import ChildInfo from "./Child/childInfo";

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
        element:<Protected><AdminRight><Users /></AdminRight></Protected>,
        errorElement:<RouteBoundary/>,
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
        element:<Protected><AdminRight><User /></AdminRight></Protected>,
        loader:({params})=>{ return userDataLoader(params) },
        errorElement:<RouteBoundary/>,
        children:[
          {
            path:"",
            element:<UserDetailsComponent />,
            
          },
          {
            path:"roles",
            element:<UserRoles />,
            loader:({params})=>{ return Promise.all([getUserRoles(params), getGlobalRoles()])  },
          },
          {
            path:"create-role",
            element:<CreateUserRole />,
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
        errorElement:<RouteBoundary/>,
        loader:({params})=>{return generatedUserLoader(params)}
      },
      {
        path:"/course",
        element:<Protected><CourseHome/></Protected>,
        errorElement:<RouteBoundary/>,
        children:
        [
          {
            path:"list",
            element:<CoursesList/>,
            loader:({params})=>{return getCourses()},
          },
          {
            path:"create",
            element:<CourseCreate/>,
            loader:({params})=>{return Promise.all([getCourseLocations(params), getPaymentPeriods(), getCurrenciesISO()])}
          },
          {
            path:"locations",
            element: <LocationList/>,
            loader:({params})=>{return  getCourseLocations(params)}

          },
          {
            path:"add-location",
            element: <AddNewLocation/>,
            loader:({params})=>{ return getCourses()},
          }
        ]
      },
      {
        path:"location/:locationId",
        element: <LocationOutlet/>,
        children:[
          {
            path:"",
            element: <Location/>,
            loader:({params})=>{return getCourseLocation(params)},
          },
            //TODO: /course : a helyszínhez tartozó egyéb kurzusokat kellene kilistázni.
        ]
      },
      {
        path:"course/:courseId",
        element:<Protected><Course/></Protected>,
        errorElement:<RouteBoundary/>,
        children:[
          {
            path:"",
            element:<CourseInfo/>,
            loader:({params})=>{return  Promise.all ([getCourseInfo(params), getCourseStatuses(),getCourseLocations(params), getPaymentPeriods(), getCurrenciesISO()])}
          },
        ]
      },
      {
        path:"child",
        element:<Child/>,
        errorElement:<RouteBoundary/>,
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
        path:"/child/:childId",
        element:<ChildDetails/>,
        loader:({params})=>{return getChildInfo(params)},
        errorElement:<RouteBoundary/>,
        children:
        [
          {
            path:"",
            element:<ChildInfo/>,
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
      <ComponentTitleProvider>
        <TabMenuContextProvider>
          <RouterProvider router={router}/>
        </TabMenuContextProvider>
      </ComponentTitleProvider>
    </UserContextProvider>
    </>
  );
}

export default App;
