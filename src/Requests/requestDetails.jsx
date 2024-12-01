import React, {useContext, useEffect, useState} from 'react';
import EventHandler from "../EventHandler/eventhandler";
import {useTranslation} from "react-i18next";
import {FaArrowCircleRight, FaCheck} from "react-icons/fa";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import {IoMdClose} from "react-icons/io";
import ServiceClient from "../ServiceClient";
import AreYouSure from "../CommonComponents/AreYouSure/areyousure";
import {UserContext} from "../Context/UserContext";
import Notification from "../CommonComponents/Notifications/notification";

const RequestDetails = () => {
    /*Translation*/
    const {t}=useTranslation("translation",{keyPrefix:"requestDetails"});

    /*Data*/
    const requestDetails=useLoaderData();
    const requestId=useParams();
    const {roles}=useContext(UserContext);
    const [isTeacher, setIsTeacher]=useState();
    const [message, setMessage]=useState();

    /*Event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);
    const [active, setActive]=useState(false);
    /*Loader */
    const [acceptLoader, setAcceptLoader]=useState(false);
    const [rejectLoader, setRejectLoader]=useState(false);

    /*Navigation */
    const navigation=useNavigate();

    /*button control */
    const [btndisabled, setBtnDisabled]=useState(false);
    const [readOnly, setReadOnly]=useState(false);

    /*AreYouSure*/
    const [areYouSureTransitionProp, setAreYouSureTransitionProp]=useState();
    const [areYouSureName, setAreYouSureName]=useState('');

    /*Methods*/

    useEffect(() => {
        if(roles.some(i=>i==='Teacher')){
            setIsTeacher(true);
        };
    }, [roles]);
    const functionControl=(name)=>{
        if(name==='accept'){
            accept();
        }
        if(name==='reject'){
            reject();
        }
        setAreYouSureTransitionProp(false);
    }
    const accept=()=>{
        setAcceptLoader(true)
        setBtnDisabled(true)

        ServiceClient.acceptCourseRequest(requestId,message).then((success)=>{
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            },2000)
            navigation('/requests');
        }).catch((error)=>{
            setServerError(error);
            setBtnDisabled(false);
            setAcceptLoader(false);
        })
    }
    const reject=()=>{
        setRejectLoader(true)
        setBtnDisabled(true)

        ServiceClient.rejectCourseRequest(requestId,message).then((success)=>{
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            },2000);
            setRejectLoader(false);
            navigation('/requests');
        }).catch((error)=>{
            setServerError(error);
            setBtnDisabled(false);
            setRejectLoader(false)
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
            <AreYouSure
                name={areYouSureName}
                answer={(name) => functionControl(name)}
                transitionProp={areYouSureTransitionProp}
            />
            <Notification
                active={active}
            />
        <div>
            <form className="FlexForm">
                <div className="form-title distance"><h2>{t('form.titles.main')}</h2><h2>{requestDetails.status}</h2></div>
                <textarea className="justification-container" readOnly value={requestDetails.teacher_justification} placeholder={t('form.justification-placeholder')}/>
                <div className="form-items">
                    {requestDetails.parent_info ?
                        <>
                            <div className="form-title"><h2>{t('form.titles.parentInfo')}</h2></div>
                            {requestDetails.parent_info.length ? requestDetails.parent_info.map(i =>
                                    <div class="form-collapse">
                                        <div className="form-children">
                                            <label>{t('form.name')}</label>
                                            <input type="text" readOnly value={i.first_name.concat(" ", i.last_name)}/>
                                        </div>
                                        <div className="form-children">
                                            <label>{t('form.email')}</label>
                                            <input type="email" readOnly value={i.email}/>
                                        </div>
                                    </div>
                                ) :
                                <>
                                    <div className="form-title"><h2>{t('form.titles.parentInfo')}</h2></div>
                                    <div className="form-collapse">
                                        <div className="form-children">
                                            <label>{t('form.name')}</label>
                                            <input type="text" readOnly value={requestDetails.parent_info.first_name.concat(" ", requestDetails.parent_info.last_name)}/>
                                        </div>
                                        <div className="form-children">
                                            <label>{t('form.email')}</label>
                                            <input type="email" readOnly value={requestDetails.parent_info.email}/>
                                        </div>
                                    </div>
                                </>
                            }</>
                        : null}

                    <div className="form-title"><h2>{t('form.titles.childInfo')}</h2></div>
                    <div className="form-collapse">
                        <div className="form-children">
                            <label>{t('form.name')}</label>
                            <input type="text" readOnly value={requestDetails.child_info.first_name.concat(" ", requestDetails.child_info.last_name)}/>
                        </div>
                        <div className="form-children">
                            <label>{t('form.birthday')}</label>
                            <input type="date" readOnly value={requestDetails.child_info.birthday}/>
                        </div>
                    </div>
                    <div className="form-title"><h2>{t('form.titles.requestInfo')}</h2></div>
                    <div className="form-children">
                        <label>{t('form.courseName')}</label>
                        <input type="text" readOnly value={requestDetails.course_names_and_langs[0].name}/>
                    </div>
                    <div className="form-children">
                        <label>{t('form.numberOfLesson')}</label>
                        <input type="text" readOnly value={requestDetails.number_of_lessons}/>
                    </div>
                    <div className="form-children">
                        <label>{t('form.notice')}</label>
                        <textarea readOnly value={requestDetails.notice}/>
                    </div>
                    {isTeacher ?
                        <>
                            <div className="form-title"><h2>{t('form.titles.answer')}</h2></div>
                            <div className="form-children">
                                <label>{t('form.justification')}</label>
                                <textarea required onChange={(e)=>{setMessage(e.target.value)} }/>
                            </div>
                            <div className="form-button-container">
                                {!rejectLoader ?
                                    <button
                                        type='button'
                                        disabled={btndisabled}
                                        onClick={(e) => [
                                            setAreYouSureName('reject'),
                                            setAreYouSureTransitionProp(true)
                                        ]}
                                        className={readOnly ? 'formBtnDisabled' : 'btn formButton'}>
                                        {t('form.buttons.reject')} <IoMdClose className='btn-icon'/>
                                    </button> :
                                    <span className='loader schoolDetails'></span>
                                }
                                {!acceptLoader ?
                                    <button
                                        type='button'
                                        disabled={btndisabled}
                                        onClick={(e) => [
                                            setAreYouSureName('accept'),
                                            setAreYouSureTransitionProp(true)
                                        ]}
                                        className={readOnly ? 'formBtnDisabled' : 'btn formButton'}>
                                        {t('form.buttons.accept')} <FaCheck className='btn-icon'/>
                                    </button> :
                                    <span className='loader schoolDetails'></span>
                                }
                            </div>
                        </>
                        : null}
                </div>
            </form>

        </div>
        </>
    );
};

export default RequestDetails;