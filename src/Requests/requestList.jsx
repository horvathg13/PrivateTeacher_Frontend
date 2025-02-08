import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useLoaderData, useNavigate} from "react-router-dom";
import ServiceClient from "../ServiceClient";
import EventHandler from "../EventHandler/eventhandler";
import Table from "../CommonComponents/Table/table";
import {useTranslation} from "react-i18next";
import i18next from "i18next";

const RequestList = () => {
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
        if(selectedRow){
            navigate(`/requests/${selectedRow.id}`)
        }
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
                        {loaderData.data ? loaderData.data.map((e,i) => (
                            <tr key={i} onClick={() => {
                                navigate(`/requests/${e.id}`);
                                setLoader(true)
                            }}>
                                <td>{e.id}</td>
                                <td>{`${e.child_info.first_name} ${e.child_info.last_name}`}</td>
                                <td>{e.course_names_and_langs.filter(e=>e.lang === i18next.language).length>0 ?
                                    e.course_names_and_langs.filter(e=>e.lang === i18next.language).map(j=> j.name)
                                :e.course_names_and_langs.map(j=>j.name)}</td>
                                <td>{e.created_at.substring(0, 10)}</td>
                                <td>{t(`enums.${e.status}`)}</td>
                                <td>{t(`enums.${e.type}`)}</td>
                            </tr>

                        )) : null}
                        {loaderData.data.length === 0 ?
                            <tr>
                                <td colSpan={6} className="no-school">{t('empty-table')}</td>
                            </tr> : null}
                        </tbody>
                    </table> : <span className='loader table'></span>}
            </div>
        </div>
    );
};

export default RequestList;