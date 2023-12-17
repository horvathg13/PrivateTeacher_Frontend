import { MdEdit } from "react-icons/md";
import "./schoolYearList.css";
import { FaCirclePlus } from "react-icons/fa6";
import Table from "../../../CommonComponents/Table/table";
import { Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom";
import SideMenu from "../../../CommonComponents/SideMenu/sidemenu";
import { useContext, useLayoutEffect, useState } from "react";
import EventHandler from "../../../EventHandler/eventhandler";
import ServiceClient from "../../../ServiceClient";
        
const SchoolYearList = () => {
    /*Datas */
    const [counter, setCounter]=useState(1);
    const [lastPage, setLastPage]=useState();
    const [perPage, setPerPage]=useState(5);
    const [selectedRow, setSelectedRow]=useState();
    let { schoolId }=useParams();
    const [schoolYears, setSchoolYears]=useState();

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Loader */
    const [loader, setLoader]=useState(true);

    /*Navigation */
    const navigation=useNavigate();

    /*Methods */
    const pageCounter=(data)=>{
        switch (data){
            case 'next': return setCounter(counter+1);
            case 'prev': if(counter >1){return setCounter(counter-1)}else{return null};
            case 'last': return setCounter(lastPage);
            case 'first':return setCounter(1);
            default: return counter;
        }
    }

    useLayoutEffect(()=>{
        let url=`http://127.0.0.1:8000/api/school-year-list/${schoolId}?perPage=${perPage}&page=${counter}`;
        ServiceClient.post(url).then((response)=>{
            if(response.status===200){
                setLoader(false);
                setSchoolYears(response.data);
                setLastPage(response.data.pagination.lastPageNumber)
                console.log(response.data)
            }
        }).catch((error)=>{
            setServerError(error);
            setLoader(false);
        })
       
    },[counter, perPage])
    return (
        <>
        <EventHandler 
            success={success} 
            errors={errors} 
            serverError={serverError} 
            closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>
        <div className="content-main-container">
            <div className="table-main-container">
                <Table 
                datas={schoolYears ? schoolYears : null}
                loader={loader}
                page={pageCounter}
                perPage={setPerPage}
                selectedRow={(e)=>[setSelectedRow(e)]}/>
            </div>
            <Outlet/>
        </div>
        </>
        
        
    );
};
export default SchoolYearList;