import { useContext, useEffect, useLayoutEffect, useState } from "react";
import EventHandler from "../../../../../../EventHandler/eventhandler";
import { Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import AreYouSure from "../../../../../../CommonComponents/AreYouSure/areyousure";
import ServiceClient from "../../../../../../ServiceClient";
import { GrUpdate } from "react-icons/gr";
import { FaArrowCircleRight, FaTrashAlt } from "react-icons/fa";
import { TabMenuContext, schoolYearDetailsContext } from "../../../../../../Context/UserContext";
import Select from "../../../../../../CommonComponents/Select/select";
import LabelSelector from "../../../../../../CommonComponents/Label/labelSelect";
        
const SchoolCourseCreate = () => {
    /*Loader */
    const courseStatuses = useLoaderData();
    
    /*datas */
    const [courseName, setCourseName]=useState();
    const [courseSubject, setCourseSubject]=useState();
    const [studentLimit, setStudentLimit]=useState();
    const [minutesLesson, setMinutesLesson]=useState();
    const [minTeachingDay, setMinTeachingDay]=useState();
    const [doubleTime, setDoubleTime]=useState();
    const [couresPricePerLesson, setCouresPricePerLesson]=useState();
    const [status, setStatus]=useState();
    const [labels, setLabels]=useState();
    
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
   
    const CreateSchoolCourse=(e)=>{
        
        e.preventDefault();
        setLoader(true);
        setBtnDisabled(true);

        let dataPost={};
        dataPost.yearId=schoolYearId;
        dataPost.schoolId=schoolId;
        dataPost.name=courseName;
        dataPost.subject=courseSubject;
        dataPost.studentLimit=studentLimit;
        dataPost.minutesLesson=minutesLesson;
        dataPost.minTeachingDay=minTeachingDay;
        dataPost.doubleTime=doubleTime;
        dataPost.couresPricePerLesson=couresPricePerLesson;
        dataPost.status=status;
        dataPost.labels=labels;

        let url="http://127.0.0.1:8000/api/createSchoolCourse";

        ServiceClient.post(url, dataPost).then((response)=>{
            if(response.status===200){
                setLoader(false);
                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                },2000)
                setBtnDisabled(false);
                navigation(`/school/${schoolId}/school-year/${schoolYearId}/courses`);
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
            
            <div className="title"><h2>School Course Creation</h2></div>
                <form onSubmit={(e)=>CreateSchoolCourse(e)} className="SchoolForm">
                    
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
                            <label>Student Limit</label>
                            <input type="text"
                            required  
                            onChange={(e)=>{setStudentLimit(e.target.value)}}
                            value={studentLimit}
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
                            <label>Double Time</label>
                            <input
                            type="checkbox" 
                            onChange={(e)=>{setDoubleTime(e.target.checked)}}
                            value={doubleTime}
                            disabled={readOnly}/>
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
                        <div className="flex">
                            <label>Labels</label>
                            <LabelSelector 
                            labelEmit={(data)=>setLabels(data)}
                            disabled={readOnly}
                            popUpTitle={"Add labels"}/>
                        </div>
                        <div className="flex">
                            <label>Status</label>
                            <div className="selectContainer">
                                <Select 
                                options={courseStatuses}
                                onSelect={(option)=>setStatus(option.id)}
                                disabled={readOnly}/>
                            </div>
                            
                        </div>
                        
                        
                    </div>
                    
                    {!loader ?
                        <button 
                        type='submit' 
                        disabled={btndisabled} 
                        className={readOnly ? 'formBtnDisabled':'btn formButton' }>
                        Create <FaArrowCircleRight  className='btn-icon'/>  
                        </button>:
                        <span className='loader schoolDetails'></span>
                    }
                    
                </form>
                
            </div>
        </>
    );
};
export default SchoolCourseCreate;