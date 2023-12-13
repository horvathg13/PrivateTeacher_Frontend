import "./schoolList.css";
import EventHandler from "../../EventHandler/eventhandler";
import Table from "../../CommonComponents/Table/table";
import { useEffect, useLayoutEffect, useState } from "react";
import ServiceClient from "../../ServiceClient";
import { useNavigate } from "react-router-dom";
        
const SchoolList = () => {
    /*Datas*/
    const [schools, setSchools]=useState();
    const [counter, setCounter]=useState(1);
    const [lastPage, setLastPage]=useState();
    const [perPage, setPerPage]=useState(5);
    const [selectedRow, setSelectedRow]=useState();
    

    /*Navigation */
    const navigation=useNavigate();

    /*Loader */
    const [loader, setLoader]=useState(true);

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

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
        
        let url=`http://127.0.0.1:8000/api/schools-list?perPage=${perPage}&page=${counter}`;
        ServiceClient.post(url).then((response)=>{
            if(response.status===200){
                setLoader(false);
                setSchools(response.data);
                setLastPage(response.data.pagination.lastPageNumber)
                console.log(response.data)
            }
        }).catch((error)=>{
            setServerError(error);
            setLoader(false);
        })
    },[counter, perPage])

    useEffect(()=>{console.log(schools)},[schools])
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
                datas={schools ? schools : null}
                loader={loader}
                page={pageCounter}
                perPage={setPerPage}
                selectedRow={(e)=>[setSelectedRow(e)]}/>
            </div>
            
        </div>
        </>
    );
};
export default SchoolList;