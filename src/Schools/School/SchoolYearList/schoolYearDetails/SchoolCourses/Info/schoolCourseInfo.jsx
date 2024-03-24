import { useContext, useEffect, useLayoutEffect, useState } from "react";
import EventHandler from "../../../../../../EventHandler/eventhandler";
import { Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import AreYouSure from "../../../../../../CommonComponents/AreYouSure/areyousure";
import ServiceClient from "../../../../../../ServiceClient";
import { GrUpdate } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";
import { TabMenuContext, schoolYearDetailsContext } from "../../../../../../Context/UserContext";
import TabMenu from "../../../../../../CommonComponents/TabMenu/tabMenu";
import Select from "../../../../../../CommonComponents/Select/select";
import LabelSelector from "../../../../../../CommonComponents/Label/labelSelect";
        
const SchoolCourseInfo = () => {

    /*Loader */
    const [courseData, statuses]  = useLoaderData();
    
    useEffect(()=>{console.log(courseData)},[]);
    
    /*datas */
    const [courseName, setCourseName]=useState(courseData?.courses?.name);
    const [courseSubject, setCourseSubject]=useState(courseData?.courses?.subject);
    const [studentLimit, setStudentLimit]=useState(courseData?.courses?.student_limit);
    const [minutesLesson, setMinutesLesson]=useState(courseData?.courses?.minutes_lesson);
    const [minTeachingDay, setMinTeachingDay]=useState(courseData?.courses?.min_teaching_day);
    const [doubleTime, setDoubleTime]=useState(courseData?.courses?.double_time);
    const [couresPricePerLesson, setCouresPricePerLesson]=useState(courseData?.courses?.course_price_per_lesson);
    const [status, setStatus]=useState(courseData?.courses?.status_id);
    const [labels, setLabels]=useState(courseData?.courses?.labels);
    
    const [readOnly, setReadOnly]=useState(true);
    const [selectedRow, setSelectedRow]=useState();
    let { schoolId, schoolYearId, courseId }=useParams();
    const [alias, setAlias]=useState();

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
    

    /*Methods */
    const functionControl=(name)=>{
        
        if(name === 'delete'){
            removeSchoolCourse();
            setAreYouSureTransitionProp(false);
        }
        
        setAreYouSureTransitionProp(false);
    }

    const updateSchoolYearInfos=(e)=>{
        
        e.preventDefault();
        setLoader(true);
        setBtnDisabled(true);
        setReadOnly(true);

        let dataPost={};
        dataPost.courseId=courseId;
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
            setReadOnly(false);
        })
    }

    const removeSchoolCourse=()=>{
        setDeleteLoader(true);
        setBtnDisabled(true);

        let dataPost={};
        dataPost.schoolId=schoolId;
        dataPost.yearId=schoolYearId;
        dataPost.id=courseId;

        let url="http://127.0.0.1:8000/api/removeSchoolCourse";

        ServiceClient.post(url, dataPost).then((response)=>{
            if(response.status===200){
                setDeleteLoader(false);
                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                },2000)
                
                navigation(`/school/${schoolId}/school-year/${schoolYearId}/courses`);
            }
        }).catch((error)=>{
            setServerError(error);
           
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
        <AreYouSure
        name={AreYouSureName}
        answer={(name)=> functionControl(name)}
        transitionProp={areYouSureTransitionProp}/>
        
    <div className="content-main-container">
        
        <div className="title"><h2>School Course Info <MdEdit className='icon formIcon' onClick={()=>[setReadOnly(!readOnly), setBtnDisabled(!btndisabled)]}/> </h2></div>
            <form onSubmit={(e)=>updateSchoolYearInfos(e)} className="SchoolForm">
                
                <div className="school-form flex courseCreate">

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
                        checked={doubleTime}
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
                            getLabels={labels}
                            disabled={readOnly}
                            popUpTitle={"Modified the labels"}/>
                        </div>
                    <div className="flex">
                        <label>Status</label>
                        <div className="selectContainer">
                            <Select 
                            options={statuses}
                            onSelect={(option)=>setStatus(option.id)}
                            InitialValue={courseData.courses?.status}
                            disabled={readOnly}/>
                        </div>
                    </div>
                    
                </div>
                
                {!loader ?
                    <button 
                    type='submit' 
                    disabled={btndisabled} 
                    className={readOnly ? 'formBtnDisabled':'btn formButton' }>
                       <GrUpdate  className='btn-icon'/> Update 
                    </button>:
                    <span className='loader schoolDetails'></span>
                }
                {!deleteLoader ?
                    <button 
                    type='button' 
                    disabled={btndisabled}
                    onClick={()=>[setAreYouSureName("delete"), setAreYouSureTransitionProp(true)]}
                    className={readOnly ? 'formBtnDisabled':'btn formButton' }>
                       <FaTrashCan   className='btn-icon'/> Delete 
                    </button>:
                    <span className='loader schoolDetails'></span>
                }
                
            </form>
            
        </div>
        </>
    );
};
export default SchoolCourseInfo;