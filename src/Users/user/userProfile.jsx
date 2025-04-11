import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {FaArrowCircleRight, FaUser} from "react-icons/fa";
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

        
const UserProfile = () => {
    /*Translation*/
    const {t}=useTranslation('translation', { keyPrefix: 'users.user'});

    /*Loader*/
    const userProfileData=useLoaderData();

    /*Form fields*/
    const [fname, setFname]=useState(userProfileData?.user?.first_name);
    const [lname, setLname]=useState(userProfileData?.user?.last_name);
    const [email, setEmail]=useState(userProfileData?.user?.email);
    const [emailError, setEmailError]=useState(false);
    const [userId, setUserId]=useState(userProfileData?.user?.id);
    const [password, setPassword]=useState('');
    const [passwordError, setPasswordError]=useState(false);
    const [cpassword, setCPassword]=useState('');
    const [cpasswordError, setCPasswordError]=useState(false);

    /*ReadOnly */
    const[readOnlyInfo, setReadOnlyInfo]=useState(false);

    /*Event handle*/
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


    /*Methods:*/
    const updateUser =(e)=>{
        e.preventDefault()

        setBtnDisabled(true);
        setLoader(true);
        setErrors("");
        setServerError("");

        if(password !== cpassword){
            setCPasswordError(true);
            setPasswordError(true);
            setErrors([t("validator.samePsw")]);
            setBtnDisabled(false);
            setLoader(false);
            return
        }

        let userInfo ={
            "first_name":fname,
            "last_name":lname,
            "email":email,
            "status":null
        }
        ServiceClient.updateUser(userId, userInfo,password,cpassword).then((success)=>{
            setSuccess(true);
            setLoader(false);
            setCPassword("");
            setPassword("");
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

    return (
        <>
            <EventHandler 
                success={success} 
                errors={errors} 
                serverError={serverError} 
                closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}
            />
            <div>
                <div className="user-profile-form-container">
                    <form className='FlexForm' onSubmit={updateUser}>
                        <div className="form-items">
                            <div className="form-title">
                                <h2>{t('info.titles.profile')}</h2>
                            </div>
                            <div className="form-children">
                                <label>{t('info.form.fname')}</label>
                                <input
                                    type="text"
                                    readOnly={readOnlyInfo}
                                    value={fname}
                                    onChange={(e) => {
                                        setFname(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="form-children">
                                <label>{t('info.form.lname')}</label>
                                <input
                                    type="text"
                                    readOnly={readOnlyInfo}
                                    value={lname}
                                    onChange={(e) => {
                                        setLname(e.target.value)
                                    }}/>
                            </div>

                            <div className="form-children">
                                <label>{t('info.form.email')}</label>
                                <input
                                    className={emailError ? 'InputError' : 'emailInput'}
                                    type="email"
                                    value={email}
                                    readOnly={readOnlyInfo}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}/>
                            </div>
                            <div className="form-children">
                                <label>{t('info.form.new-psw')}</label>
                                <input
                                    className={passwordError ? 'InputError' : 'passwordInput'}
                                    type="password"
                                    readOnly={readOnlyInfo}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}/>

                            </div>
                            <div className="form-children">
                                <label>{t('info.form.cpassword')}</label>
                                <input
                                    className={cpasswordError ? 'InputError' : 'passwordInput'}
                                    type="password"
                                    readOnly={readOnlyInfo}
                                    value={cpassword}
                                    onChange={(e) => {
                                        setCPassword(e.target.value);
                                    }}/>
                            </div>
                        </div>
                        <div className="userDetails btn-container">
                            {!loader ?
                                <button type='submit' disabled={btndisabled}
                                        className={btndisabled ? 'btn disabled' : 'btn action formButton flex'}><RxUpdate
                                    className='user-submit-icon'/>{t('info.button.update')} </button>
                                : <span className='loader userDetailsLoader'></span>
                            }
                        </div>
                    </form>
                </div>
            </div>
            </>
            );
            };
            export default UserProfile;