import { useState, useRef, useEffect } from 'react';
import './register.css';
import { FaArrowCircleRight } from "react-icons/fa";
import ErrorMessage from '../ErrorHandle/ErrorMessage/errorMessage';     
import Success from '../SuccessPopup/success';
import ServiceClient from '../ServiceClient';
import ErrorHandle from '../ErrorHandle/errorHandle';
import { useNavigate } from 'react-router-dom';
import EventHandler from '../EventHandler/eventhandler';
import {useTranslation} from "react-i18next";
import {FaArrowLeftLong} from "react-icons/fa6";
import {CSSTransition} from "react-transition-group";
import "../transitions.css"

const Register = () => {
    /*Translation*/
    const {t}=useTranslation();
    /*Form fields*/
    const [fname, setFname]=useState('');
    const [lname, setLname]=useState('');
    const [email, setEmail]=useState('');
    const [emailError, setEmailError]=useState(false);
    const [password, setPassword]=useState('');
    const [passwordError, setPasswordError]=useState(false);
    const [cpassword, setCPassword]=useState('');
    const [cpasswordError, setCPasswordError]=useState(false);

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);
    const navigate = useNavigate();

    /*btn handle*/
    const [btndisabled, setBtnDisabled]=useState(false);
    const [loader, setLoader]=useState(false);

    /*const nodeRef=useRef(null);
    const [startAnimation, setAnimation]=useState(true)*/
    /*methods*/
    const sendRegister=(event)=>{
        event.preventDefault();
        setBtnDisabled(true);
        setLoader(true);

        setErrors([]);
        setServerError([]);

        if(password !== cpassword){
            setCPasswordError(true);
            setPasswordError(true);
            setErrors([t('validator.samePsw')]);
            setBtnDisabled(false);
            setLoader(false);
            return
        }
        if(passwordError===true && cpasswordError===true){
            setCPasswordError(false);
            setPasswordError(false);
        }

        ServiceClient.register(fname,lname,email,password).then(()=>{
            setSuccess(true);
            setLoader(false);
            setTimeout(()=>{
                setSuccess(false);
                navigate("/");
            },2000)
        }).catch((error)=>{
            setServerError(error);
            setBtnDisabled(false);
            setLoader(false);
        })
    }
    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate("/home")
        }
    }, []);
    return (
        <div className="reg-container flex">
            <EventHandler 
            success={success} 
            errors={errors} 
            serverError={serverError} 
            closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>
            <div className="left-container">
                <FaArrowLeftLong className="backToLoginIcon" onClick={()=>navigate("/")}/>
            </div>

            <div className="right-container" >
                <div className="title">
                    <h2>{t('register.titles.main')}</h2>
                </div>
                <div className="form-container">
                    <form onSubmit={sendRegister}>
                        <div className="name-fields flex">
                            <div className="first-name">
                                <label>{t('register.form.fname')}</label>
                                <input type="text" required onChange={(e)=>{setFname(e.target.value)}}/>
                            </div>
                            <div className="last-name">
                                <label>{t('register.form.lname')}</label>
                                <input type="text" required onChange={(e)=>{setLname(e.target.value)}}/>
                            </div>
                            
                        </div>
                        <div className="emailPassword-fields grid">
                            <label>{t('register.form.email')}</label>
                            <input className={emailError ? 'InputError':'emailInput'} type="email" required onChange={(e)=>{setEmail(e.target.value)}}/>
                            
                            <label>{t('register.form.password')}</label>
                            <input className={passwordError ? 'InputError':'passwordInput'} type="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
                            
                            <label>{t('register.form.cpassword')}</label>
                            <input className={cpasswordError ? 'InputError':'passwordInput'}type="password" required onChange={(e)=>{setCPassword(e.target.value)}}/>
                        </div>
                        
                        {!loader ?
                            <button type='submit' disabled={btndisabled} className={btndisabled ? 'btn registerFormSubmit disabled':'btn registerFormSubmit'}>{t('register.button.register')} <FaArrowCircleRight className='btn-icon'/></button> :
                            <span className='loader register'></span>
                        }
                    </form>
                </div>
            </div>
        </div>
            
    );
};
export default Register;