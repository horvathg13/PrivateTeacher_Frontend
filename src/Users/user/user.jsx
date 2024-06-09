import { Outlet, useLoaderData, useParams } from "react-router-dom";
import ComponentTitle from "../../CommonComponents/ComponentTitle/componentTitle";
import SideMenu from "../../CommonComponents/SideMenu/sidemenu";
import TabMenu from "../../CommonComponents/TabMenu/tabMenu";
import {ComponentTitleContext, TabMenuContext, userInfoContext} from "../../Context/UserContext";
import { useContext, useEffect } from "react";
        
const User = () => {
    let { userId }=useParams();
    const userData = useLoaderData();

    /*TabMenu*/
    const {setMenuItems}=useContext(TabMenuContext);
    const {setTitle, setBreadcrumbs}=useContext(ComponentTitleContext);
    useEffect(()=>{
        setMenuItems([
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
        ]);
        setBreadcrumbs([
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
        ]);
        setTitle("User");
    },[])
    
    

    
    return (

        <userInfoContext.Provider value={userData}>
        <SideMenu/>    
        <div className="content-main-container">
            <ComponentTitle />
            
            <div className="user-main">
                
                <TabMenu/>
                <Outlet/>
            </div>
        </div>
        </userInfoContext.Provider>
    );
};
export default User;