import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import EventHandler from "../EventHandler/eventhandler";
import {MdEdit} from "react-icons/md";
import ServiceClient from "../ServiceClient";
import {RxUpdate} from "react-icons/rx";
import {ChildInfoContext, ChildInfoContextProvider} from "../Context/UserContext";
import {getChildInfo} from "../dataLoader";
import {VscDebugDisconnect} from "react-icons/vsc";
import AreYouSure from "../CommonComponents/AreYouSure/areyousure";
import Date from "../date";

const ChildInfo = () => {
    /*Translation*/
    const {t}=useTranslation('translation', { keyPrefix: 'child'});

    /*Loader*/
    const {childInfo, setChildInfo} =useContext(ChildInfoContext);

    /*Form fields*/
    const [fname, setFname]=useState(childInfo.firstname);
    const [lname, setLname]=useState(childInfo.lastname);
    const [username, setUsername]=useState(childInfo.username);
    const [birthday, setBirthday]=useState(childInfo.birthday);
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
    const [btndisabled, setBtnDisabled]=useState(true);
    const [loader, setLoader]=useState(false);
    const [disconnectLoader, setDisconnectLoader]=useState(false);

    /*DataSave*/
    const [dataSave, setDataSave]=useState();
    let { childId }=useParams();

    /*AreYouSure*/
    const [areYouSureTransitionProp, setAreYouSureTransitionProp]=useState();
    const [areYouSureName, setAreYouSureName]=useState('');

    /*Methods: */

    const functionControl=(name)=>{
        if(name==='detach'){
            detach();
        }
        setAreYouSureTransitionProp(false);
    }

    const updateChild =(e)=>{
        e.preventDefault()

        setBtnDisabled(true);
        setLoader(true);
        setReadOnlyInfo(true)
        setErrors([]);
        setServerError([]);
        if(password && password !== cpassword){
            setCPasswordError(true);
            setPasswordError(true);
            setErrors([t('form.not-match')]);
            setBtnDisabled(false);
            setLoader(false);
            setReadOnlyInfo(false);
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
            getChildData();
            setReadOnlyInfo(true)
            setBtnDisabled(true)
        }).then(()=>{
            ServiceClient.getChildInfo(childId).then(success=>{
                setChildInfo(success)
            })
        }).catch((error)=>{
            setServerError(error);
            setBtnDisabled(false);
            setLoader(false);
            setReadOnlyInfo(false)
        });
    }
    const getChildData=()=>{
        setReadOnlyInfo(!readOnlyInfo);
        setReadOnlyPsw(!readOnlyPsw);

        ServiceClient.get(`/api/getChildInfo/${childId}`).then((response)=>{
             setFname(response.data.firstname);
             setLname(response.data.lastname);
             setBirthday(response.data.birthday);
             setUsername(response.data.username);
        })
    }

    const detach=()=>{
        ServiceClient.detachChild(childId).then(success=>{
            setSuccess(true);
            setLoader(false);
            setTimeout(()=>{
                setSuccess(false);
            },2000)
            setBtnDisabled(true);
            navigate("/child");
        }).catch((error)=>{
            setServerError(error);
            setBtnDisabled(false);
            setLoader(false);
            setReadOnlyInfo(false)
        });
    }

    useEffect(()=>{
        if(readOnlyInfo && childInfo){
            setFname(childInfo.firstname)
            setLname(childInfo.lastname)
            setUsername(childInfo.username)
            setBirthday(childInfo.birthday)
            setPassword('')
            setCPassword('')
        }
    },[readOnlyInfo])
    return (
        <>
            <EventHandler
                success={success}
                errors={errors}
                serverError={serverError}
                closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}
            />
            <AreYouSure
                name={areYouSureName}
                answer={(name) => functionControl(name)}
                transitionProp={areYouSureTransitionProp}
            />
            <div>

                <form className='FlexForm' onSubmit={updateChild}>
                    <div className="user-container info">
                        <div className="form-title"><h2>{t('title.info')} <MdEdit className='icon' onClick={()=> {
                            setReadOnlyInfo(!readOnlyInfo);
                            setBtnDisabled(!btndisabled)
                        }}/></h2></div>
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
                                    max={Date.yesterday()}
                                    readOnly={readOnlyInfo}
                                    required
                                    onChange={(e)=>{setBirthday(e.target.value)}}/>
                            </div>
                        </div>
                    </div>
                    <div className="user-container passwords">
                        <div className="form-title"><h2>{t('title.changePassword')}</h2></div>
                        <div className="fields flex">
                            <div className="psw field">
                                <label>{t('form.password')}</label>
                                <input
                                    className={passwordError ? 'InputError' : 'passwordInput'}
                                    type="password"
                                    readOnly={readOnlyInfo}
                                    required
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); } } />

                            </div>
                            <div className="cpsw field">
                                <label>{t('form.c-password')}</label>
                                <input
                                    className={cpasswordError ? 'InputError' : 'passwordInput'}
                                    type="password"
                                    readOnly={readOnlyInfo}
                                    required
                                    value={cpassword}
                                    onChange={(e) => { setCPassword(e.target.value); } } />
                            </div>
                        </div>
                    </div>

                    <div className="form-button-container ">
                        {!loader ?

                            <button type='submit' onClick={(e)=>updateChild(e)} disabled={btndisabled} className={btndisabled ? 'btn formBtnDisabled' : 'btn action formButton flex'}><RxUpdate className='user-submit-icon'/>{t('button.update')} </button>
                            :<span className='loader'></span>
                        }
                        {!disconnectLoader ?

                            <button type="button" onClick={()=>[setAreYouSureName("detach"), setAreYouSureTransitionProp(true)]} disabled={btndisabled} className={btndisabled ? 'btn formBtnDisabled' : 'btn action formButton flex'}><VscDebugDisconnect  className='user-submit-icon'/>{t('button.disconnect')} </button>
                            :<span className='loader'></span>
                        }
                    </div>
                </form>

            </div>


        </>
    );
};

export default ChildInfo;