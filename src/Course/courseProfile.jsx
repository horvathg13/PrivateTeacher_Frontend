import React, {useContext, useEffect} from 'react';
import ComponentTitle from "../CommonComponents/ComponentTitle/componentTitle";
import {useLoaderData, useParams} from "react-router-dom";
import {IoLanguageSharp} from "react-icons/io5";
import {IoMdTime} from "react-icons/io";
import {FaCalendarDays, FaLocationDot, FaUserGraduate} from "react-icons/fa6";
import {FaDollarSign} from "react-icons/fa";
import {LuCalendarClock} from "react-icons/lu";
import {useTranslation} from "react-i18next";
import {CourseInfoContext, TabMenuContext} from "../Context/UserContext";
import {TbBellSchool} from "react-icons/tb";
import i18next from "i18next";

const CourseProfile = () => {
    const courseProfile=useContext(CourseInfoContext);
    const {t}=useTranslation("translation",{keyPrefix:"courseProfile"});
    const {t:a}=useTranslation();
    const {courseId}=useParams();
    const {setMenuItems}=useContext(TabMenuContext);

    return (
        <div>
            <div className="course-profile-main">
                <div className="profile-png"></div>
                <div className="profile-data">
                    <div className="course-titles">
                        <div className="teacher-name">
                            <h3>{courseProfile.teacher.first_name} {courseProfile.teacher.last_name}</h3>
                        </div>
                        <div className="course-name">
                                <>
                                    <h3> {courseProfile.course_names_and_langs.filter(e=>e.lang === i18next.language).length>0 ?
                                        courseProfile.course_names_and_langs.filter(e=>e.lang === i18next.language).map(e=>e.name)
                                    : courseProfile.course_names_and_langs.map(e=>e.name)} </h3>
                                </>
                        </div>
                    </div>
                    <form className="FlexForm">
                        <div className="form-items">
                            <div className="form-children courseProfile-form-children">
                                <label><TbBellSchool /> {t('form.school-year')}</label>
                                <h4>{courseProfile.start} - {courseProfile.end}</h4>
                            </div>
                            <div className="form-children courseProfile-form-children">
                                <label><IoLanguageSharp/> {t('form.lang')}</label>
                                <h4>{courseProfile.course_names_and_langs.map(i => a(`enums.${i.lang}`)).join(', ')}</h4>
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
        </div>
    );
};

export default CourseProfile;