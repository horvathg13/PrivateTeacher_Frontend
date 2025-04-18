import React, {useEffect, useState} from 'react';
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import ServiceClient from "../../ServiceClient";
import EventHandler from "../../EventHandler/eventhandler";
import Table from "../../CommonComponents/Table/table";
import {FaPlus} from "react-icons/fa";
import {useTranslation} from "react-i18next";

const LocationList = () => {
    /*Translation*/
    const {t}=useTranslation();
    /*Data*/
    const {schoolId} = useParams();
    const schoolLocations=useLoaderData();

    const [selectedRow, setSelectedRow]=useState();

    /*Loader*/
    const [loader, setLoader]=useState(false);

    /*Pagination*/
    const [counter, setCounter]=useState(1);
    const [lastPage, setLastPage]=useState();
    const [perPage, setPerPage]=useState(5);

    /*Navigation*/
    const navigate = useNavigate();

    /*Event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Methods: */
    const pageCounter=(data)=>{
        switch (data){
            case 'next': return setCounter(counter+1);
            case 'prev': if(counter >1){return setCounter(counter-1)}else{return null};
            case 'last': return setCounter(lastPage);
            case 'first':return setCounter(1);
            default: return counter;
        }
    }

    useEffect(()=>{
        /*setLoader(true);
        let url=`/api/getLocations?perPage=${perPage}&page=${counter}`;
        ServiceClient.post(url).then((response)=>{
            if(response.status===200){
                setLoader(false);
                setLocations(response.data);
                setLastPage(response.data.pagination.lastPageNumber)
                console.log(response.data)
            }
        }).catch((error)=>{
            setServerError(error);
            setLoader(false);
        })*/
    },[counter, perPage])

    useEffect(()=>{
        if(selectedRow){
            navigate(`/school/${schoolId}/location/${selectedRow.id}`)
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
                }}/>

            <div className="table-main-container">
                <div className="formTitle">
                </div>
                {!loader ?
                    <table>
                        <thead>
                        <tr>
                            {schoolLocations.header ? schoolLocations.header.map((e, i) => (

                                <th key={i}>{t(`tableHeaders.${e}`)}</th>


                            )) : null}
                        </tr>

                        </thead>
                        <tbody>
                        {schoolLocations.data?.length > 0 ? schoolLocations.data.map((e, i) => (
                                <tr key={i}>
                                    {Object.values(e).map(j =>
                                        <td onClick={()=> {
                                            navigate(`/location/${e.id}`);
                                            setLoader(true)
                                        }}>{j}</td>
                                    )}
                                </tr>
                            )) :
                            <>
                                <tr>
                                    <td colSpan={9} className="no-school">{t('empty-table')}
                                    </td>
                                </tr>
                            </>}
                        </tbody>
                    </table> : <span className='loader table'></span>}
            </div>
        </div>


    )
        ;
};

export default LocationList;