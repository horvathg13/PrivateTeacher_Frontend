import React, {useState} from 'react';
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import EventHandler from "../../../EventHandler/eventhandler";
import AreYouSure from "../../../CommonComponents/AreYouSure/areyousure";
import {MdEdit} from "react-icons/md";
import ServiceClient from "../../../ServiceClient";
import {FaTrashAlt} from "react-icons/fa";
import {GrUpdate} from "react-icons/gr";

const Teacher = () => {
    /*Data */
    const [teacherStatuses, teacherCourses]=useLoaderData();
    const { schoolId, teacherId }=useParams();

    const [fname, setFName]=useState();
    const [lname, setLname]=useState();
    const [email , setEmail]=useState();
    const [courses, setCourses]=useState();
    const [status, setStatus]=useState();

    const [readOnly, setReadOnly]=useState(true);

    /*Popup control */
    const [AreYouSureName, setAreYouSureName]=useState('');
    const [areYouSureTransitionProp, setAreYouSureTransitionProp]=useState(false);

    /*Event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Loader */
    const [loader, setLoader]=useState(false);
    const [deleteLoader, setDeleteLoader]=useState(false);

    /*Navigation */
    const navigation=useNavigate();

    /*Button Control */
    const [btndisabled, setBtnDisabled]=useState(false);

    /*Methods */
    const functionControl=(name)=>{

        if(name === 'delete'){
            removeTeacherFromSchool();
            setAreYouSureTransitionProp(false);
        }

        setAreYouSureTransitionProp(false);
    }

    const getTeacherInfos=()=>{
        let url=`http://127.0.0.1:8000/api/school/${schoolId}/teacher-infos/${teacherId}`
        ServiceClient.get(url).then((response)=>{
            if(response.status===200){
                setFName(response.data.fname);
                setLname(response.data.lname);
                setCourses(response.data.courses);

                setLoader(false);
                setDeleteLoader(false);
            }
        }).catch((error)=>{
            setServerError(error);
            //setLoader(false);
        })
    }
    const removeTeacherFromSchool=()=>{
        setDeleteLoader(true);
        let dataPost={};
        dataPost.schoolId=schoolId;
        dataPost.teacherId=teacherId;

        let url="http://127.0.0.1:8000/api/removeLocation";

        ServiceClient.post(url, dataPost).then((response)=>{
            if(response.status===200){
                setDeleteLoader(false);
                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                },2000)

                navigation(`/school/${schoolId}/teachers`);
            }
        }).catch((error)=>{
            setServerError(error);
            setDeleteLoader(false);
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

            <div>
                <div className="title"><h2>Location Info <MdEdit className='icon formIcon' onClick={()=>[setReadOnly(!readOnly), setBtnDisabled(!btndisabled)]}/> </h2></div>
                <form onSubmit={(e)=>updateLocationInfo(e)} className="FlexForm">

                    <div className="form-items flex">

                        <div className="form-children">
                            <label>Firstname</label>
                            <input type="text"
                                   required
                                   onChange={(e) => {
                                       setFName(e.target.value)
                                   }}
                                   value={fname}
                                   readOnly={true}/>
                        </div>

                        <div className="form-children">
                            <label>Lastname</label>
                            <input type="text"
                                   required
                                   onChange={(e) => {
                                       setLname(e.target.value)
                                   }}
                                   value={lname}
                                   readOnly={true}/>
                        </div>


                        <div className="form-children">
                            <label>Email</label>
                            <input type="text"
                                   required
                                   onChange={(e) => {
                                       setEmail(e.target.value)
                                   }}
                                   value={email}
                                   readOnly={true}/>
                        </div>

                        <div className="form-children">
                            <label>Courses</label>
                            {readOnly ? <input type="text"
                                               value={teacherCourses? teacherCourses.map((e)=>( e.name)) : null}
                                               readOnly={readOnly}/>
                                :<select className="school-year-infos-select" onChange={(e)=>{setCourses(e.target.value)}}>
                                    { courses ? courses.map((e,i)=>(<option key={i} value={e.id}>{e.status}</option>)):null}
                                </select>}
                        </div>
                        <div className="form-children">
                            <label>Status</label>
                            {readOnly ? <input type="text"
                                               value={teacherStatuses?.status}
                                               readOnly={readOnly}/>
                                :<select className="school-year-infos-select" onChange={(e)=>{setStatus(e.target.value)}}>
                                    { status ? status.map((e,i)=>(<option key={i} value={e.id}>{e.status}</option>)):null}
                                </select>}
                        </div>
                    <div className="form-button-container">
                    {!deleteLoader ?
                        <button
                            type="button"
                            disabled={btndisabled}
                            className={readOnly ? 'formBtnDisabled':'btn formButton' }
                            onClick={()=>{setAreYouSureName("delete"); setAreYouSureTransitionProp(true)}}>
                            <FaTrashAlt   className='btn-icon'/> Delete
                        </button>:
                        <span className='loader schoolDetails'></span>
                    }
                    </div>
                    </div>
                </form>

            </div>
        </>
    );
};

export default Teacher;