import React, {useLayoutEffect, useState} from 'react';
import {Outlet, useNavigate, useParams} from "react-router-dom";
import ServiceClient from "../../../ServiceClient";
import EventHandler from "../../../EventHandler/eventhandler";
import AreYouSure from "../../../CommonComponents/AreYouSure/areyousure";
import {MdEdit} from "react-icons/md";
import {GrUpdate} from "react-icons/gr";
import {FaTrashAlt} from "react-icons/fa";

const AddTeachingDay = () => {
    /*Data */
    let { schoolId }=useParams();

    const [name, setName]=useState();
    const [teacher, setTeacher]=useState();
    const [startDate, setStartDate]=useState();
    const [endDate, setEndDate]=useState();
    const [location, setLocation]=useState();

    /*Button Control */
    const [btndisabled, setBtndisabled]=useState(false);


    /*Event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Loader */
    const [loader, setLoader]=useState(true);

    /*Navigation */
    const navigation=useNavigate();

    /*Methods */

    const createTeachingDay=(e)=>{
        e.preventDefault();
        setBtndisabled(true);

        let dataPost={};
        dataPost.name=name;
        dataPost.teacherId=teacher;
        dataPost.start=startDate;
        dataPost.end=endDate;
        dataPost.locationId=location;
        let url="http://127.0.0.1:8000/api/createTeachingDay";
        ServiceClient.post(url).then((response)=>{
            if(response.status===200){

                setBtndisabled(false);
                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                },2000)
               navigation(`/school/${schoolId}/teaching-days-list`);
            }
        }).catch((error)=>{
            setServerError(error);
            setLoader(false);
            setBtndisabled(false)
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

                <div className="title"><h2>Create Teaching Day </h2></div>
                <form onSubmit={(e)=>createTeachingDay(e)} className="SchoolForm">

                    <div className="school-form flex">

                        <div className="flex">
                            <label>Name</label>
                            <input type="text"
                                   required
                                   onChange={(e)=>{setName(e.target.value)}}
                                   value={name}
                                   readOnly={btndisabled}/>
                        </div>

                        <div className="flex">
                            <label>Teacher</label>

                        </div>


                        <div className="flex">
                            <label>Start</label>
                            <input type="date"
                                   required
                                   onChange={(e)=>{setStartDate(e.target.value)}}
                                   value={startDate}
                                   readOnly={btndisabled}/>
                        </div>

                        <div className="flex">
                            <label>End</label>
                            <input
                                type="date"
                                required
                                onChange={(e)=>{setEndDate(e.target.value)}}
                                value={endDate}
                                readOnly={btndisabled}/>
                        </div>
                        <div className="flex">
                            <label>Location</label>

                        </div>

                    </div>

                    {!loader ?
                        <button
                            type='submit'
                            disabled={btndisabled}
                            className={btndisabled ? 'formBtnDisabled':'btn formButton' }>
                            Create
                        </button>:
                        <span className='loader schoolDetails'></span>
                    }

                </form>

            </div>
        </>
    );
};

export default AddTeachingDay;