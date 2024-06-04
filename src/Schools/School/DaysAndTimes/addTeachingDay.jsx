import React, {useLayoutEffect, useState} from 'react';
import {Outlet, useNavigate, useParams} from "react-router-dom";
import ServiceClient from "../../../ServiceClient";
import EventHandler from "../../../EventHandler/eventhandler";
import AreYouSure from "../../../CommonComponents/AreYouSure/areyousure";
import {MdEdit} from "react-icons/md";
import {GrUpdate} from "react-icons/gr";
import {FaTrashAlt} from "react-icons/fa";
import {IoCloseCircle} from "react-icons/io5";

const AddTeachingDay = ({closeModal}) => {
    /*Data */
    let { schoolId, schoolYearId }=useParams();

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
    const [loader, setLoader]=useState(false);

    /*Navigation */
    const navigation=useNavigate();

    /*Methods */

    const createTeachingDay=(e)=>{
        e.preventDefault();
        setBtndisabled(true);

        ServiceClient.createTeachingDay(name, teacher, startDate, endDate, location).then((success)=>{
            setBtndisabled(false);
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            },2000)
            navigation(`/school/${schoolId}/school-year/${schoolYearId}/teaching-days`);
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
            <div>
                <div className="title"><h2>Create Teaching Day </h2></div>
                <form onSubmit={(e)=>createTeachingDay(e)} className="FlexForm">

                    <div className="form-items flex">

                        <div className="form-children">
                            <label>Name</label>
                            <input type="text"
                                   required
                                   onChange={(e)=>{setName(e.target.value)}}
                                   value={name}
                                   readOnly={btndisabled}/>
                        </div>

                        <div className="form-children">
                            <label>Teacher</label>

                        </div>


                        <div className="form-children">
                            <label>Start</label>
                            <input type="date"
                                   required
                                   onChange={(e)=>{setStartDate(e.target.value)}}
                                   value={startDate}
                                   readOnly={btndisabled}/>
                        </div>

                        <div className="form-children">
                            <label>End</label>
                            <input
                                type="date"
                                required
                                onChange={(e)=>{setEndDate(e.target.value)}}
                                value={endDate}
                                readOnly={btndisabled}/>
                        </div>
                        <div className="form-children">
                            <label>Location</label>

                        </div>

                    </div>
                    <div className="form-button-container">
                        {!loader ?
                            <button
                                type='submit'
                                disabled={btndisabled}
                                className={btndisabled ? 'formBtnDisabled':'btn formButton' }>
                                Create
                            </button>:
                            <span className='loader schoolDetails'></span>
                        }
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddTeachingDay;