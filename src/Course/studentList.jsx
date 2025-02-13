import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import EventHandler from "../EventHandler/eventhandler";

const StudentList = () => {

    /*Translation*/
    const {t}=useTranslation();
    /*dataLoader */
    const dataLoader=useLoaderData();
    useEffect(()=>{
        if(dataLoader){
            setHeader(dataLoader.header);
            setStudents(dataLoader.data);
            setLoader(false);
        }else{
            setHeader("");
            setLoader(false);
        }
    },[]);

    /*data */
    const [students, setStudents]=useState();
    const [header, setHeader]=useState();
    const {courseId}=useParams();

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
        let studentId= e.id
        navigation(`/course/${courseId}/student/${e.id}`);
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

                                            <th key={i}>{t(`tableHeaders.${e}`)}</th>


                                        )) : null}
                                    </tr>

                                    </thead>
                                    <tbody>
                                    { students?.length>0  ? students.map((e) => (
                                            <tr key={e.id} onClick={() => {
                                                navigationHandler(e); setLoader(true)
                                            }}>
                                                <td>{e.id}</td>
                                                <td>{e.first_name}</td>
                                                <td>{e.last_name}</td>
                                                <td>{e.birthday}</td>
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

export default StudentList;