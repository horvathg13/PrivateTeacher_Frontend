import { useEffect, useState } from 'react';
import './selectedUser.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowCircleRight } from "react-icons/fa";
import EventHandler from '../EventHandler/eventhandler';
import {FaBan, FaUsers ,FaUserPlus} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import {RxUpdate} from 'react-icons/rx';
        
const SelectedUser = ({userData}) => {
    /*Form fields*/
    const [fname, setFname]=useState(userData.firstname);
    const [lname, setLname]=useState(userData.lastname);
    const [email, setEmail]=useState(userData.email);
    const [status, setStatus]=useState(userData.status);
    const [emailError, setEmailError]=useState(false);

    const[showPasswordFields, setShowPasswordField]=useState(false);
    const [password, setPassword]=useState('');
    const [passwordError, setPasswordError]=useState(false);
    const [cpassword, setCPassword]=useState('');
    const [cpasswordError, setCPasswordError]=useState(false);

    const[readOnly, setReadOnly]=useState(true);

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);
    const navigate = useNavigate();

    /*btn handle*/
    const [btndisabled, setBtnDisabled]=useState(false);
    const [loader, setLoader]=useState(false);

    /*methods: */

    const updateUser =()=>{}
    const resetPassword =()=>{}
    const banUser=()=>{}
    
    // Are you sure modal is missing!
    return (
        <>
        <EventHandler 
            success={success} 
            errors={errors} 
            serverError={serverError} 
            closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>
        <div className="selectedUser-main">
            <div className="userDetails">
                <div className="action-container flex">
                    <button className='btn action flex' onClick={()=>setReadOnly(!readOnly)}><RxUpdate className='icon'/>Update </button>
                    <button className='btn action flex'onClick={()=>setShowPasswordField(!showPasswordFields)} ><RiLockPasswordFill className='icon'/>Password Reset </button>
                    <button className='btn action flex'><FaBan className='icon'/>Ban </button>

                </div>
                <form>
                    <div className="fields flex">
                        <div className="first-name field">
                            <label>First Name</label>
                            <input 
                            type="text" 
                            readOnly={readOnly} 
                            required value={fname} 
                            onChange={(e)=>{setFname(e.target.value)}}/>
                        </div>
                        <div className="last-name field">
                            <label>Last Name</label>
                            <input 
                            type="text" 
                            readOnly={readOnly} 
                            required 
                            value={lname} 
                            onChange={(e)=>{setLname(e.target.value)}}/>
                        </div>
                        
                        <div className="email-field field">
                            <label>Email</label>
                            <input 
                            className={emailError ? 'InputError':'emailInput'} 
                            type="email" 
                            value={email} 
                            readOnly={readOnly} 
                            required 
                            onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                        <div className="status field">
                            <label>Status</label>
                            <input 
                            type="text" 
                            readOnly={readOnly} 
                            value={status} 
                            required 
                            onChange={(e)=>{setStatus(e.target.value)}}/>

                        </div>

                        { showPasswordFields ? 
                            <>
                            <div className="psw field">
                                    <label>Password</label>
                                    <input 
                                    className={passwordError ? 'InputError' : 'passwordInput'} 
                                    type="password" 
                                    readOnly={readOnly} 
                                    required 
                                    onChange={(e) => { setPassword(e.target.value); } } />

                                </div><div className="cpsw field">
                                        <label>Confirm Password</label>
                                        <input 
                                        className={cpasswordError ? 'InputError' : 'passwordInput'} 
                                        type="password" 
                                        readOnly={readOnly} 
                                        required 
                                        onChange={(e) => { setCPassword(e.target.value); } } />
                                    </div>
                            </>
                        :null}

                    </div>
                    
                    {!loader ?
                        <button type='submit' disabled={btndisabled} className={btndisabled ? 'btn disabled':'btn'}>Send <FaArrowCircleRight className='btn-icon'/></button> :
                        <span className='loader'></span>
                    }
                </form>
            </div>
        </div>
        </>
    );
};
export default SelectedUser;