import { Link, Outlet, useNavigate } from "react-router-dom";
import ComponentTitle from "../CommonComponents/ComponentTitle/componentTitle";
import SideMenu from "../CommonComponents/SideMenu/sidemenu";
import TabMenu from "../CommonComponents/TabMenu/tabMenu";
import { PiUserListFill  } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";
import { useContext, useEffect } from "react";
import {ComponentTitleContext, TabMenuContext} from "../Context/UserContext";
import {useTranslation} from "react-i18next";
        
const Users = () => {
    const navigate= useNavigate();
    const {t}=useTranslation();
    /*TabMenu*/
    const {setMenuItems}=useContext(TabMenuContext);
    const {setTitle, setBreadcrumbs}=useContext(ComponentTitleContext);

    useEffect(()=>{
        setMenuItems([
            {
                "id":"1",
                "name":t('TabMenu.user-list'),
                "url":'/users/list',
            },
            {
                "id":"2",
                "name":t('TabMenu.create'),
                "url":'/users/create'
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
                "name":t('breadcrumbs.users'),
                "url":"/users",
            },
        ])
        setTitle(t('componentTitles.users'));
    },[t])
    


    return (
        <>
        <SideMenu/> 
        <div className="content-main-container">
            <ComponentTitle />
            
            <div className="home-component-main">
                { window.location.pathname === '/users' ? 
                <div className="button-main-container flex">
                    <div className="button-container">
                        <Link to={"/users/list"}><div className="icon-container"><PiUserListFill  className="icon"/></div></Link>
                        <div className="icon-text"><h3>{t('users.home.list')}</h3></div>
                    </div>
                    <div className="button-container">
                        <Link to={"/users/create"}><div className="icon-container" ><FaUserPlus className="icon"/></div></Link>
                        <div className="icon-text"><h3>{t('users.home.create')}</h3></div>
                    </div>
                   
                </div>:<TabMenu/>}
                <Outlet/>
            </div>
        </div>
        </>
    );
};
export default Users;