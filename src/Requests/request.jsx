import React, {useContext, useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {ComponentTitleContext, TabMenuContext, UserContext} from "../Context/UserContext";
import SideMenu from "../CommonComponents/SideMenu/sidemenu";
import ComponentTitle from "../CommonComponents/ComponentTitle/componentTitle";
import TabMenu from "../CommonComponents/TabMenu/tabMenu";
import {Outlet} from "react-router-dom";

const Request = () => {
    const {t}=useTranslation();
    /*TabMenu*/
    const {setMenuItems}=useContext(TabMenuContext);
    const {setTitle, setBreadcrumbs}=useContext(ComponentTitleContext);
    const {roles}=useContext(UserContext);
    useEffect(()=>{
        {
            roles.some(r => r === 'Teacher') ?
                setMenuItems([
                    {
                        "id": "1",
                        "name": t('TabMenu.list'),
                        "url": `/requests`,
                        "end": true,
                    },
                    {
                        "id": "2",
                        "name": t('TabMenu.accepted'),
                        "url": `/requests/accepted`,

                    },
                    {
                        "id": "3",
                        "name": t('TabMenu.rejected'),
                        "url": `/requests/rejected`,

                    },

                ])
                :
                setMenuItems([
                    {
                        "id": "1",
                        "name": t('TabMenu.list'),
                        "url": `/requests`,
                        "end": true,
                    },
                ])
        }


        setBreadcrumbs([
            {
                "id":"1",
                "name":t('breadcrumbs.home'),
                "url":"/home",
                "icon":"IoIosArrowForward",

            },
            {
                "id":"2",
                "name":t('breadcrumbs.requests'),
                "url":"/requests",
                "icon":"IoIosArrowForward",
                "end":true,
            },

        ]);
        setTitle(t('componentTitles.requests'));
    },[roles,t])

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

export default Request;