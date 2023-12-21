import { MdEdit } from "react-icons/md";
import "./schoolYearList.css";
import "../../../CommonComponents/Table/table.css"
import { FaCirclePlus } from "react-icons/fa6";
import Table from "../../../CommonComponents/Table/table";
import { Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom";
import SideMenu from "../../../CommonComponents/SideMenu/sidemenu";
import { useContext, useLayoutEffect, useState } from "react";
import EventHandler from "../../../EventHandler/eventhandler";
import ServiceClient from "../../../ServiceClient";
import { FaPlus } from "react-icons/fa";
import AddSchoolYear from "./AddSchoolYear/addSchoolYear";
        
const SchoolYearList = () => {
    /*Datas */
    const [counter, setCounter]=useState(1);
    const [lastPage, setLastPage]=useState();
    const [perPage, setPerPage]=useState(5);
    const [selectedRow, setSelectedRow]=useState();
    let { schoolId }=useParams();
    const [schoolYears, setSchoolYears]=useState();
    const [transitionProp, setTransitionProp]=useState(false);
    const [btndisabled, setBtnDisabled]=useState(false);

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Loader */
    const [loader, setLoader]=useState(true);
    const [formLoader, setFormLoader]=useState(false);

    /*Navigation */
    const navigation=useNavigate();

    /*Methods */
    const getSchoolYears=()=>{
        let url=`http://127.0.0.1:8000/api/school-year-list/${schoolId}`;
        ServiceClient.post(url).then((response)=>{
            if(response.status===200){
                setLoader(false);
                setSchoolYears(response.data);
                //console.log(response.data)
            }
        }).catch((error)=>{
            setServerError(error);
            setLoader(false);
        })
    }

    useLayoutEffect(()=>{
        getSchoolYears();
    },[])

    const CreateSchoolYear=(dataForm)=>{
        setFormLoader(true);
        setBtnDisabled(true);
        console.log(dataForm)
        let url="http://127.0.0.1:8000/api/createSchoolYear";
        ServiceClient.post(url, dataForm).then((response)=>{
            if(response.status===200){
                setFormLoader(false);
                setBtnDisabled(false);
                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                },2000)
                getSchoolYears();
            }
        }).catch((error)=>{
            setServerError(error);
            setLoader(false);
            setBtnDisabled(false)
        })
        

    }

    return (
        <>
        <EventHandler 
            success={success} 
            errors={errors} 
            serverError={serverError} 
            closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}
        />
        <AddSchoolYear 
            transitionProp={transitionProp}
            closeModal={(data)=>{if(data===true){setTransitionProp(!transitionProp); setFormLoader(false); setBtnDisabled(false)}}}
            emitData={(dataForm)=>{CreateSchoolYear(dataForm)}}
            loader={formLoader}
            btndisabled={btndisabled}
        />  
        <div className="content-main-container">
            
            <div className="table-main-container">
                {!loader ? 
                <table>
                    <thead>
                        <tr>
                            {schoolYears.header ? Object.keys(schoolYears.header).map((e, i) => (

                                <th key={i}>{e}</th>
                                

                            )) : null}

                        </tr>

                    </thead>
                    <tbody>
                        { schoolYears.data?.map((e) => (
                            <tr key={e.id} onClick={() => selectedRow(e)}>
                            { Object.values(e).map((j=>
                                <td>{j}</td>
                            ))}
                            </tr>
                        ))}
                        {schoolYears.data.length===0 ?
                        <tr>
                             <td colSpan={5} className="no-school" >No registered school year in this school.</td>
                        </tr>:null}
                        <tr>
                            <td><FaPlus className='table-action-icon' onClick={()=>setTransitionProp(true)}/></td>
                        </tr>
                    </tbody>
                </table> : <span className='loader table'></span>}
                {/*<Table 
                datas={schoolYears ? schoolYears : null}
                loader={loader}
                page={pageCounter}
                perPage={setPerPage}
                selectedRow={(e)=>[setSelectedRow(e)]}/>*/}
            </div>
            <Outlet/>
        </div>
        </>
        
        
    );
};
export default SchoolYearList;