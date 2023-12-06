import { useEffect, useLayoutEffect, useState } from 'react';
import "./selectedUser.css";
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowCircleRight } from "react-icons/fa";
import EventHandler from '../../EventHandler/eventhandler';
import {FaBan, FaUsers ,FaUserPlus} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import {RxUpdate} from 'react-icons/rx';
import {MdEdit} from 'react-icons/md';
import AreYouSure from '../../CommonComponents/AreYouSure/areyousure'
import Select from '../../CommonComponents/Select/select';
import ServiceClient from '../../ServiceClient';

        
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

    /*ReadOnly */
    const[readOnlyInfo, setReadOnlyInfo]=useState(true);
    const[readOnlyPsw, setReadOnlyPsw]=useState(true);
    const [rolesDisabled, setRolesDisabled]=useState(true);

    /*Roles */
    const [roles, setRoles]=useState([]);

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);
    const navigate = useNavigate();

    /*btn handle*/
    const [btndisabled, setBtnDisabled]=useState(false);
    const [loader, setLoader]=useState(false);

    /*PopUp Control*/
    const [showAreYouSure, setShowAreYouSure]=useState(false);
    const [AreYouSureName, setAreYouSureName]=useState('');
    const [transitionProp, setTransitionsProp]=useState(false);

    /*DataSave*/
    const [dataSave, setDataSave]=useState();
    let { userId }=useParams();

    /*methods: */
    const functionControl=(name)=>{
        if(name === 'ban'){
            banUser(userId);
            setTransitionsProp(false);
        }else{
            setShowAreYouSure(false);
            setTransitionsProp(false);
        }
    }
    const updateUser =(e)=>{
        e.preventDefault()

        //Update user request sending.
    }
    
    const banUserActionButton=()=>{
        setAreYouSureName('ban');
        setTransitionsProp(true);
        setShowAreYouSure(true);
    }

    const banUser=(userId)=>{
        console.log(userId);
    }

    /*useLayoutEffect(()=>{
        let url='http://127.0.0.1:8000/api/getRoles';

        let dataPost={}
        dataPost.userId=userId

        ServiceClient.post(url,dataPost).then((response)=>{
            if(response.status===200){
               
                setRoles(response.data);
                
            }
        }).catch((error)=>{
            setServerError(error);
        })
    },[])*/

    useLayoutEffect(()=>{
        //Státuszok lekérdezése és átadása a Select komponensnek
    },[]);
    return (
        <>
        <EventHandler 
            success={success} 
            errors={errors} 
            serverError={serverError} 
            closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>
        
        <AreYouSure
        name={AreYouSureName}
        answer={functionControl}
        transitionProp={transitionProp}/>
        <div className="selectedUser-main">
            <div className="userDetails">
                <div className="action-container flex">
                    {/*<button className='btn action flex' onClick={()=>banUserActionButton()}><FaBan className='icon'/>Ban </button>*/}

                </div>
                <form className='flex'>
                    <div className="user-container info">
                        <div className="form-title"><h2>Info <MdEdit className='icon' onClick={()=>setReadOnlyInfo(!readOnlyInfo)}/></h2></div>
                        <div className="fields flex">
                            <div className="first-name field">
                                <label>First Name</label>
                                <input 
                                type="text" 
                                readOnly={readOnlyInfo} 
                                required value={fname} 
                                onChange={(e)=>{setFname(e.target.value)}}/>
                            </div>
                            <div className="last-name field">
                                <label>Last Name</label>
                                <input 
                                type="text" 
                                readOnly={readOnlyInfo} 
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
                                readOnly={readOnlyInfo} 
                                required 
                                onChange={(e)=>{setEmail(e.target.value)}}/>
                            </div>
                            <div className="status field">
                                <label>Status</label>
                                <Select 
                                options={[
                                { label: 'Option 1', value: 'option1' },
                                { label: 'Option 2', value: 'option2' },
                                { label: 'Option 3', value: 'option3' },]}
                                onSelect={(option)=>setStatus(option.value)}
                                InitialValue={status}
                                disabled={readOnlyInfo}/>
                            </div>
                            
                        </div>
                    </div>
                    <div className="user-container passwords">
                        <div className="form-title"><h2>Password Reset <MdEdit className='icon' onClick={()=>setReadOnlyPsw(!readOnlyPsw)}/></h2></div>
                        <div className="fields flex">
                            <div className="psw field">
                                <label>Password</label>
                                <input 
                                className={passwordError ? 'InputError' : 'passwordInput'} 
                                type="password" 
                                readOnly={readOnlyPsw} 
                                required 
                                onChange={(e) => { setPassword(e.target.value); } } />

                            </div>
                            <div className="cpsw field">
                                <label>Confirm Password</label>
                                <input 
                                className={cpasswordError ? 'InputError' : 'passwordInput'} 
                                type="password" 
                                readOnly={readOnlyPsw} 
                                required 
                                onChange={(e) => { setCPassword(e.target.value); } } />
                            </div>
                        </div>
                    </div>
                    {/*<div className="user-container roles">
                        <div className="form-title"><h2>Roles <MdEdit className='icon' onClick={()=>setRolesDisabled(!rolesDisabled)}/></h2></div>
                        <div className="fields flex">
                            {
                                roles ? roles.map((e,i)=>
                                    <div className="roles-container flex" key={i}>
                                        <input id={i} type='checkbox' disabled={rolesDisabled}/>
                                        <label htmlFor={i}>{e.name}</label>
                                    </div>
                                ):null
                            }
                        </div>
                    </div>*/}
                    
                    <div className="btn-container">
                        {!loader ?
                        
                        <button type='submit' disabled={btndisabled} className={btndisabled ? 'btn disabled' : 'btn action flex'}><RxUpdate className='icon' />Update </button>
                        :<span className='loader'></span>
                        
                        }
                    </div>
                   
                </form>
               
            </div>
        </div>

        </>
    );
};
export default SelectedUser;