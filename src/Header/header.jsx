import {useEffect, useRef, useState} from 'react';
import './newheaderCSS.css';
import {FaListUl, FaUserCog} from "react-icons/fa";
import { useContext } from 'react';
import {NotificationsContext, UserContext} from '../Context/UserContext';
import ServiceClient from '../ServiceClient';
import Success from '../SuccessPopup/success';
import {useLocation, useNavigate} from 'react-router-dom';
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
const Header = () => {
    /*Translation*/
    const [language, setLanguage] = useState("HU");
    const {t}=useTranslation();
    const location=useLocation();
    const nodeRef=useRef(null);
    useEffect(() => {
        i18next.changeLanguage(languageTransform(language)).then(()=>{
            /*document.title=t('document.title');
            console.log(location);*/
        });

    }, [language]);

    /*General vaiables */
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

    const NotificationQuery=(e)=>{
        e.preventDefault();
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
        <div className="main-container flex">
            <EventHandler
                success={success}
                errors={errors}
                serverError={serverError}
                closeErrorMessage={(data) => {
                    if (data === true) {
                        setErrors([])
                    }
                }}/>
            <div className='logo-container' onClick={(e)=>navigate('/home')}>
                <i className='graduatehat'></i>
                <div className="app-title">
                    <h1>PrivateTeacher</h1>
                </div>
            </div>

            {name ? <div className="user-container">
               <h4>{username || null}</h4>
            </div> : null}

            <div className="header-action-container">
                {name?<FaUserCog className="logout-icon" onClick={()=>{navigate(`/user/profile`)}}/>:null}
                {name? <MdLogout className="logout-icon" onClick={logout}/>:null}

                {name ?
                    <div className="notification-container">
                        <IoIosNotifications className={haveUnreadNotifications ? "header-icon red" : "header-icon"}
                                            onClick={(e) => NotificationQuery(e)}/>
                    </div>
                    : null}
                {notificationMenu && name ?
                    <div className="notification-menu">
                        <>
                            {getNotifications ? getNotifications.map(e =>
                                <div key={e.id} className="notification-child" onScroll={(e) => console.log(e)}
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
                                        <p style={e.read === false ? {fontWeight: "bold"} : {fontWeight: "normal"}}>{e.message}</p>
                                        <p className="date">{new Date(e.created_at).getUTCFullYear()}-{new Date(e.created_at).getUTCMonth()}-{new Date(e.created_at).getUTCDate()} {new Date(e.created_at).getUTCHours()}:{new Date(e.created_at).getUTCMinutes()}</p>
                                    </div>
                                </div>
                            ) : <div className="notification-menu-loader-container"><span
                                className="loader notification"/><p>{t('header.notifications.loader')}</p></div>}
                        </>
                    </div> : null}

                <div className="lng-select">
                    <ReactFlagsSelect
                        countries={["HU", "GB"]}
                        customLabels={{HU: "magyar", GB: "english"}}
                        placeholder="Select Language"
                        selected={language}
                        onSelect={(code) => setLanguage(code)}
                        className="menu-flags"
                    />
                </div>
            </div>
            {false &&name ?
                <div className="mobile-menu">
                    <FaListUl className='dropdown-btn' onClick={() => {
                        setMobileMenu(!showMobileMenu)
                    }}/>

                    <CSSTransition
                        nodeRef={nodeRef}
                        in={showMobileMenu}
                        classNames="slide-right"
                        timeout={500}
                        mountOnEnter
                        unmountOnExit
                    >
                        <div className="menu-container" ref={nodeRef}>
                            <button className='headerBtn btn'>{name}</button>
                            <button className='headerBtn btn'>Logout</button>
                        </div>
                    </CSSTransition>
                </div> : null}
        </div>


    );
};
export default Header;