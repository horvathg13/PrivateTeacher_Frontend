import React, {useContext, useEffect} from 'react';
import {useTranslation} from "react-i18next";
import SideMenu from "../CommonComponents/SideMenu/sidemenu";
import ComponentTitle from "../CommonComponents/ComponentTitle/componentTitle";
import TabMenu from "../CommonComponents/TabMenu/tabMenu";
import {Outlet} from "react-router-dom";
import {ComponentTitleContext, TabMenuContext} from "../Context/UserContext";

const Message = () => {
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
                "url":"/messages",
                "end":true,
            },
            {
                "id":"2",
                "name":t('TabMenu.newMessage'),
                "url":"/messages/new"
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
                "name":t('breadcrumbs.messages'),
                "url":"/messages",
                "icon":"IoIosArrowForward",
                "end":true,
            },
        ]);
        setTitle(t('componentTitles.messages'));
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

export default Message;