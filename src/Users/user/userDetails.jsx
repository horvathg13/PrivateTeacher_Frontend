import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowCircleRight } from "react-icons/fa";
import EventHandler from '../../EventHandler/eventhandler';
import {FaBan, FaUsers ,FaUserPlus} from 'react-icons/fa';
import {FaScaleUnbalanced} from 'react-icons/fa6';
import {RiLockPasswordFill} from 'react-icons/ri';
import {RxUpdate} from 'react-icons/rx';
import {MdEdit} from 'react-icons/md';
import AreYouSure from '../../CommonComponents/AreYouSure/areyousure'
//import Select from '../../CommonComponents/Select/select';
import ServiceClient from '../../ServiceClient';
import { useLoaderData } from 'react-router-dom';
import ComponentTitle from '../../CommonComponents/ComponentTitle/componentTitle';
import SideMenu from '../../CommonComponents/SideMenu/sidemenu';
import TabMenu from '../../CommonComponents/TabMenu/tabMenu';
import { userInfoContext } from '../../Context/UserContext';
import Select from "react-select";
import {useTranslation} from "react-i18next";

        
const UserDetails = () => {
    /*Translation*/
    const {t}=useTranslation('translation', { keyPrefix: 'users.user'});

    /*Context*/
    const userData = useContext(userInfoContext);

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

    /*Statuses*/
    const [statuses, setStatuses]=useState();

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
    /*TabMenu */
    const tabData=[
        {
            "id":"1",
            "name":"Info",
            "url":`/users/${userId}`
        },
        {
            "id":"2",
            "name":"Roles",
            "url":`/users/${userId}/roles`
        },
        {
            "id":"3",
            "name":"Logs",
            "url":`/users/${userId}/logs`
        }
        
    ]
    /*methods: */
    /*const functionControl=(name)=>{
        if(name === 'ban'){
            updateUser();
            setTransitionsProp(false);
        }else{
            setShowAreYouSure(false);
            setTransitionsProp(false);
        }
    }*/
    const updateUser =(e)=>{
        e.preventDefault()

        setBtnDisabled(true);
        setLoader(true);

        if(password != cpassword){
            setCPasswordError(true);
            setPasswordError(true);
            setErrors(['Passwords does not match']);
            setBtnDisabled(false);
            setLoader(false);
            return
        }

        let userInfo ={
            "first_name":fname,
            "last_name":lname,
            "email":email,
            "status":status,
        }
        ServiceClient.updateUser(userId, userInfo,password,cpassword).then((success)=>{
            setSuccess(true);
            setLoader(false);
            setCPassword(null);
            setPassword(null);
            setTimeout(()=>{
                setSuccess(false);
            },2000)
            setBtnDisabled(false);
        }).catch((error)=>{
            setServerError(error);
            setBtnDisabled(false);
            setLoader(false);
        });
    }
    useEffect(()=>{
        ServiceClient.getUserStatuses().then((success)=>{
            setStatuses(success)
        }).catch((error)=>{
            setServerError(error);
        });
    },[]);

    return (
        <>
            <EventHandler 
                success={success} 
                errors={errors} 
                serverError={serverError} 
                closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}
            />
            <div>
                
                <form className='FlexForm' onSubmit={updateUser}>
                    <div className="user-container info">
                        <div className="form-title"><h2>{t('info.titles.main')} <MdEdit className='icon' onClick={()=>setReadOnlyInfo(!readOnlyInfo)}/></h2></div>
                        <div className="fields flex">
                            <div className="first-name field">
                                <label>{t('info.form.fname')}</label>
                                <input 
                                type="text" 
                                readOnly={readOnlyInfo} 
                                required 
                                value={fname} 
                                onChange={(e)=>{setFname(e.target.value)}}
                                />
                            </div>
                            <div className="last-name field">
                                <label>{t('info.form.lname')}</label>
                                <input 
                                type="text" 
                                readOnly={readOnlyInfo} 
                                required 
                                value={lname} 
                                onChange={(e)=>{setLname(e.target.value)}}/>
                            </div>
                            
                            <div className="email-field field">
                                <label>{t('info.form.email')}</label>
                                <input 
                                className={emailError ? 'InputError':'emailInput'} 
                                type="email" 
                                value={email} 
                                readOnly={readOnlyInfo} 
                                required 
                                onChange={(e)=>{setEmail(e.target.value)}}/>
                            </div>
                            <div className="status field">
                                <label>{t('info.form.status')}</label>
                                <Select
                                    defaultValue={{value: userData.status, label:userData.status}}
                                    options={statuses}
                                    onChange={(selected)=>{setStatus(selected.value)}}
                                    isDisabled={readOnlyInfo}
                                    isSearchable={false}
                                />
                            </div>
                            
                        </div>
                    </div>
                    <div className="user-container passwords">
                        <div className="form-title"><h2>{t('info.titles.changePassword')}<MdEdit className='icon' onClick={()=>setReadOnlyPsw(!readOnlyPsw)}/></h2></div>
                        <div className="fields flex">
                            <div className="psw field">
                                <label>{t('info.form.password')}</label>
                                <input 
                                className={passwordError ? 'InputError' : 'passwordInput'} 
                                type="password" 
                                readOnly={readOnlyPsw} 
                                required 
                                onChange={(e) => { setPassword(e.target.value); } } />

                            </div>
                            <div className="cpsw field">
                                <label>{t('info.form.cpassword')}</label>
                                <input 
                                className={cpasswordError ? 'InputError' : 'passwordInput'} 
                                type="password" 
                                readOnly={readOnlyPsw} 
                                required 
                                onChange={(e) => { setCPassword(e.target.value); } } />
                            </div>
                        </div>
                    </div>
                    <div className="userDetails btn-container">
                        {!loader ?
                        
                        <button type='submit' disabled={btndisabled} className={btndisabled ? 'btn disabled' : 'btn action formButton flex'}><RxUpdate className='user-submit-icon'/>{t('info.button.update')} </button>
                        :<span className='loader userDetailsLoader'></span>
                        
                        }
                    </div>
                </form>
            
            </div>
            

        </>
    );
};
export default UserDetails;