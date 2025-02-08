import React, {useContext, useEffect} from 'react';
import {Outlet, useLoaderData, useParams} from "react-router-dom";
import {
    ComponentTitleContext,
    CourseInfoContext,
    TabMenuContext,
    UserContext,
    UserContextProvider
} from "../Context/UserContext";
import {useTranslation} from "react-i18next";
import SideMenu from "../CommonComponents/SideMenu/sidemenu";
import ComponentTitle from "../CommonComponents/ComponentTitle/componentTitle";
import TabMenu from "../CommonComponents/TabMenu/tabMenu";

const CourseProfileHome = () => {
    let { courseId }=useParams();
    const {setMenuItems}=useContext(TabMenuContext);
    const {setTitle,setBreadcrumbs}=useContext(ComponentTitleContext);
    const {roles}=useContext(UserContext);
    const courseProfile=useLoaderData();
    /*Translation*/
    const {t}=useTranslation();
    useEffect(()=>{
        setBreadcrumbs([
            {
                "id":"1",
                "name":t('breadcrumbs.home'),
                "url":"/home",
                "icon":"IoIosArrowForward",
            },
        ]);
        setTitle(t('componentTitles.course'));
    },[t,roles])



    return (
        <>
            <SideMenu/>
            <CourseInfoContext.Provider value={courseProfile}>
                <div className="content-main-container">
                    <ComponentTitle/>

                    <div className="user-main">

                        <TabMenu />
                        <Outlet/>
                    </div>
                </div>
            </CourseInfoContext.Provider>
        </>

    );
};

export default CourseProfileHome;