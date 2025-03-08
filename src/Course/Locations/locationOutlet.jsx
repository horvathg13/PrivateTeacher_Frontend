import React, {useContext, useEffect} from 'react';
import {Outlet, useLoaderData, useParams} from "react-router-dom";
import {ComponentTitleContext, LocationInfoContext, TabMenuContext} from "../../Context/UserContext";
import {useTranslation} from "react-i18next";
import SideMenu from "../../CommonComponents/SideMenu/sidemenu";
import ComponentTitle from "../../CommonComponents/ComponentTitle/componentTitle";
import TabMenu from "../../CommonComponents/TabMenu/tabMenu";

const LocationOutlet = () => {

    let { locationId }=useParams();
    const locationData = useLoaderData();
    const {setMenuItems}=useContext(TabMenuContext);
    const {setTitle,setBreadcrumbs}=useContext(ComponentTitleContext);
    /*Translation*/
    const {t}=useTranslation();
    useEffect(()=>{
        setMenuItems([
            {
                "id":"1",
                "name":t('TabMenu.info'),
                "url":`/location/${locationId}`,
                "end":true,
            },
            {
                "id":"2",
                "name":t('TabMenu.courses'),
                "url":`/location/${locationId}/courses`
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
                "name":t('breadcrumbs.course'),
                "url":"/course/locations",
                "icon":"IoIosArrowForward",
            },
            {
                "id":"3",
                "name":t('breadcrumbs.location'),
                "url":`/location/${locationId}`,
                "icon":"IoIosArrowForward",
                "end":true,

            },
        ]);
        setTitle(t('componentTitles.location'));
    },[t])



    return (
        <LocationInfoContext.Provider value={locationData}>
            <SideMenu/>
            <div className="content-main-container">
                <ComponentTitle/>
                <div className="user-main">
                    <TabMenu />
                    <Outlet/>
                </div>
            </div>
        </LocationInfoContext.Provider>

    );
};

export default LocationOutlet;