import EventHandler from '../EventHandler/eventhandler';
import Table from '../CommonComponents/Table/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleRight } from 'react-icons/fa';
import ServiceClient from '../ServiceClient';
import {useTranslation} from "react-i18next";

        
const UserCreate = () => {

    /*Translation*/
    const {t}=useTranslation("translation", {keyPrefix:"users.user"});
    /*Form fields*/
    const [fname, setFname]=useState('');
    const [lname, setLname]=useState('');
    const [email, setEmail]=useState('');
    const [emailError, setEmailError]=useState(false);
    const [password, setPassword]=useState('');
    const [passwordError, setPasswordError]=useState(false);
    const [cpassword, setCPassword]=useState('');
    const [cpasswordError, setCPasswordError]=useState(false);
    
    const [generatedLink, setGeneratedLink]=useState('');
    /*Navigate*/
    const navigate = useNavigate();

    /*btn handle*/
    const [btndisabled, setBtnDisabled]=useState(false);
    const [loader, setLoader]=useState(false);

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);
   
    /*Methods: */
    const createUser=(e)=>{
        e.preventDefault();
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
        ServiceClient.createUser(fname,lname,email,password).then((success)=>{
            setSuccess(true);
            setLoader(false);
            setGeneratedLink(success.link);
            setTimeout(()=>{
                setSuccess(false);
                setBtnDisabled(false);
            },2000)
        }).catch((error)=>{
            setServerError(error);
            setBtnDisabled(false);
            setLoader(false);
        })
    }
    return (
        <>
       <EventHandler
        success={success}
        errors={errors}
        serverError={serverError}
        closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}
       />
        <div>
            {!generatedLink ? 
            <form className="FlexForm" onSubmit={(e)=>createUser(e)}>
                <div className="title"><h2>{t('info.titles.creation')}</h2></div>
                <div className="name-fields flex">
                    <div className="first-name">
                        <label>{t('info.form.fname')}</label>
                        <input type="text" required onChange={(e)=>{setFname(e.target.value)}}/>
                    </div>
                    <div className="last-name">
                        <label>{t('info.form.lname')}</label>
                        <input type="text" required onChange={(e)=>{setLname(e.target.value)}}/>
                    </div>
                </div>

                <div className="emailPassword-fields grid">
                    <label>{t('info.form.email')}</label>
                    <input className={emailError ? 'InputError':'emailInput'} type="email" required onChange={(e)=>{setEmail(e.target.value)}}/>
                    
                    <label>{t('info.form.password')}</label>
                    <input className={passwordError ? 'InputError':'passwordInput'} type="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
                    
                    <label>{t('info.form.cpassword')}</label>
                    <input className={cpasswordError ? 'InputError':'passwordInput'}type="password" required onChange={(e)=>{setCPassword(e.target.value)}}/>
                </div>

                <div className="form-button-container">
                {!loader ?
                    <button type='submit' disabled={btndisabled} className={btndisabled ? 'btn disabled':'btn formButton'}>Generate <FaArrowCircleRight className='btn-icon'/></button> :
                    <span className='loader createUser'></span>
                }
                </div>
            </form>:

            <div className="generatedLink grid">
                <label><h2>Generated Link</h2></label>
                <input type="text" readOnly value={generatedLink}/>
            </div>}
        </div>
        </>
    );
};
export default UserCreate;