import { useContext, useEffect, useLayoutEffect, useState } from "react";
import EventHandler from "../EventHandler/eventhandler";
import { Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import AreYouSure from "../CommonComponents/AreYouSure/areyousure";
import ServiceClient from "../ServiceClient";
import { GrUpdate } from "react-icons/gr";
import {FaArrowCircleRight, FaExclamationTriangle, FaMinus, FaPlusCircle, FaTrashAlt} from "react-icons/fa";
import {TabMenuContext, schoolYearDetailsContext, UserContext} from "../Context/UserContext";
import TabMenu from "../CommonComponents/TabMenu/tabMenu";
import Select from "react-select";
import LabelSelector from "../CommonComponents/Label/labelSelect";
import {useTranslation} from "react-i18next";
import ReactFlagsSelect from "react-flags-select";
import course from "./course";
        
const CourseInfo = () => {

    /*Loader */
    const [courseInfo, courseStatuses, schoolLocations, paymentPeriods, currencies,languages] = useLoaderData();

    /*Data */
    const [courseName, setCourseName]=useState(courseInfo.name);
    const [studentLimit, setStudentLimit]=useState(courseInfo.student_limit);
    const [minutesLesson, setMinutesLesson]=useState(courseInfo.minutes_lesson);
    const [minTeachingDay, setMinTeachingDay]=useState(courseInfo.min_teaching_day);
    const [coursePricePerLesson, setcoursePricePerLesson]=useState(courseInfo.course_price_per_lesson);
    const [labels, setLabels]=useState();
    const [location, setLocation]=useState({value:courseInfo.location.id, label:courseInfo.location.name});
    const [paymentPeriod, setPaymentPeriod]=useState(courseInfo.paymentPeriod.value);
    const [currency, setCurrency]=useState(courseInfo.currency)
    const [courseStatus, setCourseStatus]=useState(courseInfo?.status);
    const [removeLangs, setRemoveLangs]=useState([]);
    const [readOnly, setReadOnly]=useState(true);
    const [selectedRow, setSelectedRow]=useState();
    let {courseId }=useParams();
    const [initialValueForLabels, setInitialVeluesForLabels]=useState();
    const [startDate, setStartDate]=useState(courseInfo.start);
    const [endDate, setEndDate]=useState(courseInfo.end);

    /*Popup control */
    const [AreYouSureName, setAreYouSureName]=useState('');
    const [areYouSureTransitionProp, setAreYouSureTransitionProp]=useState(false);

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Loader */
    const [loader, setLoader]=useState(false);
    const [deleteLoader, setDeleteLoader]=useState(false);

    /*Navigation */
    const navigation=useNavigate();

    /*button control */
    const [btndisabled, setBtnDisabled]=useState(true);
    
    /*Translation*/
    const {t}=useTranslation("translation", {keyPrefix:'schools.school.year.courses'})
    const {t:a}=useTranslation("translation", )

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
            setRemoveLangs([...removeLangs, e])

        }
    }
    const handleLabelSelection =(data,i)=>{
        const values=[...courseName];
        if(data){
            values[i].labels=data;
        }
    }

    const updateCourseInfos=(e)=>{
        e.preventDefault();
        setLoader(true);
        setBtnDisabled(true);
        setReadOnly(true);
        setErrors([]);
        setServerError([]);
        ServiceClient.createCourse(courseName,studentLimit, minutesLesson, minTeachingDay, coursePricePerLesson, location.value || location,paymentPeriod.value || paymentPeriod,courseId,currency.value || currency, courseStatus.value || courseInfo.status.value, removeLangs, startDate, endDate).then((success)=>{
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
        setErrors([]);
        setServerError([]);

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
                <div className="title">
                    <h2>{t('info.title')}
                        <MdEdit
                            className='icon formIcon'
                            onClick={() => [setReadOnly(!readOnly), setBtnDisabled(!btndisabled)]}
                        />
                    </h2>
                </div>
                <form onSubmit={(e) => updateCourseInfos(e)} className="FlexForm">
                    <div className="form-items flex">
                        <div className="form-children">
                            <label>{t('form.status')}</label>
                            <Select
                                placeholder={t('select')}
                                defaultValue={courseStatus}
                                options={courseStatuses}
                                onChange={(selected) => {
                                    handleInputChange(selected)
                                }}
                                isDisabled={readOnly}
                                isSearchable={true}
                                className="select-componentFull"
                            />
                        </div>
                        <div className="form-children form-collapse">
                            <div className="flexColumnItems">
                                <label>{t('form.start')}</label>
                                <input type="date" required readOnly={readOnly} onChange={(e) => {
                                    setStartDate(e.target.value)
                                }} value={startDate}/>
                            </div>
                            <div className="flexColumnItems">
                                <label>{t('form.end')}</label>
                                <input type="date" required readOnly={readOnly} onChange={(e) => {
                                    setEndDate(e.target.value)
                                }} value={endDate}/>
                            </div>
                        </div>
                        <div className="form-children">
                            <table>
                                <thead>
                                    <tr>
                                        <th>{t('form.lang')}</th>
                                        <th>{t('form.name')}</th>
                                        <th>{t('form.labels')}</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {courseName.map((e, i) => (
                                    <>
                                        <tr>
                                            <td>
                                                <Select
                                                    placeholder={t('select-lang')}
                                                    defaultValue={({value: e.lang, label: a(`enums.${e.lang}`)})}
                                                    options={languages.map(j=>({value:j.value, label:a(`enums.${j.label}`)})) || null}
                                                    onChange={(selected) => {
                                                        handleInputChange(selected, i)
                                                    }}
                                                    isDisabled={readOnly}
                                                    isSearchable={true}
                                                    className="select-componentFull"
                                                />
                                            </td>
                                            <td>
                                                <input type="text"
                                                       required
                                                       value={e.name}
                                                       name="name"
                                                       onChange={(e) => {
                                                           handleInputChange(e, i)
                                                       }}
                                                       readOnly={readOnly}/>
                                            </td>
                                            <td>
                                                <LabelSelector
                                                    labelEmit={(data) => handleLabelSelection(data, i)}
                                                    disabled={readOnly}
                                                    lang={e.lang}
                                                    popUpTitle={"Add labels"}
                                                    initial={e.labels}
                                                />
                                            </td>
                                            {i > 0 && <td>
                                                <FaMinus onClick={() => handleRemoveRow(e)}
                                                         className="selector-icon red"/>
                                            </td>}
                                        </tr>
                                        {!readOnly && Object.keys(courseName).length - 1 === i &&
                                            <tr>
                                                <td colSpan={4}>
                                                    <FaPlus onClick={handleAddRow} className="selector-icon"/>
                                                </td>
                                            </tr>
                                        }
                                    </>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="form-children mobile-course-create-table">
                            {courseName.map((e, i) => (
                                <div key={i}>
                                    <div className="mobile-children">
                                        <label>{t('form.lang')}</label>
                                        <Select
                                            placeholder={t('select')}
                                            options={languages || null}
                                            onChange={(selected) => {
                                                handleInputChange(selected, i)
                                            }}
                                            isDisabled={readOnly}
                                            isSearchable={true}
                                            className="select-componentFull"
                                        />
                                    </div>
                                    <div className="mobile-children">
                                        <label>{t('form.name')}</label>
                                        <input type="text"
                                               required
                                               value={e.name}
                                               name="name"
                                               onChange={(e) => {
                                                   handleInputChange(e, i)
                                               }}
                                               readOnly={readOnly}
                                        />
                                    </div>
                                    <div className="mobile-children">
                                        <label>{t('form.labels')}</label>
                                        <LabelSelector
                                            labelEmit={(data) => console.log(data)}
                                            disabled={e.lang === ""}
                                            lang={e.lang}
                                            popUpTitle={"Add labels"}
                                        />
                                    </div>
                                    {!readOnly &&<div className="mobile-course-create-table-add-new-row">
                                        <FaPlusCircle onClick={handleAddRow} className="selector-icon"/>
                                        {i > 0 &&
                                            <FaMinus onClick={() => handleRemoveRow(e)} className="selector-icon red"/>}
                                    </div>}
                                </div>
                            ))}
                        </div>
                        <div className="form-children flexColumnItems">
                            <label>{t('form.location')}</label>
                            <Select
                                placeholder={t('select')}
                                defaultValue={location}
                                options={schoolLocations?.select}
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
                                    type="number"
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
                                    placeholder={t('select')}
                                    defaultValue={courseInfo.currency}
                                    options={currencies}
                                    onChange={(selected) => {
                                        setCurrency(selected.value)
                                    }}
                                    isDisabled={readOnly}
                                    isSearchable={true}
                                    className="select-component90"
                                    maxMenuHeight={150}
                                />
                            </div>
                            <div className="form-children flexColumnItems">
                                <label>{t('form.payment-period')}</label>
                                <Select
                                    placeholder={t('select')}
                                    defaultValue={courseInfo.paymentPeriod}
                                    options={paymentPeriods}
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
                                onClick={(e) => updateCourseInfos(e)}
                                className={readOnly ? 'formBtnDisabled' : 'btn formButton'}>
                                {t('button.update')} <GrUpdate className='btn-icon'/>
                            </button> :
                            <span className='loader schoolDetails'></span>
                        }

                        {!deleteLoader ?
                            <button
                                type="button"
                                disabled={btndisabled}
                                onClick={() => [setAreYouSureName("delete"), setAreYouSureTransitionProp(true)]}
                                className={readOnly ? 'formBtnDisabled' : 'btn formButton'}>
                                {t('button.delete')} <MdDelete className='btn-icon'/>
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