import { Outlet, useLoaderData, useParams } from "react-router-dom";
import ComponentTitle from "../../CommonComponents/ComponentTitle/componentTitle";
import SideMenu from "../../CommonComponents/SideMenu/sidemenu";
import TabMenu from "../../CommonComponents/TabMenu/tabMenu";
import {userInfoContext} from "../../Context/UserContext";
import "./user.css";
import { useContext, useEffect } from "react";
        
const User = () => {
    let { userId }=useParams();
    const userData = useLoaderData();

    const tabData=[
        {
            "id":"1",
            "name":"Info",
            "url":`/users/${userId}`,
            "end":true,
        },
        {
            "id":"2",
            "name":"Roles",
            "url":`/users/${userId}/roles`
        },
        {
            "id":"3",
            "name":"Logs",
            "url":`/users/${userId}/logs`
        }
        
    ]
    
    const breadcrumbs=[
        {
            "id":"1",
            "name":"Home",
            "url":"/home",
            "icon":"IoIosArrowForward",
            
        },
        {
            "id":"2",
            "name":"Users",
            "url":"/users",
            "icon":"IoIosArrowForward",
            "end":true,
        },
        {
            "id":"3",
            "name":`${userData.firstname}`,
            "url":`/users/${userData.id}`,
        },
    ]
    
    return (

        <userInfoContext.Provider value={userData}>
        <SideMenu/>    
        <div className="content-main-container">
            <ComponentTitle 
            title={"Users"}
            breadcrumbs={breadcrumbs}/>
            
            <div className="user-main">
                {console.log(userData.firstname)}
                <TabMenu menu={tabData}/>
                <Outlet/>
            </div>
        </div>
        </userInfoContext.Provider>
    );
};
export default User;