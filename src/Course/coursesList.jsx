import { useEffect, useLayoutEffect, useState } from "react";
import EventHandler from "../EventHandler/eventhandler";
import { Navigate, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import SchoolYearDetailsPopup from "../Schools/School/schoolYearDetails/schoolYearDetailsPopup";
import AreYouSure from "../CommonComponents/AreYouSure/areyousure";
import ServiceClient from "../ServiceClient";
import {useTranslation} from "react-i18next";
        
const CoursesList = () => {
    /*Translation*/
    const {t}=useTranslation();
    /*dataLoader */
    const dataLoader=useLoaderData();
    useEffect(()=>{
        if(dataLoader){
            console.log(dataLoader, "Hopp");
            setHeader(dataLoader.header);
            setSchoolCourses(dataLoader.courses);
            setLoader(false);
        }else{
            console.log(dataLoader, "Hopp");
            setHeader("");
            setSchoolCourses("Something went wrong!");
            setLoader(false);
        }
    },[]);

    /*data */
    const [schoolCourses, setSchoolCourses]=useState();
    const [header, setHeader]=useState();
    const [selectedRow, setSelectedRow]=useState();
    let { schoolId, schoolYearId }=useParams();
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
    const [loader, setLoader]=useState(true);
    const [formLoader, setFormLoader]=useState(false);

    /*Navigation */
    const navigation=useNavigate();

    /*button control */
    const [btndisabled, setBtnDisabled]=useState(false);

    /*Methods */
    const navigationHandler=(e)=>{
        let courseId= e.id
        navigation(`/course/${courseId}`);
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
            <form>
                <div className="school-breaks-container">

                    <div className="table-main-container">
                        {!loader ? 
                        <table>
                            <thead>
                                <tr>
                                    {header ? header.map((e, i) => (

                                        <th key={i}>{e}</th>
                                        

                                    )) : null}
                                </tr>

                            </thead>
                            <tbody>
                                { schoolCourses?.length>0  ? schoolCourses.map((e) => (
                                    <tr key={e.id} onClick={() => navigationHandler(e)}>
                                        <td>{e.id}</td>
                                        <td>{e.name}</td>
                                        <td>{e.lang.join(', ')}</td>
                                        <td>{e.status}</td>
                                    </tr>

                                )) :
                                <>
                                    <tr>
                                        <td colSpan={4} className="no-school">{t('empty-table')}</td>
                                    </tr>
                                </>}
                            </tbody>
                                </table> : <span className='loader table'></span>}
                    </div>
                </div>
                
            </form>
        </div>
        </>
    );
};
export default CoursesList;