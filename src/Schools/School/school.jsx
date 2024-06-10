import { Outlet, useLoaderData, useParams } from 'react-router-dom';
import SideMenu from '../../CommonComponents/SideMenu/sidemenu';
import ComponentTitle from '../../CommonComponents/ComponentTitle/componentTitle';
import TabMenu from '../../CommonComponents/TabMenu/tabMenu';
import {TabMenuContext, schoolInfoContext, ComponentTitleContext} from '../../Context/UserContext';
import { useContext, useEffect, useLayoutEffect } from 'react';
import {useTranslation} from "react-i18next";
        
const School = () => {
    let { schoolId }=useParams();
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
                "url":`/school/${schoolId}`,
                "end":true,
            },
            {
                "id":"2",
                "name":t('TabMenu.years'),
                "url":`/school/${schoolId}/school-year-list`
            },
            {
                "id":"3",
                "name":t('TabMenu.locations'),
                "url":`/school/${schoolId}/locations`
            },
            {
                "id":"4",
                "name":t('TabMenu.teachers'),
                "url":`/school/${schoolId}/teachers`
            }
            /*TODO: Global student search*/
            
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
                "name":t('breadcrumbs.schools'),
                "url":"/schools",
                "icon":"IoIosArrowForward",
                "end":true,
            },
            {
                "id":"3",
                "name":`${schoolData.name}`,
                "url":`/school/${schoolData.id}`,
            },
        ]);
        setTitle(t('componentTitles.school'));
    },[t])
    
    

    return (
        <schoolInfoContext.Provider value={schoolData}>
            <SideMenu/>    
            <div className="content-main-container">
                <ComponentTitle/>
                
                <div className="user-main">
                   
                    <TabMenu />
                    <Outlet/>
                </div>
            </div>
        </schoolInfoContext.Provider>
        
    );
};
export default School;