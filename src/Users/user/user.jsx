import { Outlet, useLoaderData, useParams } from "react-router-dom";
import ComponentTitle from "../../CommonComponents/ComponentTitle/componentTitle";
import SideMenu from "../../CommonComponents/SideMenu/sidemenu";
import TabMenu from "../../CommonComponents/TabMenu/tabMenu";
import {userInfoContext} from "../../Context/UserContext";
import "./user.css";
        
const User = () => {
    let { userId }=useParams();
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
    const userData = useLoaderData();
    return (
        <userInfoContext.Provider value={userData}>
        <div className="user-main-container">
            <ComponentTitle />
            <SideMenu/> 
            <div className="user-main">
                <TabMenu menu={tabData}/>
                <Outlet/>
            </div>
        </div>
        </userInfoContext.Provider>
    );
};
export default User;