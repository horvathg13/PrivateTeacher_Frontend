import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ServiceClient from '../ServiceClient'
import { UserContext } from '../Context/UserContext';
import  EventHandler  from '../EventHandler/eventhandler';
import { FaArrowCircleRight } from 'react-icons/fa';
import {useTranslation} from "react-i18next";

const ChildConnect = () => {
    /*Translation*/
    const {t}=useTranslation('translation', {keyPrefix:"child"})
    /*Form fields*/
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [readOnly, setReadOnly]=useState(false);
    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*btn handler*/
    const [loader, setLoader]=useState(false);
    const [btndisable, setBtnDisable]=useState(false);

    /*navigate*/
    const navigate = useNavigate();

    /*methods:*/
    const connect=(event)=>{
        event.preventDefault();
        setLoader(true);
        setBtnDisable(true);
        setReadOnly(true);
        setErrors([]);
        setServerError([]);
        if(username.length>0 && password.length>0){
            ServiceClient.connectToChild(username,password).then((success)=>{
                setSuccess(true);
                setLoader(false);
                setReadOnly(false);
                setTimeout(()=>{
                    navigate('/child');
                },1000)
            }).catch((error)=>{
                setServerError(error);
                setLoader(false);
                setBtnDisable(false);
                setReadOnly(false);
            })
           
        }
    }

    
    return (

        <>
        <EventHandler
        success={success}
        errors={errors}
        serverError={serverError}
        closeErrorMessage={(data) => { if (data === true) { setErrors([]); } } } />
        <div className="login-container">
            <div className="title">
                <h1>{t('title.connect')}</h1>
            </div>
            <div className="form-container connectChild">
                <form onSubmit={connect}>
                    <div className="emailPassword-fields grid">
                        <label>Username</label>
                        <input 
                        type="text" 
                        required 
                        onChange={(e) => { setUsername(e.target.value); } } 
                        readOnly={readOnly}/>

                        <label>Password</label>
                        <input 
                        type="password" 
                        required 
                        onChange={(e) => { setPassword(e.target.value); } } 
                        readOnly={readOnly}/>

                    </div>

                    {!loader ? <button type='submit' disabled={btndisable} className={!btndisable ? 'btn formButton connectButton' : 'btn formButton connectButton disabled'}>{t('title.connect')} <FaArrowCircleRight className='btn-icon' /></button> :
                        <span className='loader connectButtonLoader'></span>}
                </form>
            </div>
        </div>
        </>
    );
};
export default ChildConnect;