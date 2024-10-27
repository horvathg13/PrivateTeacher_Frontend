import { useContext, useEffect, useLayoutEffect, useState } from "react";
import EventHandler from "../EventHandler/eventhandler";
import { Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import AreYouSure from "../CommonComponents/AreYouSure/areyousure";
import ServiceClient from "../ServiceClient";
import { GrUpdate } from "react-icons/gr";
import {FaArrowCircleRight, FaExclamationTriangle, FaMinus, FaTrashAlt} from "react-icons/fa";
import { TabMenuContext, schoolYearDetailsContext } from "../Context/UserContext";
import TabMenu from "../CommonComponents/TabMenu/tabMenu";
import Select from "react-select";
import LabelSelector from "../CommonComponents/Label/labelSelect";
import {useTranslation} from "react-i18next";
import ReactFlagsSelect from "react-flags-select";
import course from "./course";
        
const CourseInfo = () => {

    /*Loader */
    const [courseInfo, courseStatuses, schoolLocations, paymentPeriods, currencies] = useLoaderData();

    /*Data */
    const [courseName, setCourseName]=useState(courseInfo.name);
    const [studentLimit, setStudentLimit]=useState(courseInfo.student_limit);
    const [minutesLesson, setMinutesLesson]=useState(courseInfo.minutes_lesson);
    const [minTeachingDay, setMinTeachingDay]=useState(courseInfo.min_teaching_day);
    const [coursePricePerLesson, setcoursePricePerLesson]=useState(courseInfo.course_price_per_lesson);
    const [labels, setLabels]=useState();
    const [location, setLocation]=useState({value:courseInfo.location.id, label:courseInfo.location.name});
    const [paymentPeriod, setPaymentPeriod]=useState(courseInfo.paymentPeriod.value);
    console.log(courseInfo.paymentPeriod.label);
    const [currency, setCurrency]=useState(courseInfo.currency)
    const [courseStatus, setCourseStatus]=useState();
    
    const [readOnly, setReadOnly]=useState(true);
    const [selectedRow, setSelectedRow]=useState();
    let {courseId }=useParams();
    const [initialValueForLabels, setInitialVeluesForLabels]=useState();

    /*Popup control */
    const [title, setTitle]=useState();
    const [updatePopup, setUpdatePopup]=useState();
    const [transitionProp, setTransitionProp]=useState(false);
    const [showAreYouSure, setShowAreYouSure]=useState(false);
    const [AreYouSureName, setAreYouSureName]=useState('');
    const [areYouSureTransitionProp, setAreYouSureTransitionProp]=useState(false);

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Loader */
    const [loader, setLoader]=useState(false);
    const [formLoader, setFormLoader]=useState(false);
    const [deleteLoader, setDeleteLoader]=useState(false);

    /*Navigation */
    const navigation=useNavigate();

    /*button control */
    const [btndisabled, setBtnDisabled]=useState(true);
    
    /*Translation*/
    const {t}=useTranslation("translation", {keyPrefix:'schools.school.year.courses'})

    /*Methods */
    const functionControl=(name)=>{
        
        if(name === 'delete'){
            remove();
            setAreYouSureTransitionProp(false);
        }
        
        setAreYouSureTransitionProp(false);
    }
    const handleInputChange = (e, i) => {
        const values = [...courseName];
        if (e.target?.name === 'name') {
            values[i].name = e.target.value;
        } else {
            values[i].lang = e;
        }
        setCourseName(values);
    };
    const handleAddRow = () => {
        if(readOnly===false)
        {
            setCourseName([...courseName, { lang: '', name: '' }]);
        }
    };
    const handleRemoveRow=(e)=>{
        if(readOnly === false){
            let find=courseName.filter((f)=>f !== e);
            setCourseName(find);
        }
    }

    const updateCourseInfos=(e)=>{

        e.preventDefault();
        setLoader(true);
        setBtnDisabled(true);
        setReadOnly(true);
        ServiceClient.createCourse(courseName,studentLimit, minutesLesson, minTeachingDay, coursePricePerLesson, labels, location.value || location,paymentPeriod.value || paymentPeriod,courseId,currency).then((success)=>{
            setLoader(false);
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            },2000)
            setBtnDisabled(false);
            setReadOnly(false);
        }).catch((error)=>{
            setServerError(error);
            setLoader(false);
            setBtnDisabled(false);
            setReadOnly(false);
        });
    }

    const remove=()=>{
        setDeleteLoader(true);
        setBtnDisabled(true);

        ServiceClient.removeCourse(courseId).then((success)=>{
            setDeleteLoader(false);
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            },2000)

            navigation('/course/list');
        }).catch((error)=>{
            setServerError(error);
            setDeleteLoader(false);
            setSuccess(true);
        });
    }

    useEffect(() => {
        if(courseInfo.labels && courseInfo.labels.length){
            let init = courseInfo.labels.map((l)=>({id: l.id, label: l.label}));
            setLabels(init);
        }
    }, [courseInfo]);
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
                name={AreYouSureName}
                answer={(name) => functionControl(name)}
                transitionProp={areYouSureTransitionProp}
            />

            <div className="courseCreate">
                <div className="title"><h2>{t('info.title')} <MdEdit className='icon formIcon' onClick={()=>[setReadOnly(!readOnly), setBtnDisabled(!btndisabled)]}/>  </h2></div>
                <form className="FlexForm">

                    <div className="form-items flex">
                        <div className="form-children flexColumnItems">
                            <label>{t('form.status')}</label>
                            <Select
                                options={courseStatuses}
                                value={courseInfo.status}
                                onChange={(selected) => {
                                    setCourseStatus(selected.value)
                                }}
                                isDisabled={readOnly}
                                isSearchable={true}
                                className="select-componentFull"
                            />
                        </div>
                        <div className="form-children">
                            <label>{t('form.name')}</label>
                        </div>
                        {courseName.map((e, i) => (
                            <div className="form-children flexColumnItems" key={i}>
                                <div className="course-lng-name">
                                    <ReactFlagsSelect
                                        placeholder={t('select')}
                                        selected={e.lang}
                                        onSelect={(code) => handleInputChange(code, i)}
                                        searchable
                                        disabled={readOnly}
                                        className="select-component50"
                                    />
                                    <input type="text"
                                           required
                                           value={e.name}
                                           name="name"
                                           onChange={(e) => {
                                               handleInputChange(e, i)
                                           }}
                                           readOnly={readOnly}/>
                                    <FaPlus onClick={handleAddRow} className="selector-icon"/>
                                    {i > 0 &&
                                        <FaMinus onClick={() => handleRemoveRow(e)} className="selector-icon red"/>}
                                </div>
                            </div>
                        ))}
                        <div className="form-children flexColumnItems">
                            <label>{t('form.labels')}</label>
                            <LabelSelector
                                labelEmit={(data) => setLabels(data)}
                                getLabels={courseInfo.labels}
                                disabled={readOnly}
                                popUpTitle={"Add labels"}/>
                        </div>

                        <div className="form-children flexColumnItems">
                            <label>{t('form.location')}</label>
                            <Select
                                options={schoolLocations?.select}
                                value={[{"value":courseInfo.location.id, "label":courseInfo.location.name}]}
                                onChange={(selected) => {
                                    setLocation(selected.value)
                                }}
                                isDisabled={readOnly}
                                isSearchable={true}
                                className="select-componentFull"
                            />
                        </div>
                        <div className="form-collapse">
                            <div className="form-children flexColumnItems">
                                <label>{t('form.course-price-per-lesson')}</label>
                                <input
                                    type="text"
                                    required
                                    onChange={(e) => {
                                        setcoursePricePerLesson(e.target.value)
                                    }}
                                    value={coursePricePerLesson}
                                    readOnly={readOnly}/>
                            </div>
                            <div className="form-children flexColumnItems">
                                <label>{t('form.currency')}</label>
                                <Select
                                    options={currencies}
                                    value={courseInfo.currency}
                                    onChange={(selected) => {
                                        setCurrency(selected.value)
                                    }}
                                    isDisabled={readOnly}
                                    isSearchable={true}
                                    className="select-componentFull"
                                />
                            </div>
                            <div className="form-children flexColumnItems">
                                <label>{t('form.payment-period')}</label>
                                <Select
                                    options={paymentPeriods}
                                    value={courseInfo.paymentPeriod}
                                    onChange={(selected) => {
                                        setPaymentPeriod(selected.value)
                                    }}
                                    isDisabled={readOnly}
                                    isSearchable={true}
                                    className="select-componentFull"
                                />
                            </div>
                        </div>
                        <div className="form-collapse">
                            <div className="form-children flexColumnItems">
                                <label>{t('form.student-limit')}</label>
                                <input type="number"
                                       min={1}
                                       required
                                       onChange={(e) => {
                                           setStudentLimit(e.target.value)
                                       }}
                                       value={studentLimit}
                                       readOnly={readOnly}/>
                            </div>

                            <div className="form-children flexColumnItems">
                                <label>{t('form.minutes-lesson')}</label>
                                <input
                                    type="number"
                                    min={1}
                                    required
                                    onChange={(e) => {
                                        setMinutesLesson(e.target.value)
                                    }}
                                    value={minutesLesson}
                                    readOnly={readOnly}/>
                            </div>
                            <div className="form-children flexColumnItems">
                                <label>{t('form.minTeachingDay')}</label>
                                <input
                                    type="number"
                                    min={1}
                                    required
                                    onChange={(e) => {
                                        setMinTeachingDay(e.target.value)
                                    }}
                                    value={minTeachingDay}
                                    readOnly={readOnly}/>
                            </div>
                        </div>

                    </div>
                    <div className="form-button-container">
                        {!loader ?
                            <button
                                type='submit'
                                disabled={btndisabled}
                                onClick={(e)=>updateCourseInfos(e)}
                                className={readOnly ? 'formBtnDisabled' : 'btn formButton'}>
                                {t('button.update')} <GrUpdate  className='btn-icon'/>
                            </button> :
                            <span className='loader schoolDetails'></span>
                        }
                        {!deleteLoader ?
                            <button
                                type="button"
                                disabled={btndisabled}
                                onClick={()=>[setAreYouSureName("delete"), setAreYouSureTransitionProp(true)]}
                                className={readOnly ? 'formBtnDisabled' : 'btn formButton'}>
                                {t('button.delete')} <MdDelete  className='btn-icon'/>
                            </button> :
                            <span className='loader schoolDetails'></span>
                        }
                    </div>
                </form>
            </div>
        </>
    );
};
export default CourseInfo;