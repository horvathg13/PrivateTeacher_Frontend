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
import Select from "../CommonComponents/Select/select";
import LabelSelector from "../CommonComponents/Label/labelSelect";
import SearchResult from "./searchResult";
        
const SearchCourse = () => {
    
    /*datas */
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

    /*Popup control */

    const [title, setTitle]=useState();
    const [transitionProp, setTransitionProp]=useState(false);

    /*Methods */
    
    const searchCourse=(e)=>{
        
        e.preventDefault();
        setLoader(true);
        setBtnDisabled(true);

        console.log(keywords, "key")
        let dataPost={};
        dataPost.courseName=courseName;
        dataPost.keywords=keywords;
        dataPost.subject=courseSubject;
        dataPost.min_lesson=minutesLesson;
        dataPost.min_t_days=minTeachingDay;
        dataPost.course_price=couresPricePerLesson;
        dataPost.name = schoolName;
        dataPost.country = schoolCountry;
        dataPost.zip = schoolZip;
        dataPost.city = schoolCity;
        dataPost.street = schoolStreet;
        dataPost.number = schoolNumber;
        dataPost.sortData=sortData;

        let url="http://127.0.0.1:8000/api/searchCourse";

        ServiceClient.post(url, dataPost).then((response)=>{
            if(response.status===200){
                setLoader(false);
                setBtnDisabled(false);
                setResult(response.data);
                setTitle('Search Result');
                setTransitionProp(true);
            }
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
        <SearchResult
        transitionProp={transitionProp}
        closeModal={(data)=>{if(data===true){setTransitionProp(!transitionProp)}}}
        data={result}
        title={title}
        />
        <div className="content-main-container">
            
            <div className="title"><h2>Search Cours</h2></div>
                <form onSubmit={(e)=>searchCourse(e)} className="SchoolForm">
                    
                    <div className="school-form searchCourse flex">
                        <div className="flex">
                            <label>School Name</label>
                            <input type="text" 
                            onChange={(e)=>{setSchoolName(e.target.value)}}
                            value={schoolName}/>
                        </div>    
                        
                    

                        <div className="flex">
                            <label>Country</label>
                            <input type="text" 
                            onChange={(e)=>{setSchoolCountry(e.target.value)}}
                            value={schoolCountry}/>
                        </div>
                        
                    
                        <div className="flex">
                            <label>Zip Code</label>
                            <input type="number"
                            onChange={(e)=>{setSchoolZip(e.target.value)}}
                            value={schoolZip}/>
                        </div>
                    
                        <div className="flex">
                            <label>City</label>
                            <input
                            type="text" 
                            onChange={(e)=>{setSchoolCity(e.target.value)}}
                            value={schoolCity}/>
                        </div>

                        <div className="flex">
                            <label>Street</label>
                            <input  
                            type="text" 
                            onChange={(e)=>{setSchoolStreet(e.target.value)}}
                            value={schoolStreet}/>
                        </div>
                        
                        <div className="flex">
                            <label>Number</label>
                            <input  
                            type="number" 
                            onChange={(e)=>{setSchoolNumber(e.target.value)}}
                            value={schoolNumber}/>
                        </div>

                        <div className="flex">
                            <label>Course Name</label>
                            <input type="text" 
                            onChange={(e)=>{setCourseName(e.target.value)}}
                            value={courseName}
                            readOnly={readOnly}/>
                        </div>
                        <div className="flex">
                            <label>Keywords</label>
                            <LabelSelector 
                            labelEmit={(data)=>setKeywords(data)}/>
                        </div>    

                        <div className="flex">
                            <label>Subject</label>
                            <input type="text" 
                            onChange={(e)=>{setCourseSubject(e.target.value)}}
                            value={courseSubject}
                            readOnly={readOnly}/>
                        </div>
                        
                        <div className="flex">
                            <label>Minutes/lesson</label>
                            <input
                            type="number" 
                            onChange={(e)=>{setMinutesLesson(e.target.value)}}
                            value={minutesLesson}
                            readOnly={readOnly}/>
                        </div>

                        <div className="flex">
                            <label>Minimum Teaching Days</label>
                            <input
                            type="number" 
                            onChange={(e)=>{setMinTeachingDay(e.target.value)}}
                            value={minTeachingDay}
                            readOnly={readOnly}/>
                        </div>

                        <div className="flex">
                            <label>Course Price / Lesson</label>
                            <input
                            type="number" 
                            onChange={(e)=>{setCouresPricePerLesson(e.target.value)}}
                            value={couresPricePerLesson}
                            readOnly={readOnly}/>
                        </div>

                    </div>
                    
                    {!loader ?
                        <button 
                        type='submit' 
                        disabled={btndisabled} 
                        className={readOnly ? 'formBtnDisabled':'btn formButton' }>
                        Search <FaArrowCircleRight  className='btn-icon'/>  
                        </button>:
                        <span className='loader schoolDetails'></span>
                    }
                    
                </form>
                
            </div>
        </>
    );
};
export default SearchCourse;