import React, {useContext, useEffect} from 'react';
import ComponentTitle from "../CommonComponents/ComponentTitle/componentTitle";
import {useLoaderData, useParams} from "react-router-dom";
import {IoLanguageSharp} from "react-icons/io5";
import {IoMdTime} from "react-icons/io";
import {FaCalendarDays, FaLocationDot, FaUserGraduate} from "react-icons/fa6";
import {FaDollarSign} from "react-icons/fa";
import {LuCalendarClock} from "react-icons/lu";
import {useTranslation} from "react-i18next";
import {TabMenuContext} from "../Context/UserContext";

const CourseProfile = () => {
    const courseProfile=useLoaderData();
    const {t}=useTranslation("translation",{keyPrefix:"courseProfile"});
    const {t:a}=useTranslation();
    const {courseId}=useParams();
    const {setMenuItems}=useContext(TabMenuContext);

    useEffect(()=>{
        courseProfile?.alreadyApply ?
            setMenuItems([
                {
                    "id":"1",
                    "name":a('TabMenu.info'),
                    "url":`/course/profile/${courseId}`,
                    "end":true,
                }
            ]):
            setMenuItems([
                {
                    "id":"1",
                    "name":a('TabMenu.info'),
                    "url":`/course/profile/${courseId}`,
                    "end":true,
                },
                {
                    "id":"2",
                    "name":a('TabMenu.apply'),
                    "url":`/course/profile/${courseId}/course-apply`
                },
            ])
    },[courseProfile,t])
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
                                    <h3> {courseProfile.course_names_and_langs[0].name} </h3>
                                </>
                        </div>
                    </div>
                    <form className="FlexForm">
                        <div className="form-items">
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
                                <h4>{courseProfile.payment_period}</h4>
                            </div>
                            <div className="form-children courseProfile-form-children">
                                <label><FaLocationDot/> {t('form.location')}</label>
                                <h4>{courseProfile.location.name}</h4>
                            </div>
                            <div className="form-children courseProfile-form-children">
                                <label><FaLocationDot/> {t('form.address')}</label>
                                <div className="address-container">
                                    <h4>{courseProfile.location.country}</h4>
                                    <h4>{courseProfile.location.city}</h4>
                                    <h4>{courseProfile.location.street} {courseProfile.location.number}</h4>
                                    <h4>{courseProfile.location.floor} / {courseProfile.location.door}</h4>
                                    <h4>{courseProfile.location.zip}</h4>
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