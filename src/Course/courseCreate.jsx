import { useContext, useEffect, useLayoutEffect, useState } from "react";
import EventHandler from "../EventHandler/eventhandler";
import { Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import AreYouSure from "../CommonComponents/AreYouSure/areyousure";
import ServiceClient from "../ServiceClient";
import { GrUpdate } from "react-icons/gr";
import {FaArrowCircleRight, FaExclamationTriangle, FaMinus, FaTrashAlt} from "react-icons/fa";
import { TabMenuContext, schoolYearDetailsContext } from "../Context/UserContext";
import LabelSelector from "../CommonComponents/Label/labelSelect";
import {useTranslation} from "react-i18next";
import Select from "react-select";
import ReactFlagsSelect from "react-flags-select";
import {IoClose} from "react-icons/io5";
const CourseCreate = () => {
    /*Translation*/
    const {t}=useTranslation("translation", {keyPrefix:'schools.school.year.courses'});
    const { t: translateWithoutPrefix } = useTranslation("translation");

    /*Loader */
    const [schoolLocations, paymentPeriods, currencies, languages] = useLoaderData();
    paymentPeriods.map(period=>({value:period, label:period.label=translateWithoutPrefix(`enums.${period.value}`)}));

    /*Data*/
    const [courseName, setCourseName]=useState([{lang: '', name: ''}]);
    const [studentLimit, setStudentLimit]=useState();
    const [minutesLesson, setMinutesLesson]=useState();
    const [minTeachingDay, setMinTeachingDay]=useState();
    const [coursePricePerLesson, setcoursePricePerLesson]=useState();
    const [labels, setLabels]=useState();
    const [location, setLocation]=useState();
    const [paymentPeriod, setPaymentPeriod]=useState();
    const [currency, setCurrency]=useState();
    const [startDate, setStartDate]=useState();
    const [endDate, setEndDate]=useState();

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

    const handleInputChange = (e, i) => {
        const values = [...courseName];
        if (e.target?.name === 'name') {
            values[i].name = e.target.value;
        } else {
            values[i].lang = e.value;
        }
        setCourseName(values);
    };
    const handleAddRow = () => {
        setCourseName([...courseName, { lang: '', name: '' }]);
    };
    const handleRemoveRow=(e)=>{
        let find=courseName.filter((f)=>f !== e);
       setCourseName(find);
    }
    const Create=(e)=>{
        e.preventDefault();
        setLoader(true);
        setBtnDisabled(true);
        setErrors([]);
        setServerError([]);

        if(courseName.lang=== '' || courseName.name=== ''){
            return [
                setErrors([t('validate.lng-required')]),
                setLoader(false),
                setBtnDisabled(false)
            ];
        }
        ServiceClient.createCourse(courseName,studentLimit, minutesLesson, minTeachingDay, coursePricePerLesson, labels, location, paymentPeriod, null, currency, null,null,startDate, endDate).then((success)=>{
            setLoader(false);
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            },2000)
            navigation("/course/list");
        }).catch((error)=>{
            setServerError(error);
            setLoader(false);
            setBtnDisabled(false);
        })
    }
    useEffect(()=>{
        if(!schoolLocations.data.length){
            setReadOnly(true);
            setBtnDisabled(true);
            setErrors([t('not-possible')]);
        }
    },[schoolLocations])
    return (
        <>
        <EventHandler
            success={success} 
            errors={errors} 
            serverError={serverError} 
            closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}
        />
        <div className="courseCreate">
            <div className="title"><h2>{t('title.create')}</h2></div>
            {(schoolLocations?.message) && <div className="component-error-message"><FaExclamationTriangle className='icon'/><h2>{t('')}</h2></div>}
            <form onSubmit={(e)=>Create(e)} className="FlexForm">


                <div className="form-items flex">
                    <div className="form-collapse">
                        <div className="form-children flexColumnItems">
                            <label>{t('form.start')}</label>
                            <input type="date" required onChange={(e)=>{setStartDate(e.target.value)}} value={startDate}/>
                        </div>
                        <div className="form-children flexColumnItems">
                            <label>{t('form.end')}</label>
                            <input type="date" required onChange={(e)=>{setEndDate(e.target.value)}} value={endDate}/>
                        </div>
                    </div>
                    <div className="form-children">
                        <label>{t('form.name')}</label>
                    </div>
                    {courseName.map((e, i) => (
                        <div className="form-children flexColumnItems" key={i}>
                            <div className="course-lng-name">
                                <Select
                                    placeholder={t('select')}
                                    options={languages || null}
                                    onChange={(selected) => {
                                        handleInputChange(selected, i)
                                    }}
                                    isDisabled={readOnly}
                                    isSearchable={true}
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
                                {i > 0 && <FaMinus onClick={() => handleRemoveRow(e)} className="selector-icon red"/>}
                            </div>
                        </div>
                    ))}
                    <div className="form-children flexColumnItems">
                        <label>{t('form.labels')}</label>
                        <LabelSelector
                            labelEmit={(data) => setLabels(data)}
                            disabled={readOnly}
                            popUpTitle={"Add labels"}/>
                    </div>

                    <div className="form-children flexColumnItems">
                        <label>{t('form.location')}</label>
                        <Select
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
                            className={readOnly ? 'formBtnDisabled' : 'btn formButton'}>
                            {t('button.create')} <FaArrowCircleRight className='btn-icon'/>
                        </button> :
                        <span className='loader schoolDetails'></span>
                    }
                </div>
            </form>
        </div>
        </>
    );
};
export default CourseCreate;