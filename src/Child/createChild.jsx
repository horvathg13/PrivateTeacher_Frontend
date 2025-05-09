import EventHandler from '../EventHandler/eventhandler';
import Table from '../CommonComponents/Table/table';
import {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleRight } from 'react-icons/fa';
import ServiceClient from '../ServiceClient';
import {useTranslation} from "react-i18next";
import Date from "../date";
import {UserContext} from "../Context/UserContext";

const CreateChild = () => {
    /*Translation*/
    const {t}=useTranslation('translation', {keyPrefix:"child"})

    /*Context*/
    const {setHasChild, setHasAccessRequests, setHasAccessMessages}=useContext(UserContext);

    /*Form fields*/
    const [fname, setFname]=useState('');
    const [lname, setLname]=useState('');
    const [username, setUsername]=useState('');
    const [birthday, setBirthday]=useState();
    const [password, setPassword]=useState('');
    const [passwordError, setPasswordError]=useState(false);
    const [cpassword, setCPassword]=useState('');
    const [cpasswordError, setCPasswordError]=useState(false);
    
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
    const createChild=(e)=>{
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

        ServiceClient.createChild(fname, lname, username, birthday, password).then(()=>{
            formClear();
            setSuccess(true);
            setLoader(false);

        }).then(()=>{
            ServiceClient.getUserData().then((success)=>{
                setHasAccessMessages(success.menuButtonsPermission[0].hasAccessMessages);
                setHasAccessRequests(success.menuButtonsPermission[0].hasAccessRequests);
                setHasChild(success.hasChild)
            })
        }).then(()=>{
            navigate('/child');
        }).catch(error=>{
            setServerError(error);
            setBtnDisabled(false);
            setLoader(false);
        })
    }

    const formClear=()=>{
        setFname('');
        setLname('');
        setUsername('');
        setBirthday('');
        setPassword('');
        setCPassword('');
    }
    return (
    <>
       <EventHandler 
        success={success} 
        errors={errors} 
        serverError={serverError} 
        closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>
            
        <form className="FlexForm" onSubmit={(e)=>createChild(e)}>
            <div className="title"><h2>{t('title.create')}</h2></div>
            <div className="form-items">
                <div className="form-collapse">
                    <div className="form-children flexColumnItems">
                            <label>{t('form.first-name')}</label>
                            <input type="text" required onChange={(e)=>{setFname(e.target.value)}} value={fname}/>
                    </div>
                    <div className="form-children flexColumnItems">
                            <label>{t('form.last-name')}</label>
                            <input type="text" required onChange={(e)=>{setLname(e.target.value)}} value={lname}/>
                    </div>
                </div>
                <div className="form-collapse">
                    <div className="form-children flexColumnItems">
                            <label>{t('form.birthday')}</label>
                            <input type="date" max={Date.yesterday()} required onChange={(e)=>{setBirthday(e.target.value)}} value={birthday}/>
                    </div>
                    <div className="form-children flexColumnItems">
                            <label>{t('form.username')}</label>
                            <input type="text" required onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
                    </div>
                </div>
                <div className="form-collapse">
                    <div className="form-children flexColumnItems">
                            <label>{t('form.password')}</label>
                            <input className={passwordError ? 'InputError':'passwordInput'} type="password" required onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                    </div>
                    <div className="form-children flexColumnItems">
                            <label>{t('form.c-password')}</label>
                            <input className={cpasswordError ? 'InputError':'passwordInput'}type="password" required onChange={(e)=>{setCPassword(e.target.value)}} value={cpassword}/>
                    </div>
                </div>
            </div>
            <div className="form-button-container">
                {!loader ?
                    <button type='submit' disabled={btndisabled} className={btndisabled ? 'btn formButton disabled':'btn formButton'}>{t('button.create')} <FaArrowCircleRight className='btn-icon'/></button> :
                    <span className='loader createUser'></span>
                }
            </div>
        </form>
    </>
    );
};
export default CreateChild;