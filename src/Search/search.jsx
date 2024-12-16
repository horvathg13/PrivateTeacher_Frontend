import { Outlet, useLoaderData, useParams } from "react-router-dom";
import ComponentTitle from "../CommonComponents/ComponentTitle/componentTitle";
import SideMenu from "../CommonComponents/SideMenu/sidemenu";
import TabMenu from "../CommonComponents/TabMenu/tabMenu";
import {ComponentTitleContext, TabMenuContext, userInfoContext} from "../Context/UserContext";
import { useContext, useEffect } from "react";
import {useTranslation} from "react-i18next";
        
const Search = () => {
    
    const {t}=useTranslation();
    /*TabMenu*/
    const {setMenuItems}=useContext(TabMenuContext);
    const {setTitle, setBreadcrumbs}=useContext(ComponentTitleContext);
    useEffect(()=>{
        setMenuItems([
            {
                "id":"1",
                "name":t('componentTitles.search'),
                "url":"",
                "end":true,
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
                "name":t('breadcrumbs.search'),
                "url":"/search",
                "icon":"IoIosArrowForward",
                "end":true,
            },

        ]);
        setTitle(t('componentTitles.search'));
    },[t])
    
    

    
    return (

        <>
        <SideMenu />
        <div className="content-main-container">
            <ComponentTitle/>

            <div className="user-main">

                <TabMenu />
                <Outlet />
            </div>
        </div>
        </>
    );
};
export default Search;