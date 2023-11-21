import { useState } from 'react';
import './register.css';
import { FaArrowCircleRight } from "react-icons/fa";
import ErrorMessage from '../ErrorHandle/ErrorMessage/errorMessage';     
const Register = () => {

    const [fname, setFname]=useState('');
    const [lname, setLname]=useState('');
    const [email, setEmail]=useState('');
    const [emailError, setEmailError]=useState(false);
    const [password, setPassword]=useState('');
    const [passwordError, setPasswordError]=useState(false);
    const [cpassword, setCPassword]=useState('');
    const [cpasswordError, setCPasswordError]=useState(false);
    const [errors, setErrors]=useState([]);

    const sendRegister=(event)=>{
        event.preventDefault();
        if(errors.length){
            setErrors([]);
            
        }
        if(password != cpassword){
            setCPasswordError(true);
            setPasswordError(true);
            setErrors(['Passwords does not match']);
        }else if(passwordError==true & cpasswordError==true){
            setCPasswordError(false);
            setPasswordError(false);
        }
        //api call, error handle component, success component
    }


    return (
        <div className="reg-container flex">
            {errors.length ? <ErrorMessage messageArray={errors}/>:null}
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
                        
                        <button type='submit' className='btn'>Send <FaArrowCircleRight className='btn-icon'/></button>
                    </form>
                </div>
            </div>            
        </div>
            
    );
};
export default Register;