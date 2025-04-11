import {useEffect, useRef, useState} from 'react';
import './newheaderCSS.css';
import {FaListUl, FaUserCog} from "react-icons/fa";
import { useContext } from 'react';
import {NotificationsContext, UserContext} from '../Context/UserContext';
import ServiceClient from '../ServiceClient';
import Success from '../SuccessPopup/success';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import EventHandler from '../EventHandler/eventhandler'
import {useTranslation} from "react-i18next";
import {languageTransform} from "../index";
import i18next from "i18next";
import ReactFlagsSelect from "react-flags-select";
import {CSSTransition} from "react-transition-group";
import "../transitions.css";
import {IoIosNotifications} from "react-icons/io";
import {RiGraduationCapFill} from "react-icons/ri";
import {MdLogout} from "react-icons/md";
import moment from "moment";
const Header = () => {
    /*Translation*/
    const [language, setLanguage] = useState(localStorage.getItem("i18nextLng").slice(3) || "HU");
    const {t}=useTranslation();
    const location=useLocation();
    const nodeRef=useRef(null);
    useEffect(() => {
        i18next.changeLanguage(languageTransform(language)).then(()=>{
            /*document.title=t('document.title');
            console.log(location);*/
        });
    }, [language]);

    /*General variables */
    const [showMobileMenu, setMobileMenu]=useState(false);
    const [name, setName]=useState('');
    const [notificationMenu, setNotificationMenu]=useState(false);
    /*EventHandlers */
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);
    const [errors, setErrors]=useState([]);
    const [getNotifications, setNotifications]=useState([]);
    /*redirect */
    const navigate = useNavigate();

    /*useContext*/
    let {username, setUsername}=useContext(UserContext);
    const haveUnreadNotifications=useContext(NotificationsContext);

    /*methods:*/
    const logout=()=>{
        
        let url='/api/logout';

        ServiceClient.post(url).then((response)=>{
            if(response.status===200){
                setSuccess(true);
                setUsername(null);
                localStorage.removeItem('token');
                navigate('/');
                setTimeout(()=>{
                    setSuccess(false);
                },2000)
            }
        }).catch((error)=>{
            setServerError(error);
            
        })
    }
    const flagSelectRef=useRef(null);
    const NotificationQuery=(e)=>{
        e.preventDefault();
        const toggleButton = flagSelectRef.current.querySelector("#rfs-btn");
        if (toggleButton && toggleButton.getAttribute("aria-expanded") === "true") {
            toggleButton.click();
        }
        setNotificationMenu(!notificationMenu)
        ServiceClient.getNotifications().then((success)=>{
            setNotifications(success);
        }).catch(error=>{
            console.log(error);
        })
    }

    const readNotification=(id)=>{
        ServiceClient.readNotification(id).then((success)=>{
            return success
        });
    }
    const momentLanguageTransform=(lng)=>{
        switch (lng){
            case 'GB':return 'en-GB'
            case 'HU':return 'hu-HU'
        }
    }
    const dateLocalization=(date)=>{
        let defMoment = moment(date).locale(momentLanguageTransform(language))
        return defMoment.format("LLL");
    }
    /*useEffects: */
    useEffect(()=>{
        setName(username);
    },[{username}])

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            setName(null);
        }
    },[])
    
    return (
        <div className="main-container flex" onClick={()=>setNotificationMenu(false)}>
            <EventHandler
                success={success}
                errors={errors}
                serverError={serverError}
                closeErrorMessage={(data) => {
                    if (data === true) {
                        setErrors([])
                    }
                }}/>
            <Link to="/home">
                <div className='logo-container'>
                    <i className='graduatehat'></i>
                    <div className="app-title">
                        <h1>PrivateTeacher</h1>
                    </div>
                </div>
            </Link>

            {false && name && <div className="user-container">
               <h4>{username || null}</h4>
            </div>}

            <div className="header-action-container">
                <div className="lng-select" ref={flagSelectRef}>
                    <ReactFlagsSelect
                        countries={["HU", "GB"]}
                        customLabels={{HU: "magyar", GB: "english"}}
                        placeholder="Select Language"
                        selected={language}
                        onSelect={(code) => setLanguage(code)}
                        className="menu-flags"
                    />
                </div>
                {name ? <FaUserCog className="logout-icon" onClick={() => {
                    navigate(`/user/profile`)
                }}/> : null}
                {name ?
                    <div className="notification-container">
                        <IoIosNotifications className={haveUnreadNotifications ? "header-icon red" : "header-icon"}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                NotificationQuery(e)
                                            }}/>
                    </div>
                    : null}
                {notificationMenu && name ?
                    <div className="notification-menu" >
                        <>
                            {getNotifications.length ? getNotifications.map(e =>
                                e.empty ?
                                    <div className="notification-child empty">
                                        <div className="notification-child-icon-container">
                                            <RiGraduationCapFill
                                                className="notification-child-icon"/>
                                        </div>
                                        <div className="notification-messages">
                                            <p>{t(`header.notifications.${e.message}`)}</p>
                                            <p className="date">{dateLocalization(e.created_at)}</p>
                                        </div>
                                    </div>:
                                    <div key={e.id} className="notification-child"
                                         onClick={() => {
                                             navigate(`${e.url}`);
                                             setNotificationMenu(!notificationMenu);
                                             readNotification(e.id)
                                         }}>
                                        <div className="notification-child-icon-container">
                                            <RiGraduationCapFill
                                                className={e.read === false ? "notification-child-icon yellow" : "notification-child-icon"}/>
                                        </div>
                                        <div className="notification-messages">
                                            <p style={e.read === false ? {fontWeight: "bold"} : {fontWeight: "normal"}}>{t(`${e.message}`)}</p>
                                            <p className="date">{dateLocalization(e.created_at)}</p>
                                        </div>
                                    </div>
                            ) : <div className="notification-menu-loader-container">
                                <span className="loader notification"/>
                                <p>{t('header.notifications.loader')}</p>
                            </div>
                            }
                        </>
                    </div> : null}
                {name ? <MdLogout className="logout-icon" onClick={logout}/> : null}
            </div>
        </div>


    );
};
export default Header;