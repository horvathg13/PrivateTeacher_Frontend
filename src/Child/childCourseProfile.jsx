import React, {useContext, useEffect, useState} from 'react';
import ComponentTitle from "../CommonComponents/ComponentTitle/componentTitle";
import {useLoaderData, useParams} from "react-router-dom";
import {IoLanguageSharp} from "react-icons/io5";
import {IoMdTime} from "react-icons/io";
import {FaCalendarDays, FaLocationDot, FaUserGraduate} from "react-icons/fa6";
import {FaDollarSign} from "react-icons/fa";
import {LuCalendarClock} from "react-icons/lu";
import {useTranslation} from "react-i18next";
import {TabMenuContext} from "../Context/UserContext";
import {TbBellSchool} from "react-icons/tb";
import Select from "react-select";
import EventHandler from "../EventHandler/eventhandler";
import AreYouSure from "../CommonComponents/AreYouSure/areyousure";
import ServiceClient from "../ServiceClient";
import i18next from "i18next";

const ChildCourseProfile = () => {
    const [courseProfile]=useLoaderData();

    /*Translation*/
    const {t}=useTranslation("translation",{keyPrefix:"courseProfile"});
    const {t:d}=useTranslation("translation",{keyPrefix:"child"});
    const {t:a}=useTranslation();

    /*Data*/
    const {courseId, childId}=useParams();
    const [terminationDate, setTerminationDate]=useState();
    const [message, setMessage]=useState();
    const [studentCourseId, setStudentCourseId]=useState(courseProfile?.timetableInfo?.map(e=> {
        return e.student_course_id
    }));

    /*AreYouSure*/
    const [areYouSureTransitionProp, setAreYouSureTransitionProp]=useState();
    const [areYouSureName, setAreYouSureName]=useState('');

    /*Event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);
    const [active, setActive]=useState(false);

    /*Methods*/
    const functionControl=(name)=>{
        if(name==='termination'){
           sendTerminationRequest();
        }
        setAreYouSureTransitionProp(false);
    }
    const sendTerminationRequest=()=>{
        if(!terminationDate){
            return setErrors([d('validator.date')])
        }
        if(!message){
            return setErrors([d('validator.message')])
        }
        ServiceClient.terminationCourseRequest(studentCourseId[0],childId,message,terminationDate).then(success=>{
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            },1500)
            setTerminationDate('');
            setMessage('');
        }).catch(error=>{
            setServerError(error);
        })
    }
    return (
        <div>
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
            <div className="title"><h2>{d('course-profile.titles.profile')}</h2></div>
            <div className="course-profile-main childCourseProfileMain">
                <div className="profile-png childCourseProfilePNG"></div>
                <div className="profile-data">
                    <div className="course-titles">
                        <div className="teacher-name">
                            <h3>{courseProfile.teacher.first_name} {courseProfile.teacher.last_name}</h3>
                        </div>
                        <div className="course-name">
                            {courseProfile.course_names_and_langs.length>1 ?
                                <>
                                    <h3> {courseProfile.course_names_and_langs.filter(e=>e.lang === i18next.language).map(j=>j.name)} </h3>
                                </>
                                :
                                <>
                                    <h3> {courseProfile.course_names_and_langs.map(j=>j.name)} </h3>
                                </>
                            }

                        </div>
                    </div>
                    <form className="FlexForm">
                        <div className="form-items">
                            <div className="form-children courseProfile-form-children">
                                <label><TbBellSchool/> {t('form.school-year')}</label>
                                <h4>{courseProfile.start} - {courseProfile.end}</h4>
                            </div>
                            <div className="form-children courseProfile-form-children">
                                <label><IoLanguageSharp/> {t('form.lang')}</label>
                                <h4>{courseProfile.course_names_and_langs.map(i => i.lang).join(', ')}</h4>
                            </div>
                            <div className="form-children courseProfile-form-children">
                                <label><IoMdTime/> {t('form.minutes-lesson')}</label>
                                <h4>{courseProfile.minutes_lesson}</h4>
                            </div>
                            <div className="form-children courseProfile-form-children">
                                <label><FaCalendarDays/> {t('form.minTeachingDay')}</label>
                                <h4>{courseProfile.min_teaching_day}</h4>
                            </div>
                            <div className="form-children courseProfile-form-children">
                                <label><FaDollarSign/> {t('form.course-price-per-lesson')}</label>
                                <h4>{courseProfile.course_price_per_lesson} {courseProfile.currency}</h4>
                            </div>
                            <div className="form-children courseProfile-form-children">
                                <label><LuCalendarClock/> {t('form.payment_period')}</label>
                                <h4>{a(`enums.${courseProfile.payment_period}`)}</h4>
                            </div>
                            <div className="form-children courseProfile-form-children">
                                <label><FaLocationDot/> {t('form.location')}</label>
                                <h4>{courseProfile.location.name}</h4>
                            </div>
                            <div className="form-children courseProfile-form-children">
                                <label><FaLocationDot/> {t('form.address')}</label>
                                <div className="address-container">
                                    <span>{courseProfile.location.country}</span>
                                    <span>{courseProfile.location.city}</span>
                                    <span>{courseProfile.location.street} {courseProfile.location.number}</span>
                                    <span>{courseProfile.location.floor} / {courseProfile.location.door}</span>
                                    <span>{courseProfile.location.zip}</span>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
            <div className="child-course-details">
                <div className="title"><h2>{d('course-profile.titles.timetable')}</h2></div>
                <div className="table-main-container">
                    <table>
                        <thead>
                        <tr>
                            <th>{d('course-profile.timetable.header.day')}</th>
                            <th>{d('course-profile.timetable.header.from')}</th>
                            <th>{d('course-profile.timetable.header.to')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {courseProfile.timetableInfo.map(e =>
                            <tr key={e.id}>
                                <td>{a(`enums.${e.teaching_day}`)}</td>
                                <td>{e.from.slice(0, 5)}</td>
                                <td>{e.to.slice(0, 5)}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="child-course-details">
                <div className="title"><h2>{d('course-profile.titles.termination')}</h2></div>
                <form className="FlexForm">
                    <div className="form-items">
                        <div className="form-children">
                            <label>{d('form.start-date')}</label>
                            <input type="date" required value={terminationDate} onChange={(e) => {
                                setTerminationDate(e.target.value)
                            }}/>
                        </div>
                        <div className="form-children">
                            <label>{d('form.message')}</label>
                            <textarea maxLength={255} required value={message}
                                      onChange={(e) => setMessage(e.target.value)}/>
                        </div>

                    </div>
                    <div className="form-button-container">
                        <button type="submit" className="btn formButton" onClick={(e) => {
                            e.preventDefault();
                            setAreYouSureName('termination');
                            setAreYouSureTransitionProp(true)
                        }}>{d('button.confirm')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChildCourseProfile;