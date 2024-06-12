import {useEffect, useRef, useState} from 'react';
import './newheaderCSS.css';
import { FaListUl } from "react-icons/fa";
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
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
        
const Header = () => {
    /*Translation*/
    const [language, setLanguage] = useState("HU");
    const {t}=useTranslation();
    const location=useLocation();
    const nodeRef=useRef(null);
    useEffect(() => {
        console.log(language);
        i18next.changeLanguage(languageTransform(language)).then(()=>{
            /*document.title=t('document.title');
            console.log(location);*/
        });

    }, [language]);

    /*General vaiables */
    const [showMobileMenu, setMobileMenu]=useState(false);
    const [name, setName]=useState('');

    /*EventHandlers */
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);
    const [errors, setErrors]=useState([]);
    
    /*redirect */
    const navigate = useNavigate();

    /*useContext*/
    let {username, setUsername}=useContext(UserContext); 

    /*methods:*/
    const logout=()=>{
        
        let url='http://127.0.0.1:8000/api/logout';

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
            <div className='logo-container'>
                <i className='graduatehat'></i>
                <div className="app-title">
                    <h1>PrivateTeacher</h1>
                </div>
            </div>

            {name ? <div className="navbar">
                <button className='headerBtn btn'>Home</button>
                <button className='headerBtn btn'>My Requests</button>
                <button className='headerBtn btn'>Messages</button>
            </div> : null}
            {name ? <div className="user-container">
                <button className='headerBtn btn'>{username ? username : null}</button>
                <button className='headerBtn btn' onClick={logout}>Logout</button>
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
            {name ?
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
                        <button className='headerBtn btn'>Home</button>
                        <button className='headerBtn btn'>My Requests</button>
                        <button className='headerBtn btn'>Messages</button>
                        <button className='headerBtn btn'>{name}</button>
                        <button className='headerBtn btn'>Logout</button>
                    </div>
                  </CSSTransition>
            </div> : null}
        </div>


    );
};
export default Header;