import { useContext, useState } from 'react';
import './login.css';
import { useNavigate } from "react-router-dom";
import ServiceClient from '../ServiceClient'
import { UserContext } from '../Context/UserContext';
import  EventHandler  from '../EventHandler/eventhandler';
import { FaArrowCircleRight } from 'react-icons/fa';
import {useTranslation} from "react-i18next";

const Login = () => {
    const {t,i18n}=useTranslation();

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
    const {setUsername}=useContext(UserContext);

    /*methods:*/
    const login=(event)=>{
        event.preventDefault();
        setLoader(true);
        setBtnDisable(true);

        if(email.length>0 && password.length>0){
            let url='http://127.0.0.1:8000/api/login';
            let dataPost={};
            dataPost.email=email;
            dataPost.psw=password;

            ServiceClient.post(url,dataPost).then((response)=>{
                if(response.status===200){
                    setSuccess(true);
                    localStorage.setItem('token',response.data.data.token);
                    setUsername(response.data.data.first_name);
                    setLoader(false)
                    setTimeout(()=>{

                        navigate('/home');
                    },1000)
                }
            }).catch((error)=>{
                setServerError(error);
                setLoader(false);
                setBtnDisable(false);
            })
        }
    }

    
    return (
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
                        
                        {!loader ? <button type='submit' disabled={btndisable} className={!btndisable ? 'btn' : 'btn disabled'}>{t('login.buttons.login')}<FaArrowCircleRight className='btn-icon'/></button>:
                        <span className='loader'></span>}
                    </form>
                </div>
                <div className="mobile-nav-to-register flex">
                    <p>If you have no account, please <span>register</span>.</p>
                </div>
            </div>
            <div className="right-container">
                <div className="text-field">
                    <p>{t('login.titles.redirect')}</p>
                    <button className='outline btn' onClick={()=>{navigate('/register')}}>{t('login.buttons.register')}</button>

                </div>
            </div>            
        </div>
    );
};
export default Login;