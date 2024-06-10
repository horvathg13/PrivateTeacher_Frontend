import { Link, Outlet, useNavigate } from "react-router-dom";
import ComponentTitle from "../CommonComponents/ComponentTitle/componentTitle";
import SideMenu from "../CommonComponents/SideMenu/sidemenu";
import TabMenu from "../CommonComponents/TabMenu/tabMenu";
import { FaListUl } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { useContext, useEffect } from "react";
import {ComponentTitleContext, TabMenuContext} from "../Context/UserContext";
import {useTranslation} from "react-i18next";
        
const SchoolsHome = () => {
    const navigate= useNavigate();
    const {t}=useTranslation();
    /*TabMenu */
    const {setMenuItems}=useContext(TabMenuContext);
    const {setTitle, setBreadcrumbs}=useContext(ComponentTitleContext);
    useEffect(()=>{
        setMenuItems([
            {
                "id":"1",
                "name":t('TabMenu.school-list'),
                "url":'/schools/list',
            },
            {
                "id":"2",
                "name":t('TabMenu.create'),
                "url":'/schools/create'
            },
        ]);
        setBreadcrumbs([
            {
                "id":"1",
                "name":t('breadcrumbs.home'),
                "url":"/home",
                "icon":"IoIosArrowForward"
            },
            {
                "id":"2",
                "name":t('breadcrumbs.schools'),
                "url":"/schools",
            },
        ]);
        setTitle(t('componentTitles.schools'));
    },[t])
   


    return (
        <>
        <SideMenu/> 
        <div className="content-main-container">
            <div className="home-component-main">
                <ComponentTitle/>
                { window.location.pathname === '/schools' ?
                <div className="button-main-container flex">
                    <div className="button-container">
                        <Link to={"/schools/list"}><div className="icon-container"><FaListUl className="icon" /></div></Link>
                        <div className="icon-text"><h3>{t('schools.home.list')}</h3></div>
                    </div>
                    <div className="button-container">
                        <Link to={"/schools/create"}><div className="icon-container"><IoIosCreate className="icon" /></div></Link>
                        <div className="icon-text"><h3>{t('schools.home.create')}</h3></div>
                    </div>
                </div>
                :<TabMenu/>}
                 <Outlet/>
            </div>
        </div>
        </>
    );
};
export default SchoolsHome;