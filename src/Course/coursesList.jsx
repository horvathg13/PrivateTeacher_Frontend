import { useEffect, useState } from "react";
import EventHandler from "../EventHandler/eventhandler";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import {useTranslation} from "react-i18next";
        
const CoursesList = () => {
    /*Translation*/
    const {t}=useTranslation();
    /*dataLoader */
    const dataLoader=useLoaderData();
    useEffect(()=>{
        if(dataLoader){
            setHeader(dataLoader.header);
            setSchoolCourses(dataLoader.courses);
            setLoader(false);
        }else{
            setHeader("");
            setLoader(false);
        }
    },[]);

    /*data */
    const [schoolCourses, setSchoolCourses]=useState();
    const [header, setHeader]=useState();

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Loader */
    const [loader, setLoader]=useState(true);

    /*Navigation */
    const navigation=useNavigate();

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
                    <div className="table-main-container">
                        {!loader ? 
                        <table>
                            <thead>
                                <tr>
                                    {header ? header.map((e, i) => (

                                        <th key={i}>{t(`tableHeaders.${e}`)}</th>

                                    )) : null}
                                </tr>
                            </thead>
                            <tbody>
                                { schoolCourses?.length>0  ? schoolCourses.map((e) => (
                                    <tr key={e.id} onClick={() => {
                                        navigationHandler(e); setLoader(true)
                                    }}>
                                        <td>{e.id}</td>
                                        <td>{e.name}</td>
                                        <td>{e.lang.length > 1 ? e.lang.map(l=>t(`enums.${l}`)).join(", ") : t(`enums.${e.lang.join(', ')}`)}</td>
                                        <td>{t(`enums.${e.status}`)}</td>
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
            </form>
        </div>
        </>
    );
};
export default CoursesList;