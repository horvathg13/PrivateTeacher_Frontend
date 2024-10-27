import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import EventHandler from "../EventHandler/eventhandler";
import {MdEdit} from "react-icons/md";
import ServiceClient from "../ServiceClient";
import {RxUpdate} from "react-icons/rx";
import {ChildInfoContext} from "../Context/UserContext";
import {getChildInfo} from "../dataLoader";

const ChildInfo = () => {
    /*Translation*/
    const {t}=useTranslation('translation', { keyPrefix: 'child'});

    /*Loader*/
    const childInfo =useContext(ChildInfoContext);
    /*Form fields*/
    const [fname, setFname]=useState(childInfo.firstname);
    const [lname, setLname]=useState(childInfo.lastname);
    const [username, setUsername]=useState(childInfo.username);
    const [birthday, setBirthday]=useState(childInfo.birthday);


    const[showPasswordFields, setShowPasswordField]=useState(false);
    const [password, setPassword]=useState('');
    const [passwordError, setPasswordError]=useState(false);
    const [cpassword, setCPassword]=useState('');
    const [cpasswordError, setCPasswordError]=useState(false);

    /*ReadOnly */
    const[readOnlyInfo, setReadOnlyInfo]=useState(true);
    const[readOnlyPsw, setReadOnlyPsw]=useState(true);
    const [rolesDisabled, setRolesDisabled]=useState(true);

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
    let { childId }=useParams();

    /*methods: */

    const updateChild =(e)=>{
        e.preventDefault()

        setBtnDisabled(true);
        setLoader(true);

        if(password && password !== cpassword){
            setCPasswordError(true);
            setPasswordError(true);
            setErrors([t('form.not-match')]);
            setBtnDisabled(false);
            setLoader(false);
            return
        }

        let userInfo ={
            "first_name":fname,
            "last_name":lname,
            "username":username,
            "birthday":birthday
        }
        ServiceClient.updateChild(childId, userInfo,password,cpassword).then((success)=>{
            setSuccess(true);
            setLoader(false);
            setCPassword(null);
            setPassword(null);
            setTimeout(()=>{
                setSuccess(false);
            },2000)
            setBtnDisabled(false);
            getChildData();
        }).catch((error)=>{
            setServerError(error);
            setBtnDisabled(false);
            setLoader(false);
        });
    }
    const getChildData=()=>{
        setReadOnlyInfo(!readOnlyInfo);
        setReadOnlyPsw(!readOnlyPsw);

        ServiceClient.get(`http://127.0.0.1:8000/api/getChildInfo/${childId}`).then((response)=>{
             setFname(response.data.firstname);
             setLname(response.data.lastname);
             setBirthday(response.data.birthday);
             setUsername(response.data.username);
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

                <form className='FlexForm' onSubmit={updateChild}>
                    <div className="user-container info">
                        <div className="form-title"><h2>{t('title.info')} <MdEdit className='icon' onClick={()=>setReadOnlyInfo(!readOnlyInfo)}/></h2></div>
                        <div className="fields flex">
                            <div className="first-name field">
                                <label>{t('form.first-name')}</label>
                                <input
                                    type="text"
                                    readOnly={readOnlyInfo}
                                    required
                                    value={fname}
                                    onChange={(e)=>{setFname(e.target.value)}}
                                />
                            </div>
                            <div className="last-name field">
                                <label>{t('form.last-name')}</label>
                                <input
                                    type="text"
                                    readOnly={readOnlyInfo}
                                    required
                                    value={lname}
                                    onChange={(e)=>{setLname(e.target.value)}}/>
                            </div>
                            <div className="email-field field">
                                <label>{t('form.username')}</label>
                                <input
                                    type="text"
                                    value={username}
                                    readOnly={readOnlyInfo}
                                    required
                                    onChange={(e)=>{setUsername(e.target.value)}}/>
                            </div>
                            <div className="email-field field">
                                <label>{t('form.birthday')}</label>
                                <input
                                    type="date"
                                    value={birthday}
                                    readOnly={readOnlyInfo}
                                    required
                                    onChange={(e)=>{setBirthday(e.target.value)}}/>
                            </div>

                        </div>
                    </div>
                    <div className="user-container passwords">
                        <div className="form-title"><h2>{t('title.changePassword')}<MdEdit className='icon' onClick={()=>setReadOnlyPsw(!readOnlyPsw)}/></h2></div>
                        <div className="fields flex">
                            <div className="psw field">
                                <label>{t('form.password')}</label>
                                <input
                                    className={passwordError ? 'InputError' : 'passwordInput'}
                                    type="password"
                                    readOnly={readOnlyPsw}
                                    required
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); } } />

                            </div>
                            <div className="cpsw field">
                                <label>{t('form.c-password')}</label>
                                <input
                                    className={cpasswordError ? 'InputError' : 'passwordInput'}
                                    type="password"
                                    readOnly={readOnlyPsw}
                                    required
                                    value={cpassword}
                                    onChange={(e) => { setCPassword(e.target.value); } } />
                            </div>
                        </div>
                    </div>
                    <div className="userDetails btn-container">
                        {!loader ?

                            <button type='submit' onClick={(e)=>updateChild(e)} disabled={btndisabled} className={btndisabled ? 'btn disabled' : 'btn action formButton flex'}><RxUpdate className='user-submit-icon'/>{t('button.update')} </button>
                            :<span className='loader userDetailsLoader'></span>

                        }
                    </div>
                </form>

            </div>


        </>
    );
};

export default ChildInfo;