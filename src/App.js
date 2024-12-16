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
import {
  ComponentTitleProvider,
  TabMenuContextProvider,
  UserContextProvider,
  NotificationsContext
} from './Context/UserContext';
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
  getCurrenciesISO,
  getChildInfo,
  getChildren,
  getRequests,
  getRequestDetails,
  getChildCourses,
  getCourseProfile,
  haveUnreadNotifications, getMessages, getMessageInfo, getLanguages, getLocationCourses, getUserData
} from './dataLoader';
import UserProfileBase from './Users/user/userProfileBase';
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
import SearchResult from "./Search/searchResult";
import CourseApply from "./Course/courseApply";
import Request from "./Requests/request";
import RequestList from "./Requests/requestList";
import RequestDetails from "./Requests/requestDetails";
import ChildCourses from "./Child/childCourses";
import CourseProfile from "./Course/courseProfile";
import CourseProfileHome from "./Course/courseProfileHome";
import TeacherRight from "./TeacherRight";
import ServiceClient from "./ServiceClient";
import {useContext, useEffect, useState} from "react";
import success from "./SuccessPopup/success";
import Message from "./Messages/message";
import Messages from "./Messages/messages";
import MessageDetails from "./Messages/messageDetails";
import NewMessage from "./Messages/newMessage";
import UserProfile from "./Users/user/userProfile";
import User from "./Users/user/user";

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
    errorElement:<RouteBoundary/>,
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
        element:<Protected><Home /></Protected>,
        errorElement:<RouteBoundary/>,
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
          }
        ]
      },
      {
        path:"user/profile",
        element:<UserProfileBase/>,
        errorElement:<RouteBoundary/>,
        children:[
          {
            path:"",
            element: <UserProfile/>,
            loader:()=>{return getUserData()},
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
        element:<Protected><TeacherRight><CourseHome/></TeacherRight></Protected>,
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
            loader:({params})=>{return Promise.all([getCourseLocations(params), getPaymentPeriods(), getCurrenciesISO(), getLanguages()])}
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
          {
            path:"courses",
            element: <CoursesList/>,
            loader:({params})=>{return getLocationCourses(params)},
          },

        ]
      },
      {
        path:"course/:courseId",
        element:<Protected><TeacherRight><Course/></TeacherRight></Protected>,
        errorElement:<RouteBoundary/>,
        children:[
          {
            path:"",
            element:<CourseInfo/>,
            loader:({params})=>{return  Promise.all ([getCourseInfo(params), getCourseStatuses(),getCourseLocations(params), getPaymentPeriods(), getCurrenciesISO(),getLanguages()])}
          },

        ]
      },
      {
        path:"course/profile/:courseId",
        element:<Protected><CourseProfileHome /></Protected>,
        errorElement:<RouteBoundary/>,
        children:[
          {
            path: "",
            element: <CourseProfile />,
            loader:({params})=>{return getCourseProfile(params)}
          },
          {
            path:"course-apply",
            element:<CourseApply/>,
            loader:()=> {return getChildren()}
          },
        ],

      },
      {
        path:"child",
        element:<Protected><Child/></Protected>,
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
        path:"child/:childId",
        element:<Protected><ChildDetails/></Protected>,
        loader:({params})=>{return getChildInfo(params)},
        errorElement:<RouteBoundary/>,
        children:
        [
          {
            path:"",
            element:<ChildInfo/>,
          },
          {
            path: "courses",
            element: <ChildCourses/>,
            loader:({params})=>{return getChildCourses(params)}
          }
        ]

      },
      {
        path:"search",
        element:<Protected><Search/></Protected>,
        errorElement:<RouteBoundary/>,
        children:
        [
          {
            path:"",
            element:<SearchCourse/>
          },
          {
            path:"results",
            element:<SearchResult/>
          },
        ]
      },
      {
        path:"requests",
        element:<Protected><Request/></Protected>,
        errorElement:<RouteBoundary/>,
        children:[
          {
            path:"",
            element:<RequestList/>,
            loader:()=>{return getRequests()}

          },
          {
            path:"accepted",
            element:<RequestList/>,
            loader:()=>{return getRequests("ACCEPTED")}

          },
          {
            path:"rejected",
            element:<RequestList/>,
            loader:()=>{return getRequests("REJECTED")}

          },
          {
            path:":requestId",
            element:<RequestDetails/>,
            loader:({params})=>{return getRequestDetails(params)}
          },
        ]
      },
      {
        path:"messages",
        element:<Protected><Message/></Protected>,
        errorElement:<RouteBoundary/>,
        children:[
          {
            path:"",
            element: <Messages/>,
            loader:()=>{return getMessages()}
          },
          {
            path:"new",
            element: <NewMessage/>,
            loader:()=>{return getConnectedChildren()}
          }
        ]
      },
      {
        path:"message/:id",
        element:<Protected><Message/></Protected>,
        errorElement:<RouteBoundary/>,
        children:[
          {
            path:"",
            element: <MessageDetails/>,
            loader:({params})=>{return getMessageInfo(params)}
          }
        ]
      }
    ],
  },
]);
  const [notificationResult, setNotifications]=useState();
  useEffect(() => {
    const interval = setInterval(()=>{
      haveUnreadNotifications().then(success=>{
        setNotifications(success);
      })
    },15000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>

    <UserContextProvider>
      <ComponentTitleProvider>
        <TabMenuContextProvider>
          <NotificationsContext.Provider value={notificationResult}>
            <RouterProvider router={router}/>
          </NotificationsContext.Provider>
        </TabMenuContextProvider>
      </ComponentTitleProvider>
    </UserContextProvider>
    </>
  );
}

export default App;
