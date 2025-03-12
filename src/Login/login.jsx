import {useContext, useEffect, useRef, useState,} from 'react';
import './login.css';
import { useNavigate } from "react-router-dom";
import ServiceClient from '../ServiceClient'
import { UserContext } from '../Context/UserContext';
import  EventHandler  from '../EventHandler/eventhandler';
import { FaArrowCircleRight } from 'react-icons/fa';
import {useTranslation} from "react-i18next";
import Register from "../Register/register";
import {CSSTransition} from "react-transition-group";

const Login = () => {
    /*Translation*/
    const {t}=useTranslation();
    /*Form fields*/
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*btn handler*/
    const [loader, setLoader]=useState(false);
    const [btndisable, setBtnDisable]=useState(false);

    /*navigate*/
    const navigate = useNavigate();

    /*context*/
    const {setUsername, setRoles, setHasAccessRequests, setHasAccessMessages, setHasChild, hasChild}=useContext(UserContext);

    const nodeRef=useRef(null);
    const [startAnimation, setAnimation]=useState(true)

    /*methods:*/
    const login=(event)=>{
        event.preventDefault();
        setServerError([]);
        setErrors([]);

        if(email.length>0 && password.length>0){
            setLoader(true);
            setBtnDisable(true);

            ServiceClient.login(email,password).then((success)=>{
                setSuccess(true);
                setUsername(success.data.first_name);
                setRoles(success.data.roles);
                if(success.data.menuButtonsPermission){
                    setHasAccessRequests(success.data.menuButtonsPermission[0].hasAccessRequests)
                    setHasAccessMessages(success.data.menuButtonsPermission[0].hasAccessMessages)
                }
                setLoader(false)
                setTimeout(()=>{
                    navigate('/home');
                },1000)
            }).catch((error)=>{
                setServerError(error);
                setLoader(false);
                setBtnDisable(false);
            })
        }
    }
    return (
        <>
           <div className="login-container flex">
            <EventHandler 
            success={success} 
            errors={errors} 
            serverError={serverError} 
            closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>
            <div className="left-container">
                <div className="title">
                    <h1>{t('login.titles.main')}</h1>
                </div>
                <div className="form-container">
                    <form onSubmit={login}>
                        <div className="emailPassword-fields grid">
                            <label>{t('login.form.email')}</label>
                            <input type="email" required onChange={(e)=>{setEmail(e.target.value)}}/>
                            
                            <label>{t('login.form.password')}</label>
                            <input type="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
                            
                        </div>
                        
                        {!loader ? <button type='submit' disabled={btndisable} className={!btndisable ? 'btn' : 'btn disabled'}>{t('login.button.login')}<FaArrowCircleRight className='btn-icon'/></button>:
                        <span className='loader'></span>}
                    </form>
                </div>
                <div className="mobile-nav-to-register flex">
                    <p>{t('login.titles.subtitle')} <span onClick={() => {
                        navigate('/register')
                    }}>{t('login.titles.span')}</span></p>
                </div>
            </div>
            <div className="right-container">
               <div className="text-field">
                    <p>{t('login.titles.subtitle')} <span>{t('login.titles.span')}</span></p>
                    <button className='outline btn' onClick={() => {
                        navigate('/register')
                    }}>{t('login.button.register')}</button>
                </div>
            </div>
        </div>
        </>
    );
};
export default Login;