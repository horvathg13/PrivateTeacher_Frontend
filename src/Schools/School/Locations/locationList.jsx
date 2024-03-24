import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ServiceClient from "../../../ServiceClient";
import EventHandler from "../../../EventHandler/eventhandler";
import Table from "../../../CommonComponents/Table/table";

const LocationList = () => {
    /*Data*/
    const schoolId = useParams()
    const [locations, setLocations]=useState({});
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
        setLoader(true);
        let url=`http://127.0.0.1:8000/api/getLocations?perPage=${perPage}&page=${counter}`;
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
        })
    },[counter, perPage])

    useEffect(()=>{
        if(selectedRow){
            navigate(`/school/${schoolId}/location/${selectedRow.id}`)
        }

    },[selectedRow])
    return (
        <div className="content-main-container">

            <EventHandler
                success={success}
                errors={errors}
                serverError={serverError}
                closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>

            <div className="table-main-container">
                <Table
                    datas={locations ? locations :null}
                    loader={loader}
                    page={pageCounter}
                    perPage={setPerPage}
                    selectedRow={(e)=>[setSelectedRow(e)]}/>
            </div>

        </div>


    );
};

export default LocationList;