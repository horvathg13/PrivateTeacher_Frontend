import { useState, useRef, useEffect } from 'react';
import './register.css';
import { FaArrowCircleRight } from "react-icons/fa";
import ErrorMessage from '../ErrorHandle/ErrorMessage/errorMessage';     
import Success from '../SuccessPopup/success';
import ServiceClient from '../ServiceClient';
import ErrorHandle from '../ErrorHandle/errorHandle';
import { useNavigate } from 'react-router-dom';
import EventHandler from '../EventHandler/eventhandler';

const Register = () => {
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
    /*methods*/
    const sendRegister=(event)=>{
        event.preventDefault();
        setBtnDisabled(true);
        setLoader(true);

        if(errors.length || serverError.length){
            setErrors([]);
            setServerError([]);
        }
        if(password != cpassword){
            setCPasswordError(true);
            setPasswordError(true);
            setErrors(['Passwords does not match']);
            setBtnDisabled(false);
            setLoader(false);
            return
        }
        if(passwordError==true & cpasswordError==true){
            setCPasswordError(false);
            setPasswordError(false);
        }
        let url='http://127.0.0.1:8000/api/register';
        let dataPost={};
        dataPost.fname=fname;
        dataPost.lname=lname;
        dataPost.email=email;
        dataPost.psw=password;

        ServiceClient.post(url,dataPost).then((response)=>{
            if(response.status===200){
                setSuccess(true);
                setLoader(false);
                setTimeout(()=>{
                    setSuccess(false);
                    navigate("/");
                },2000)
                
            }
        }).catch((error)=>{
            setServerError(error);
            setBtnDisabled(false);
            setLoader(false);
        })
    }

    return (
        <div className="reg-container flex">
            <EventHandler 
            success={success} 
            errors={errors} 
            serverError={serverError} 
            closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>
            
            <div className="left-container"></div>
            
            <div className="right-container">
                <div className="title">
                    <h2>Registration</h2>
                </div>
                <div className="form-container">
                    <form onSubmit={sendRegister}>
                        <div className="name-fields flex">
                            <div className="first-name">
                                <label>First Name</label>
                                <input type="text" required onChange={(e)=>{setFname(e.target.value)}}/>
                            </div>
                            <div className="last-name">
                                <label>Last Name</label>
                                <input type="text" required onChange={(e)=>{setLname(e.target.value)}}/>
                            </div>
                            
                        </div>
                        <div className="emailPassword-fields grid">
                            <label>Email</label>
                            <input className={emailError ? 'InputError':'emailInput'} type="email" required onChange={(e)=>{setEmail(e.target.value)}}/>
                            
                            <label>Password</label>
                            <input className={passwordError ? 'InputError':'passwordInput'} type="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
                            
                            <label>Confirm Password</label>
                            <input className={cpasswordError ? 'InputError':'passwordInput'}type="password" required onChange={(e)=>{setCPassword(e.target.value)}}/>
                        </div>
                        
                        {!loader ?
                            <button type='submit' disabled={btndisabled} className={btndisabled ? 'btn disabled':'btn registerFormSubmit'}>Send <FaArrowCircleRight className='btn-icon'/></button> :
                            <span className='loader'></span>
                        }
                    </form>
                </div>
            </div>            
        </div>
            
    );
};
export default Register;