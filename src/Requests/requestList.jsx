import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useLoaderData, useNavigate} from "react-router-dom";
import ServiceClient from "../ServiceClient";
import EventHandler from "../EventHandler/eventhandler";
import Table from "../CommonComponents/Table/table";
import {useTranslation} from "react-i18next";

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
                        {loaderData.data ? Object.keys(loaderData.data).map((e) => (
                            <tr key={loaderData.data[e].id} onClick={() => {
                                navigate(`/requests/${loaderData.data[e].id}`);
                                setLoader(true)
                            }}>
                                <td>{loaderData.data[e].id}</td>
                                <td>{`${loaderData.data[e].child_info.first_name} ${loaderData.data[e].child_info.last_name}`}</td>
                                <td>{loaderData.data[e].course_names_and_langs[0].name}</td>
                                <td>{loaderData.data[e].created_at.substring(0, 10)}</td>
                                <td>{t(`enums.${loaderData.data[e].status}`)}</td>
                                <td>{t(`enums.${loaderData.data[e].type}`)}</td>
                            </tr>

                        )) : null}
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

export default RequestList;