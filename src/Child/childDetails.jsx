import React, {useContext, useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {
    ChildInfoContext,
    ChildInfoContextProvider,
    ComponentTitleContext,
    TabMenuContext
} from "../Context/UserContext";
import SideMenu from "../CommonComponents/SideMenu/sidemenu";
import ComponentTitle from "../CommonComponents/ComponentTitle/componentTitle";
import TabMenu from "../CommonComponents/TabMenu/tabMenu";
import {Outlet, useLoaderData, useParams} from "react-router-dom";

const ChildDetails = () => {
    /*Translation*/
    const {t}=useTranslation();

    const {childId} =useParams();
    const childInfo =useLoaderData();
    /*TabMenu*/
    const {setMenuItems}=useContext(TabMenuContext);
    const {setTitle, setBreadcrumbs}=useContext(ComponentTitleContext);
    const {setChildInfo}=useContext(ChildInfoContext);
    useEffect(()=>{
        setMenuItems([
            {
                "id":"1",
                "name":t('TabMenu.info'),
                "url":`/child/${childId}`,
                "end":true,
            },
            {
                "id":"2",
                "name":t('TabMenu.courses'),
                "url":`/child/${childId}/courses`
            },
            {
                "id":"3",
                "name":t('TabMenu.requests'),
                "url":`/child/${childId}/requests`
            },

        ]);
        setBreadcrumbs([
            {
                "id":"1",
                "name":t("breadcrumbs.home"),
                "url":"/home",
                "icon":"IoIosArrowForward",

            },
            {
                "id":"2",
                "name":t("breadcrumbs.child"),
                "url":"/child",
                "icon":"IoIosArrowForward",
                "end":true,
            },
        ]);
        setTitle(t('componentTitles.child'));
    },[t])

    useEffect(() => {
        setChildInfo(childInfo)
    }, [childInfo]);

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

export default ChildDetails;