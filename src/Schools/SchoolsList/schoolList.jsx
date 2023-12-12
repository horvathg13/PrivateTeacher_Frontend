import "./schoolList.css";
import EventHandler from "../../EventHandler/eventhandler";
import Table from "../../CommonComponents/Table/table";
import { useState } from "react";
        
const SchoolList = () => {
    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);
   
    return (
        <>
        <EventHandler 
            success={success} 
            errors={errors} 
            serverError={serverError} 
            closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>
        <div className="content-main-container">
            
            
            <div className="table-main-container">
                {/*<Table 
                datas={users ? users :null}
                loader={loader}
                page={pageCounter}
                perPage={setPerPage}
    selectedRow={(e)=>[setSelectedRow(e)]}/>*/}
            </div>
            
        </div>
        </>
    );
};
export default SchoolList;