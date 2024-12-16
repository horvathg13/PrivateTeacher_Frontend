import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useLoaderData, useNavigate} from "react-router-dom";
import EventHandler from "../EventHandler/eventhandler";

const ChildCourses = () => {
    /*Translation*/
    const {t}=useTranslation();

    /*Data*/
    const loaderData=useLoaderData();
    const [loader, setLoader]=useState(true);
    const [selectedRow, setSelectedRow]=useState();

    /*Navigation*/
    const navigate = useNavigate();

    /*Event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Methods: */

    useEffect(()=>{
        if(loaderData){
            setLoader(false);
        }
    },[selectedRow])
    return (
        <div>

            <EventHandler
                success={success}
                errors={errors}
                serverError={serverError}
                closeErrorMessage={(data) => {
                    if (data === true) {
                        setErrors([])
                    }
                }}
            />
            <div className="table-main-container">
                {!loader ?
                    <table>
                        <thead>
                        <tr>
                            {loaderData.header ? loaderData.header.map((e, i) => (

                                <th key={i}>{t(`tableHeaders.${e}`)}</th>


                            )) : null}
                        </tr>

                        </thead>
                        <tbody>
                        {loaderData.data?.map((e,i) => (
                            <tr key={i} onClick={() => navigate(`/course/profile/${e.teacher_course_id}`)}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.teacher}</td>
                                <td>{t(`enums.${e.status}`)}</td>
                            </tr>
                        ))}
                        {loaderData.data.length === 0 ?
                            <tr>
                                <td colSpan={5} className="no-school">{t('empty-table')}</td>
                            </tr> : null}
                        </tbody>
                    </table> : <span className='loader table'></span>}
            </div>
        </div>
    );

};

export default ChildCourses;