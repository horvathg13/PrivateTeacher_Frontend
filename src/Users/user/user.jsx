import { Outlet, useLoaderData, useParams } from "react-router-dom";
import ComponentTitle from "../../CommonComponents/ComponentTitle/componentTitle";
import SideMenu from "../../CommonComponents/SideMenu/sidemenu";
import TabMenu from "../../CommonComponents/TabMenu/tabMenu";
import {ComponentTitleContext, TabMenuContext, userInfoContext} from "../../Context/UserContext";
import { useContext, useEffect } from "react";
import {useTranslation} from "react-i18next";
        
const User = () => {
    /*Translation*/
    const {t}=useTranslation();
    let { userId }=useParams();
    const userData = useLoaderData();

    /*TabMenu*/
    const {setMenuItems}=useContext(TabMenuContext);
    const {setTitle, setBreadcrumbs}=useContext(ComponentTitleContext);
    useEffect(()=>{
        setMenuItems([
            {
                "id":"1",
                "name":t('TabMenu.info'),
                "url":`/users/${userId}`,
                "end":true,
            },
            {
                "id":"2",
                "name":t('TabMenu.roles'),
                "url":`/users/${userId}/roles`
            }
        ]);
        setBreadcrumbs([
            {
                "id":"1",
                "name":t('breadcrumbs.home'),
                "url":"/home",
                "icon":"IoIosArrowForward",

            },
            {
                "id":"2",
                "name":t('breadcrumbs.users'),
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
        setTitle(t('componentTitles.user'));
    },[t])
    
    

    
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