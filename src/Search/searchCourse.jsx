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
        
const SearchCourse = () => {
    
    /*datas */
    const [courseName, setCourseName]=useState();
    const [courseSubject, setCourseSubject]=useState();
    const [minutesLesson, setMinutesLesson]=useState();
    const [minTeachingDay, setMinTeachingDay]=useState();
    const [couresPricePerLesson, setCouresPricePerLesson]=useState();
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

    /*Methods */
   
    const searchCourse=(e)=>{
        
        e.preventDefault();
        setLoader(true);
        setBtnDisabled(true);

        let dataPost={};
        dataPost.name=courseName;
        dataPost.subject=courseSubject;
        dataPost.minutesLesson=minutesLesson;
        dataPost.minTeachingDay=minTeachingDay;
        dataPost.couresPricePerLesson=couresPricePerLesson;
        dataPost.sortData=sortData;

        let url="http://127.0.0.1:8000/api/searchCourse";

        ServiceClient.post(url, dataPost).then((response)=>{
            if(response.status===200){
                setLoader(false);
                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                },2000)
                setBtnDisabled(false);
                setResult(response.data);
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
        
        <div className="content-main-container">
            
            <div className="title"><h2>Search Course</h2></div>
                <form onSubmit={(e)=>searchCourse(e)} className="SchoolForm">
                    
                    <div className="school-form courseCreate flex">

                        <div className="flex">
                            <label>Name</label>
                            <input type="text" 
                            required 
                            onChange={(e)=>{setCourseName(e.target.value)}}
                            value={courseName}
                            readOnly={readOnly}/>
                        </div>    

                        <div className="flex">
                            <label>Subject</label>
                            <input type="text" 
                            required 
                            onChange={(e)=>{setCourseSubject(e.target.value)}}
                            value={courseSubject}
                            readOnly={readOnly}/>
                        </div>
                        
                        <div className="flex">
                            <label>Minutes/lesson</label>
                            <input
                            type="text" 
                            required  
                            onChange={(e)=>{setMinutesLesson(e.target.value)}}
                            value={minutesLesson}
                            readOnly={readOnly}/>
                        </div>

                        <div className="flex">
                            <label>Minimum Teaching Days</label>
                            <input
                            type="text" 
                            required  
                            onChange={(e)=>{setMinTeachingDay(e.target.value)}}
                            value={minTeachingDay}
                            readOnly={readOnly}/>
                        </div>

                        <div className="flex">
                            <label>Course Price / Lesson</label>
                            <input
                            type="text" 
                            required  
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