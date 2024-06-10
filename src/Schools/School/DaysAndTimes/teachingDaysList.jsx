import React from 'react';
import { useContext, useLayoutEffect, useState } from "react";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import ServiceClient from "../../../ServiceClient";
import EventHandler from "../../../EventHandler/eventhandler";
import {FaPlus} from "react-icons/fa";
import AddTeachingDay from "./addTeachingDay";
import {useTranslation} from "react-i18next";
const TeachingDaysList =()=> {
    /*Translation*/
    const {t}=useTranslation();
    /*Data */
    const daysAndTimes = useLoaderData();
    const [selectedRow, setSelectedRow]=useState();
    let { schoolId, schoolYearId }=useParams();
    const [transitionProp, setTransitionProp]=useState();
    const [showAddTeachingDay, setShowAddTeachingDay]=useState(false);

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Loader */
    const [loader, setLoader]=useState(false);
    const [formLoader, setFormLoader]=useState(false);

    /*Navigation */
    const navigation=useNavigate();

    /*Methods */
    const RowClickHandle=(e)=>{
        // navigation(`/school/${schoolId}/school-year/${e?.id}`);
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
                <div className="title">
                    <FaPlus className='table-action-icon' onClick={()=>navigation(`/school/${schoolId}/school-year/${schoolYearId}/create-teaching-day`)}/>
                </div>

                <div className="table-main-container">
                    {!loader ?

                        <table>
                            <thead>
                            <tr>
                                {daysAndTimes.header ? Object.keys(daysAndTimes.header).map((e, i) => (

                                    <th key={i}>{e}</th>


                                )) : null}
                            </tr>

                            </thead>
                            <tbody>
                            { daysAndTimes.data?.map((e) => (
                                <tr key={e.id} onClick={() => {setSelectedRow(e);  RowClickHandle(e) }}>
                                    { Object.values(e).map((j=>
                                            <td>{j}</td>
                                    ))}
                                </tr>

                            ))}
                            {daysAndTimes.data?.length===0 ?
                                <tr>
                                    <td colSpan={5} className="no-school" >{t('empty-table')}</td>
                                </tr>:null}

                            </tbody>
                        </table> : <span className='loader table'></span>}

                </div>

            </div>
        </>
    );
}

export default TeachingDaysList;