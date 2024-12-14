import { Outlet, useLoaderData, useParams } from "react-router-dom";
import ComponentTitle from "../../CommonComponents/ComponentTitle/componentTitle";
import SideMenu from "../../CommonComponents/SideMenu/sidemenu";
import TabMenu from "../../CommonComponents/TabMenu/tabMenu";
import {ComponentTitleContext, TabMenuContext, userInfoContext} from "../../Context/UserContext";
import { useContext, useEffect } from "react";
import {useTranslation} from "react-i18next";
        
const UserProfileBase = () => {
    /*Translation*/
    const {t}=useTranslation();

    /*TabMenu*/
    const {setMenuItems}=useContext(TabMenuContext);
    const {setTitle, setBreadcrumbs}=useContext(ComponentTitleContext);
    useEffect(()=>{
        setMenuItems([
            {
                "id":"1",
                "name":t('TabMenu.profile'),
                "url":`/user/profile`,
                "end":true,
            }
        ]);
        setBreadcrumbs([
            {
                "id":"1",
                "name":t('breadcrumbs.home'),
                "url":"/home",
                "icon":"IoIosArrowForward",

            }
        ]);
        setTitle(t('componentTitles.user'));
    },[t])
    
    

    
    return (

        <>
        <SideMenu/>    
        <div className="content-main-container">
            <ComponentTitle />
            
            <div className="user-main">
                
                <TabMenu/>
                <Outlet/>
            </div>
        </div>
        </>
    );
};
export default UserProfileBase;