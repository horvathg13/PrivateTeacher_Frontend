import './home.css';
import menu from './homeMenu.json';
import { HiDocumentDownload } from "react-icons/hi";
import { IoMdSchool } from "react-icons/io";
import {FaChild, FaEnvelope, FaSearch, FaUsers} from "react-icons/fa";
import { BiSolidMessageDetail } from "react-icons/bi";
import {PiNewspaperBold, PiStudentBold} from "react-icons/pi";
import {MdNotificationsActive, MdPayment} from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";
import {FaSchool, FaUserGraduate} from 'react-icons/fa6';
import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../Context/UserContext';
import {json, useNavigate} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import ServiceClient from "../ServiceClient";
import * as Promis from "axios";
import EventHandler from "../EventHandler/eventhandler";
import {parseJSON} from "date-fns";
        
const Home = () => {
    const {username,roles, setUsername, setRoles,  hasAccessMessages, setHasAccessMessages,hasAccessRequests,setHasAccessRequests} =useContext(UserContext);
    const navigate = useNavigate();
    const {t}=useTranslation();
    const getIcon=(iconName)=>{
        switch (iconName) {
            case 'FaUsers':return <FaUsers />;
            case 'FaChild': return <FaChild/>;
            case 'FaSearch': return <FaSearch/>;
            case 'BiSolidMessageDetail': return <BiSolidMessageDetail/>;
            case 'FaSchool':return <FaSchool  />;
            case 'FaUserGraduate':return <FaUserGraduate/>;
            case 'PiNewspaperBold':return <PiNewspaperBold/>;
            case 'FaEnvelope': return <FaEnvelope className='menu-icon icon'/>;
                default: return null;
        }
    }
    const [newMenu, setNewMenu]=useState();

    const hasAccess=(menuItems, userRole)=>{
        if(userRole.some(r=>r === "Parent") || userRole.some(r=>r === "Teacher")){
            let filterMenuItemsByRole=menuItems.filter(menuItem=>menuItem.role.some(r=>userRole.includes(r)));
            let accessToMessages=!hasAccessMessages ? filterMenuItemsByRole.filter(m=>m.name !== "messages") : filterMenuItemsByRole;
            let accessToRequests=!hasAccessRequests ? filterMenuItemsByRole.filter(r=>r.name !== "requests") : filterMenuItemsByRole;

            let final = [...accessToMessages, ...accessToRequests];
            const mergedArray = final.map(item => item).filter((value, index, self) => self.indexOf(value) !== index)

            //console.log(["hasRequests", hasAccessRequests, "hasMessages", hasAccessMessages, "filterMenuByRole",filterMenuItemsByRole, "accessToMessage", accessToMessages, "accessToRequests", accessToRequests, "merge",mergedArray  ])
            return setNewMenu(mergedArray)
        }

        return setNewMenu(menuItems.filter(menuItem=>menuItem.role.some(r=>userRole.includes(r))));
    }
    useEffect(() => {
        if(!roles.length){
             ServiceClient.post("/api/getUserData").then((response)=>{
                setHasAccessMessages(response.data.menuButtonsPermission[0].hasAccessMessages);
                setHasAccessRequests(response.data.menuButtonsPermission[0].hasAccessRequests);
             }).catch(error=>{
                 navigate('/');
             });
        }else{
            if(localStorage.getItem("token")){
                hasAccess(menu,roles)
            }
        }
    }, []);
    useEffect(() => {
        if (roles.length) {
            hasAccess(menu, roles);
        }
    }, [hasAccessMessages, hasAccessRequests, roles]);
    return (
        <>
            <div className="home-text">
                <h1>{t('home.greeting')} {username}</h1>
                <p>{t('home.subtitle')}</p>
            </div>
           <div className="homeMenu-main-container flex">
               {newMenu?.map((e, i) => (
                   <div className="circle-menu-container" key={i}>
                        <div className="icon grid" onClick={() => navigate(`${e.url}`)}>{getIcon(e.icon)}</div>
                        <div className="menu-name">{t(`home.menu.${e.name}`)}</div>
                   </div>
                    )
               )}
           </div>
        </>
    );
};
export default Home;