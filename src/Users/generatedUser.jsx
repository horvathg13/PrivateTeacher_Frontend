import { useContext, useState } from "react";
import EventHandler from "../EventHandler/eventhandler";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import ServiceClient from "../ServiceClient";
import { UserContext } from "../Context/UserContext";
import {useTranslation} from "react-i18next";
        
const GeneratedUser = () => {

    const userData = useLoaderData();

    /*Translation*/
    const {t}=useTranslation();

    /*Data*/
    const {token}=useParams();

    /*Form fields*/
    const [password, setPassword]=useState('');
    const [passwordError, setPasswordError]=useState(false);
    const [cpassword, setCPassword]=useState('');
    const [cpasswordError, setCPasswordError]=useState(false);
    
    /*Navigate*/
    const navigate = useNavigate();

    /*Context*/
    const {setUsername}=useContext(UserContext);

    /*btn handle*/
    const [btndisabled, setBtnDisabled]=useState(false);
    const [loader, setLoader]=useState(false);

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Methods: */

    const resetPassword=(e)=>{
        e.preventDefault();
        setLoader(true);
        setBtnDisabled(true);

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
        ServiceClient.resetPassword(password, token).then(()=>{
            setSuccess(true);
            ServiceClient.login(userData.email, password).then((success)=>{
                setSuccess(true);
                setUsername(success.data.first_name);
                setLoader(false)
                setTimeout(()=>{
                    navigate('/home');
                },1000)
            }).catch((error)=>{
                setServerError(error);
                setLoader(false);
                setBtnDisabled(false);
            })
        }).catch((error)=>{
            setServerError(error);
            setBtnDisabled(false);
            setLoader(false);
        });
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
                    <h1>{t('home.greeting')} {userData.firstname}</h1>
                    <h3>{t('home.setNewPassword')}</h3>
                </div>
                
                <div className="form-container">
                    <form onSubmit={(e)=>resetPassword(e)}>
                        <div className="emailPassword-fields grid">
                            <label>{t('register.form.password')}</label>
                            <input type="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
                            
                            <label>{t('register.form.cpassword')}</label>
                            <input type="password" required onChange={(e)=>{setCPassword(e.target.value)}}/>
                        </div>
                        
                        {!loader ? <button type='submit' disabled={btndisabled} className={!btndisabled ? 'btn' : 'btn disabled'}>{t('login.button.login')}<FaArrowCircleRight className='btn-icon'/></button>:
                        <span className='loader'></span>}
                    </form>
                </div>
            </div>
            <div className="right-container"></div>
                  
        </div>
            
       
    );
};
export default GeneratedUser;