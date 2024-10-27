import { Outlet, useLoaderData, useParams } from "react-router-dom";
import ComponentTitle from "../CommonComponents/ComponentTitle/componentTitle";
import SideMenu from "../CommonComponents/SideMenu/sidemenu";
import TabMenu from "../CommonComponents/TabMenu/tabMenu";
import {ComponentTitleContext, TabMenuContext, userInfoContext} from "../Context/UserContext";
import { useContext, useEffect } from "react";
import {useTranslation} from "react-i18next";
        
const Child = () => {
    //let { userId }=useParams();
    //const userData = useLoaderData();

    /*Translation*/
    const {t}=useTranslation();
    /*TabMenu*/
    const {setMenuItems}=useContext(TabMenuContext);
    const {setTitle, setBreadcrumbs}=useContext(ComponentTitleContext);
    useEffect(()=>{
        setMenuItems([
            {
                "id":"1",
                "name":t('TabMenu.list'),
                "url":"/child",
                "end":true,
            },
            {
                "id":"2",
                "name":t('TabMenu.create'),
                "url":"/child/create"
            },
            {
                "id":"3",
                "name":t('TabMenu.connect'),
                "url":"/child/connect"
            },
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
                "name":t('breadcrumbs.child'),
                "url":"/child",
                "icon":"IoIosArrowForward",
                "end":true,
            },
        ]);
        setTitle("Child");
    },[])
    
    

    
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
export default Child;