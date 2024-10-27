import { Link, Outlet, useNavigate } from "react-router-dom";
import ComponentTitle from "../CommonComponents/ComponentTitle/componentTitle";
import SideMenu from "../CommonComponents/SideMenu/sidemenu";
import TabMenu from "../CommonComponents/TabMenu/tabMenu";
import { FaListUl } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { useContext, useEffect } from "react";
import {ComponentTitleContext, TabMenuContext} from "../Context/UserContext";
import {useTranslation} from "react-i18next";
import {MdAddLocationAlt} from "react-icons/md";
import {FaLocationDot} from "react-icons/fa6";
        
const CourseHome = () => {
    const navigate= useNavigate();
    const {t}=useTranslation();
    /*TabMenu */
    const {setMenuItems}=useContext(TabMenuContext);
    const {setTitle, setBreadcrumbs}=useContext(ComponentTitleContext);
    useEffect(()=>{
        setMenuItems([
            {
                "id":"1",
                "name":t('TabMenu.courses'),
                "url":'/course/list',
            },
            {
                "id":"2",
                "name":t('TabMenu.create'),
                "url":'/course/create'
            },
            {
                "id":"3",
                "name":t('TabMenu.locations'),
                "url":'/course/locations'
            },
            {
                "id":"4",
                "name":t('TabMenu.add-location'),
                "url":'/course/add-location'
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
                "name":t('breadcrumbs.course'),
                "url":"/course",
            },
        ]);
        setTitle(t('componentTitles.course'));
    },[t])
   


    return (
        <>
        <SideMenu/> 
        <div className="content-main-container">
            <div className="home-component-main">
                <ComponentTitle/>
                { window.location.pathname === '/course' ?
                <div className="button-main-container flex">
                    <div className="button-container">
                        <Link to={"/course/list"}><div className="icon-container"><FaListUl className="icon" /></div></Link>
                        <div className="icon-text"><h3>{t('schools.home.list')}</h3></div>
                    </div>
                    <div className="button-container">
                        <Link to={"/course/create"}><div className="icon-container"><IoIosCreate className="icon" /></div></Link>
                        <div className="icon-text"><h3>{t('schools.home.create')}</h3></div>
                    </div>
                    <div className="button-container">
                        <Link to={"/course/locations"}><div className="icon-container"><FaLocationDot className="icon" /></div></Link>
                        <div className="icon-text"><h3>{t('schools.home.locations')}</h3></div>
                    </div>
                    <div className="button-container">
                        <Link to={"/course/add-location"}><div className="icon-container"><MdAddLocationAlt className="icon" /></div></Link>
                        <div className="icon-text"><h3>{t('schools.home.add-location')}</h3></div>
                    </div>

                </div>
                :<TabMenu/>}
                 <Outlet/>
            </div>
        </div>
        </>
    );
};
export default CourseHome;