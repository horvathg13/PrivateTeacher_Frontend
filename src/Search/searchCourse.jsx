import { useContext, useEffect, useLayoutEffect, useState } from "react";
import EventHandler from "../EventHandler/eventhandler";
import { Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import AreYouSure from "../CommonComponents/AreYouSure/areyousure";
import ServiceClient from "../ServiceClient";
import { GrUpdate } from "react-icons/gr";
import { FaArrowCircleRight, FaTrashAlt } from "react-icons/fa";
import { TabMenuContext, schoolYearDetailsContext } from "../Context/UserContext";
import Select from "react-select";
import LabelSelector from "../CommonComponents/Label/labelSelect";
import SearchResult from "./searchResult";
import {useTranslation} from "react-i18next";
import course from "../Course/course";
        
const SearchCourse = () => {

    /*Translation*/
    const {t}=useTranslation();

    /*Loader*/
    const languages=useLoaderData();

    /*Data */
    const [teacherEmail, setTeacherEmail]=useState();
    const [courseName, setCourseName]=useState();
    const [courseSubject, setCourseSubject]=useState();
    const [minutesLesson, setMinutesLesson]=useState();
    const [minTeachingDay, setMinTeachingDay]=useState();
    const [couresPricePerLesson, setCouresPricePerLesson]=useState();
    const [schoolName, setSchoolName]=useState();
    const [schoolCountry, setSchoolCountry]=useState();
    const [schoolZip, setSchoolZip]=useState();
    const [schoolCity, setSchoolCity]=useState();
    const [schoolStreet, setSchoolStreet]=useState();
    const [schoolNumber, setSchoolNumber]=useState();
    const [keywords, setKeywords]=useState();
    const [result, setResult]=useState();
    const[sortData, setSortData]=useState();
    const [counterSet, setCounter]=useState();
    const [lastPage, setLastPage]=useState();
    const [pageSet, setPerPage]=useState();
    const [lang, setLang]=useState();
    const [minTime, setMinTime]=useState();
    const [maxTime, setMaxTime]=useState();

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Loader */
    const [loader, setLoader]=useState(false);
    const [searchResultLoader, setSearchResultLoader]=useState(false);
    const [formLoader, setFormLoader]=useState(false);
    const [deleteLoader, setDeleteLoader]=useState(true);

    /*Navigation */
    const navigation=useNavigate();

    /*button control */
    const [btndisabled, setBtnDisabled]=useState(false);
    const [readOnly, setReadOnly]=useState(false);

    /*Popup control */
    const [title, setTitle]=useState();
    const [transitionProp, setTransitionProp]=useState(false);

    /*Methods */
    
    const searchCourse=(e)=>{
        
        e.preventDefault();
        setLoader(true);
        setSearchResultLoader(true);
        setBtnDisabled(true);
        setErrors([]);
        setServerError([]);

        ServiceClient.searchCourse(teacherEmail,courseName, keywords,minTime,maxTime,
            minTeachingDay,couresPricePerLesson,schoolCountry,schoolZip,
            schoolCity, schoolStreet,schoolNumber,sortData, pageSet, counterSet, lang).then((success)=>{

            setLoader(false);
            setSearchResultLoader(false);
            setBtnDisabled(false);
            setResult(success);
            setTitle(t('search.result'));
            setLastPage(success.pagination.lastPageNumber)
            setCounter(success.pagination.currentPageNumber)
            setTransitionProp(true);

        }).catch((error)=>{
            setServerError(error);
            setLoader(false);
            setSearchResultLoader(false);
            setBtnDisabled(false);
        })
    }
    const pageCounter=(data)=>{
        switch (data){
            case 'next': return setCounter(counterSet+1);
            case 'prev': if(counterSet >1){return setCounter(counterSet-1)}else{return null};
            case 'last': return setCounter(lastPage);
            case 'first':return setCounter(1);
            default: return counterSet;
        }

    }
    const courseSearchForUseEffect=()=>{
        if(pageSet || counterSet>1){
            setSearchResultLoader(true)
            ServiceClient.searchCourse(teacherEmail,courseName, keywords,minTime,maxTime,
                minTeachingDay,couresPricePerLesson,schoolCountry,schoolZip,
                schoolCity, schoolStreet,schoolNumber,sortData, pageSet, !pageSet ? 1 : counterSet, lang).then((success)=>{

                setLoader(false);
                setSearchResultLoader(false);
                setBtnDisabled(false);
                setResult(success);
                setTitle(t('search.result'));
                setLastPage(success.pagination.lastPageNumber)
                setCounter(success.pagination.currentPageNumber)
                setTransitionProp(true);

            }).catch((error)=>{
                setServerError(error);
                setLoader(false);
                setSearchResultLoader(false);
                setBtnDisabled(false);
            })
        }
    }

    const renderLanguagesOptions=()=>{
        if(languages && !lang){
            return languages.map(l=>({value: l.value, label:t(`enums.${l.label}`)}))
        }else{
            return languages.filter(e=>!lang.includes(e.value)).map(l=>({value: l.value, label:t(`enums.${l.label}`)}))
        }
    }
    useEffect(() => {
        setTimeout(courseSearchForUseEffect, 0)
    }, [pageSet, counterSet]);
    useEffect(() => {
        setKeywords([])
    }, [lang]);

    return (
        <>
        <EventHandler
            success={success} 
            errors={errors} 
            serverError={serverError} 
            closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}
        />
        <SearchResult
        transitionProp={transitionProp}
        closeModal={(data)=>{if(data===true){setTransitionProp(!transitionProp)}}}
        data={result}
        title={title}
        perPage={(data)=>{setPerPage(data)}}
        counter={(data)=>{pageCounter(data)}}
        findPerPage={pageSet}
        loader={searchResultLoader}
        />
        <div>
            <div className="title"><h2>{t('search.title')}</h2></div>
                <form onSubmit={(e)=> {
                    searchCourse(e)
                }} className="FlexForm">
                    <div className="form-items longLabel">
                        <div className="form-children">
                            <label>{t('search.teacher_email')}</label>
                            <input type="email"
                                   onChange={(e) => {
                                       setTeacherEmail(e.target.value)
                                   }}
                                   value={teacherEmail}
                            />
                        </div>
                        <div className="form-children">
                            <label>{t('search.country')}</label>
                            <input type="text"
                                   onChange={(e) => {
                                       setSchoolCountry(e.target.value)
                                   }}
                                   value={schoolCountry}
                            />
                        </div>
                        <div className="form-children">
                            <label>{t('search.zip')}</label>
                            <input type="text"
                                   onChange={(e) => {
                                       setSchoolZip(e.target.value)
                                   }}
                                   value={schoolZip}
                            />
                        </div>

                        <div className="form-children">
                            <label>{t('search.city')}</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    setSchoolCity(e.target.value)
                                }}
                                value={schoolCity}
                            />
                        </div>

                        <div className="form-children">
                            <label>{t('search.street')}</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    setSchoolStreet(e.target.value)
                                }}
                                value={schoolStreet}
                            />
                        </div>

                        <div className="form-children">
                            <label>{t('search.number')}</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    setSchoolNumber(e.target.value)
                                }}
                                value={schoolNumber}/>
                        </div>
                        <div className="form-children">
                            <label>{t('search.courseName')}</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    setCourseName(e.target.value)
                                }}
                                value={courseName}
                            />
                        </div>
                        <div className="form-children">
                            <label>{t('search.courseLang')} / {t('search.keywords')}</label>
                            <div className="form-collapse">
                                <div className="form-baby">
                                    <Select
                                        placeholder={t('search.select')}
                                        options={renderLanguagesOptions()}
                                        onChange={(selected) => {
                                            setLang(selected.value)
                                        }}
                                        isDisabled={readOnly}
                                        isSearchable={true}
                                        className="select-componentFull"
                                    />
                                </div>
                                <div className="form-baby">
                                    <LabelSelector
                                        labelEmit={(data) => setKeywords(data)}
                                        disabled={!lang}
                                        lang={lang}
                                        initial={keywords}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-children">
                            <label>{t('search.min/lesson')}</label>
                            <div className="form-collapse">
                                <div className="form-baby">
                                    <label>{t('search.min')}</label>
                                    <input
                                        type="number"
                                        onChange={(e) => {
                                            setMinTime(e.target.value)
                                        }}
                                        value={minTime}
                                        readOnly={readOnly}
                                    />
                                </div>
                                <div className="form-baby">
                                    <label>{t('search.max')}</label>
                                    <input
                                        type="number"
                                        onChange={(e) => {
                                            setMaxTime(e.target.value)
                                        }}
                                        value={maxTime}
                                        readOnly={readOnly}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="form-children">
                            <label>{t('search.min_t_days')}</label>
                            <input
                                type="number"
                                onChange={(e) => {
                                    setMinTeachingDay(e.target.value)
                                }}
                                value={minTeachingDay}
                                readOnly={readOnly}
                            />
                        </div>
                    </div>
                    <div className="form-button-container">
                        {!loader ?
                            <button
                                type='submit'
                                disabled={btndisabled}
                                className={readOnly ? 'formBtnDisabled' : 'btn formButton'}>
                                {t('search.search')} <FaArrowCircleRight className='btn-icon'/>
                            </button> :
                            <span className='loader schoolDetails'></span>
                        }
                    </div>

                </form>

        </div>
        </>
    );
};
export default SearchCourse;