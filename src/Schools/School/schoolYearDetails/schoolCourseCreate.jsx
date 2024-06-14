import { useContext, useEffect, useLayoutEffect, useState } from "react";
import EventHandler from "../../../EventHandler/eventhandler";
import { Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import AreYouSure from "../../../CommonComponents/AreYouSure/areyousure";
import ServiceClient from "../../../ServiceClient";
import { GrUpdate } from "react-icons/gr";
import {FaArrowCircleRight, FaExclamationTriangle, FaTrashAlt} from "react-icons/fa";
import { TabMenuContext, schoolYearDetailsContext } from "../../../Context/UserContext";
import LabelSelector from "../../../CommonComponents/Label/labelSelect";
import {useTranslation} from "react-i18next";
import Select from "react-select";
import ReactFlagsSelect from "react-flags-select";
import {IoClose} from "react-icons/io5";

const SchoolCourseCreate = () => {
    /*Loader */
    const [courseStatuses, schoolLocations, paymentPeriods, schoolTeachers] = useLoaderData();
    /*Translation*/
    const {t}=useTranslation("translation", {keyPrefix:'schools.school.year.courses'});
    /*datas */
    const [courseName, setCourseName]=useState();
    const [courseSubject, setCourseSubject]=useState();
    const [studentLimit, setStudentLimit]=useState();
    const [minutesLesson, setMinutesLesson]=useState();
    const [minTeachingDay, setMinTeachingDay]=useState();
    const [doubleTime, setDoubleTime]=useState();
    const [coursePricePerLesson, setcoursePricePerLesson]=useState();
    const [status, setStatus]=useState();
    const [labels, setLabels]=useState();
    const [location, setLocation]=useState();
    const [languages, setLanguage]=useState([]);
    const [teacher, setTeacher]=useState();
    const [paymentPeriod, setPaymentPeriod]=useState();
    
    let { schoolId, schoolYearId }=useParams();

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Loader */
    const [loader, setLoader]=useState(false);
    const [formLoader, setFormLoader]=useState(false);
    const [deleteLoader, setDeleteLoader]=useState(true);

    /*Navigation */
    const navigation=useNavigate();

    /*button control */
    const [btndisabled, setBtnDisabled]=useState(false);
    const [readOnly, setReadOnly]=useState(false);

    /*Methods */
    const removeFlag=(l)=>{
        let newArray = languages.filter(f=>f!==l)
        setLanguage(newArray);
    }
    const handleLanguageSelect=(code)=>{
        let find = languages.find(f=>f===code);
        if(!find){
            setLanguage(prevState => ([...languages, code]))
        }
    }
   
    const CreateSchoolCourse=(e)=>{
        
        e.preventDefault();
        setLoader(true);
        setBtnDisabled(true);
        ServiceClient.createSchoolCourse(schoolYearId, schoolId, courseName, courseSubject, studentLimit, minutesLesson, minTeachingDay,doubleTime,coursePricePerLesson, labels, status, null, languages, teacher, paymentPeriod).then((success)=>{
            setLoader(false);
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            },2000)
            setBtnDisabled(false);
            navigation(`/school/${schoolId}/school-year/${schoolYearId}/courses`);
        }).catch((error)=>{
            setServerError(error);
            setLoader(false);
            setBtnDisabled(false);
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
        <div className="courseCreate">
            <div className="title"><h2>School Course Creation</h2></div>
            {(schoolLocations?.message && schoolTeachers?.select) && <div className="component-error-message"><FaExclamationTriangle className='icon'/><h2>{t('')}</h2></div>}
            {schoolLocations?.select && <form onSubmit={(e)=>CreateSchoolCourse(e)} className="FlexForm">
                    
                    <div className="form-items flex">

                        <div className="form-children">
                            <label>{t('form.name')}</label>
                            <input type="text" 
                            required 
                            onChange={(e)=>{setCourseName(e.target.value)}}
                            value={courseName}
                            readOnly={readOnly}/>
                        </div>    

                        <div className="form-children">
                            <label>{t('form.subject')}</label>
                            <input type="text" 
                            required 
                            onChange={(e)=>{setCourseSubject(e.target.value)}}
                            value={courseSubject}
                            readOnly={readOnly}/>
                        </div>
                        
                    
                        <div className="form-children">
                            <label>{t('form.student-limit')}</label>
                            <input type="text"
                            required  
                            onChange={(e)=>{setStudentLimit(e.target.value)}}
                            value={studentLimit}
                            readOnly={readOnly}/>
                        </div>
                    
                        <div className="form-children">
                            <label>{t('form.minutes-lesson')}</label>
                            <input
                            type="text" 
                            required  
                            onChange={(e)=>{setMinutesLesson(e.target.value)}}
                            value={minutesLesson}
                            readOnly={readOnly}/>
                        </div>

                        <div className="form-children">
                            <label>{t('form.minTeachingDay')}</label>
                            <input
                            type="text" 
                            required  
                            onChange={(e)=>{setMinTeachingDay(e.target.value)}}
                            value={minTeachingDay}
                            readOnly={readOnly}/>
                        </div>

                        <div className="form-children">
                            <label>{t('form.doubleTime')}</label>
                            <input
                            type="checkbox" 
                            onChange={(e)=>{setDoubleTime(e.target.checked)}}
                            value={doubleTime}
                            disabled={readOnly}/>
                        </div>

                        <div className="form-children">
                            <label>{t('form.course-price-per-lesson')}</label>
                            <input
                            type="text" 
                            required  
                            onChange={(e)=>{setcoursePricePerLesson(e.target.value)}}
                            value={coursePricePerLesson}
                            readOnly={readOnly}/>
                        </div>
                        <div className="form-children">
                            <label>{t('form.labels')}</label>
                            <LabelSelector 
                            labelEmit={(data)=>setLabels(data)}
                            disabled={readOnly}
                            popUpTitle={"Add labels"}/>
                        </div>
                        <div className="form-children">
                            <label>{t('form.status')}</label>
                            <Select
                                options={courseStatuses}
                                onChange={(selected)=>{setStatus(selected.value)}}
                                isDisabled={readOnly}
                                isSearchable={false}
                                className="select-component65"
                            />
                        </div>
                        <div className="form-children">
                            <label>{t('form.location')}</label>
                            <Select
                                options={schoolLocations?.select}
                                onChange={(selected)=>{setLocation(selected.value)}}
                                isDisabled={readOnly}
                                isSearchable={true}
                                className="select-component65"
                            />
                        </div>
                        <div className="form-children">
                            <label>{t('form.lang')}</label>
                            <div className="multi-select-react-flags">
                                <div className="selected-languages">
                                    {languages?.map(l=>
                                        <div className="flag">
                                            {l}<IoClose className="remove-flag" onClick={()=>removeFlag(l)}/>
                                        </div>
                                    )}
                                </div>
                                <ReactFlagsSelect
                                    placeholder={t('select')}
                                    onSelect={(code) => handleLanguageSelect(code)}
                                    searchable
                                    disabled={readOnly}
                                    fullWidth={true}
                                />
                            </div>
                            {false &&<Select
                                options={schoolLocations?.select}
                                onChange={(selected)=>{setLanguage(selected.value)}}
                                isDisabled={readOnly}
                                isSearchable={true}
                                className="select-component65"
                            />}
                        </div>
                        <div className="form-children">
                            <label>{t('form.teacher')}</label>
                            <Select
                                options={schoolTeachers?.select}
                                onChange={(selected)=>{setTeacher(selected.value)}}
                                isDisabled={readOnly}
                                isSearchable={true}
                                className="select-component65"
                            />
                        </div>
                        <div className="form-children">
                            <label>{t('form.payment-period')}</label>
                            <Select
                                options={paymentPeriods}
                                onChange={(selected)=>{setPaymentPeriod(selected.value)}}
                                isDisabled={readOnly}
                                isSearchable={true}
                                className="select-component65"
                            />
                        </div>
                    </div>
                    <div className="form-button-container">
                    {!loader ?
                        <button 
                        type='submit' 
                        disabled={btndisabled} 
                        className={readOnly ? 'formBtnDisabled':'btn formButton' }>
                            {t('button.create')} <FaArrowCircleRight  className='btn-icon'/>
                        </button>:
                        <span className='loader schoolDetails'></span>
                    }
                    </div>
                </form>}
            </div>
        </>
    );
};
export default SchoolCourseCreate;