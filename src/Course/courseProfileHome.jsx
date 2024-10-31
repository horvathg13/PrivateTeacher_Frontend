import React, {useContext, useEffect} from 'react';
import {Outlet, useLoaderData, useParams} from "react-router-dom";
import {ComponentTitleContext, TabMenuContext} from "../Context/UserContext";
import {useTranslation} from "react-i18next";
import SideMenu from "../CommonComponents/SideMenu/sidemenu";
import ComponentTitle from "../CommonComponents/ComponentTitle/componentTitle";
import TabMenu from "../CommonComponents/TabMenu/tabMenu";

const CourseProfileHome = () => {
    let { courseId }=useParams();
    const {setMenuItems}=useContext(TabMenuContext);
    const {setTitle,setBreadcrumbs}=useContext(ComponentTitleContext);
    /*Translation*/
    const {t}=useTranslation();
    useEffect(()=>{
        setMenuItems([
            {
                "id":"1",
                "name":t('TabMenu.info'),
                "url":`/course/profile/${courseId}`,
                "end":true,
            },
            {
                "id":"2",
                "name":t('TabMenu.apply'),
                "url":`/course/profile/${courseId}/course-apply`
            },
        ]);

        setBreadcrumbs([
            {
                "id":"1",
                "name":t('breadcrumbs.home'),
                "url":"/home",
                "icon":"IoIosArrowForward",

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

export default CourseProfileHome;