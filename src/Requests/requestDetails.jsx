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
import {MdPersonRemove} from "react-icons/md";
import {IoExit} from "react-icons/io5";
import TeachindDaySelect from "../CommonComponents/TeachingDay/teachindDaySelect";

const RequestDetails = () => {
    /*Translation*/
    const {t}=useTranslation("translation",{keyPrefix:"requestDetails"});
    const {t: a}=useTranslation();

    /*Data*/
    const [requestDetails,teachingDays]=useLoaderData();
    const {requestId}=useParams();
    const {roles}=useContext(UserContext);
    const [isTeacher, setIsTeacher]=useState();
    const [message, setMessage]=useState();
    const [startDate, setStartDate]=useState();
    const [teachingDayDetails, setTeachingDayDetails]=useState([]);
    /*Event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);
    const [active, setActive]=useState(false);
    /*Loader */
    const [acceptLoader, setAcceptLoader]=useState(false);
    const [rejectLoader, setRejectLoader]=useState(false);
    const [removeLoader, setRemoveLoader]=useState(false);

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
        if(name==='remove'){
            removeStudent();
        }
        setAreYouSureTransitionProp(false);
    }
    const accept=()=>{
        setAcceptLoader(true)
        setBtnDisabled(true)

        setErrors([]);
        setServerError([]);

        ServiceClient.acceptCourseRequest(requestId,message,startDate, teachingDayDetails).then((success)=>{
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

        setErrors([]);
        setServerError([]);

        ServiceClient.rejectCourseRequest(requestId).then((success)=>{
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

    const removeStudent=()=>{
        setRemoveLoader(true);

        ServiceClient.removeStudentFromCourse(requestId, requestDetails?.child_info?.id, message).then((success)=>{
            setRemoveLoader(false);
            navigation("/requests")
        }).catch(error=>{
            setServerError(error);
            setRemoveLoader(false);
        });
    }

    return (
        <>
        <EventHandler
            success={success}
            errors={errors}
            serverError={serverError}
            closeErrorMessage={(data) => {
                if (data === true) {
                    setErrors([])
                }
            }}
        />
        <AreYouSure
            name={areYouSureName}
            answer={(name) => functionControl(name)}
            transitionProp={areYouSureTransitionProp}
        />
        <div>
            <form className="FlexForm">
                <div className="form-title distance"><h2>{t('form.titles.main')}</h2>
                    <h2>{a(`enums.${requestDetails.status}`)}</h2></div>
                {requestDetails.teacher_justification ?
                    <textarea className="justification-container" readOnly value={requestDetails.teacher_justification}
                              placeholder={t('form.justification-placeholder')}/> : null}
                <div className="form-items">
                    {requestDetails.parent_info ?
                        <>
                            <div className="form-title"><h3>{t('form.titles.parentInfo')}</h3></div>
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
                                    <div className="form-title"><h3>{t('form.titles.parentInfo')}</h3></div>
                                    <div className="form-collapse">
                                        <div className="form-children">
                                            <label>{t('form.name')}</label>
                                            <input type="text" readOnly
                                                   value={requestDetails.parent_info.first_name.concat(" ", requestDetails.parent_info.last_name)}/>
                                        </div>
                                        <div className="form-children">
                                            <label>{t('form.email')}</label>
                                            <input type="email" readOnly value={requestDetails.parent_info.email}/>
                                        </div>
                                    </div>
                                </>
                            }</>
                        : null
                    }
                    <div className="form-title"><h3>{t('form.titles.childInfo')}</h3></div>
                    <div className="form-collapse">
                        <div className="form-children">
                            <label>{t('form.name')}</label>
                            <input type="text" readOnly
                                   value={requestDetails.child_info.first_name.concat(" ", requestDetails.child_info.last_name)}/>
                        </div>
                        <div className="form-children">
                            <label>{t('form.birthday')}</label>
                            <input type="date" readOnly value={requestDetails.child_info.birthday}/>
                        </div>
                    </div>
                    {!requestDetails.terminationDetails ?
                        <>
                            <div className="form-title"><h3>{t('form.titles.requestInfo')}</h3></div>
                            <div className="form-children">
                                <label>{t('form.courseName')}</label>
                                <input type="text" readOnly value={requestDetails.course_names_and_langs[0].name}/>
                            </div>
                            <div className="form-children">
                                <label>{t('form.language')}</label>
                                <input type="text" readOnly value={requestDetails.course_names_and_langs[0].lang}/>
                            </div>

                            <div className="form-children">
                                <label>{t('form.numberOfLesson')}</label>
                                <input type="text" readOnly value={requestDetails.number_of_lessons}/>
                            </div>
                            <div className="form-children">
                                <label>{t('form.start')}</label>
                                <input type="date" readOnly value={requestDetails.requested_start_date}/>
                            </div>

                            <div className="form-children">
                                <label>{t('form.notice')}</label>
                                <textarea readOnly value={requestDetails.notice}/>
                            </div>
                        </>
                        :
                        <>
                            <div className="form-title"><h3>{t('form.titles.terminationInfo')}</h3></div>
                            <div className="form-children">
                                <label>{t('form.courseName')}</label>
                                <input type="text" readOnly value={requestDetails.course_names_and_langs[0].name}/>
                            </div>
                            <div className="form-children">
                                <label>{t('form.start')}</label>
                                <input type="date" readOnly value={requestDetails.start_date}/>
                            </div>
                            <div className="form-children">
                                <label>{t('form.end')}</label>
                                <input type="date" readOnly value={requestDetails.end_date}/>
                            </div>
                            <div className="form-children">
                                <label>{t('form.termination_start')}</label>
                                <input type="date" readOnly value={requestDetails.terminationDetails.from}/>
                            </div>
                            <div className="form-children">
                                <label>{t('form.notice')}</label>
                                <textarea readOnly value={requestDetails.terminationDetails.request.message}/>
                            </div>
                        </>
                    }
                    {isTeacher && requestDetails.status === 'UNDER_REVIEW' ?
                        <>
                            <div className="form-title"><h2>{t('form.titles.answer')}</h2></div>
                            <div className="form-children">
                                <label>{t('form.start')}</label>
                                <input type="date" onChange={(e) => setStartDate(e.target.value)}/>
                            </div>
                            {!requestDetails.terminationDetails &&
                                <>
                                <div className="form-children">
                                    <label>{t('form.teaching_day')}</label>
                                    <TeachindDaySelect
                                        disabled={false}
                                        teachingDays={teachingDays}
                                        teachingDaysEmit={(data) => setTeachingDayDetails(data)}
                                    />
                                </div>
                                <div className="form-children">
                                    <label>{t('form.justification')}</label>
                                    <textarea required onChange={(e) => {
                                        setMessage(e.target.value)
                                    }}/>
                                </div>
                                </>
                            }
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
                        :null
                    }
                 </div>
            </form>
        </div>
        </>
    );
};

export default RequestDetails;