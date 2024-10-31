import { Outlet, useLoaderData, useParams } from 'react-router-dom';
import SideMenu from '../CommonComponents/SideMenu/sidemenu';
import ComponentTitle from '../CommonComponents/ComponentTitle/componentTitle';
import TabMenu from '../CommonComponents/TabMenu/tabMenu';
import {TabMenuContext, schoolInfoContext, ComponentTitleContext} from '../Context/UserContext';
import { useContext, useEffect, useLayoutEffect } from 'react';
import {useTranslation} from "react-i18next";
        
const Course = () => {
    let { courseId }=useParams();
    const schoolData = useLoaderData();
    const {setMenuItems}=useContext(TabMenuContext);
    const {setTitle,setBreadcrumbs}=useContext(ComponentTitleContext);
    /*Translation*/
    const {t}=useTranslation();
    useEffect(()=>{
        setMenuItems([
            {
                "id":"1",
                "name":t('TabMenu.info'),
                "url":`/course/${courseId}`,
                "end":true,
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
                "name":t('breadcrumbs.course'),
                "url":"/course/list",
                "icon":"IoIosArrowForward",
                "end":true,
            },
        ]);
        setTitle(t('componentTitles.course'));
    },[t])
    
    

    return (
        <>
            <SideMenu/>    
            <div className="content-main-container">
                <ComponentTitle/>
                
                <div className="user-main">
                   
                    <TabMenu />
                    <Outlet/>
                </div>
            </div>
        </>
        
    );
};
export default Course;