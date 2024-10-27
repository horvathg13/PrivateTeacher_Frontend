import React, {useContext, useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {ChildInfoContext, ComponentTitleContext, TabMenuContext} from "../Context/UserContext";
import SideMenu from "../CommonComponents/SideMenu/sidemenu";
import ComponentTitle from "../CommonComponents/ComponentTitle/componentTitle";
import TabMenu from "../CommonComponents/TabMenu/tabMenu";
import {Outlet, useLoaderData, useParams} from "react-router-dom";

const ChildDetails = () => {
    /*Translation*/
    const {t}=useTranslation();

    const childId =useParams();
    const childInfo =useLoaderData();
    /*TabMenu*/
    const {setMenuItems}=useContext(TabMenuContext);
    const {setTitle, setBreadcrumbs}=useContext(ComponentTitleContext);
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
            }
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
    },[])

    return (
        <>
            <ChildInfoContext.Provider value={childInfo}>
                <SideMenu />
                <div className="content-main-container">
                    <ComponentTitle/>

                    <div className="user-main">
                        <TabMenu />
                        <Outlet />
                    </div>
                </div>
            </ChildInfoContext.Provider>
        </>

    );
};

export default ChildDetails;