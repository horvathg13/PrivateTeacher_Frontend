import { useEffect, useLayoutEffect, useState } from "react";
import EventHandler from "../../../../EventHandler/eventhandler";
import "./schoolYearDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import SchoolYearDetailsPopup from "./Popup/popup";
import AreYouSure from "../../../../CommonComponents/AreYouSure/areyousure";
import ServiceClient from "../../../../ServiceClient";
        
const SchoolYearDetails = () => {
    /*datas */
    const [schoolBrakes, setSchoolBrakes]=useState();
    const [specialWorkDays, setSpecialWorkDays]=useState();
    const [header, setHeader]=useState();
    const [selectedRow, setSelectedRow]=useState();
    let { schoolId, schoolYearId }=useParams();
    const [alias, setAlias]=useState();
   
    /*Popup control */
    const [schoolBrakesPopup, setSchoolBrakesPopup]=useState();
    const [specialWorkDaysPopup, setSpecialWorkDaysPopup]=useState();
    const [title, setTitle]=useState();
    const [updatePopup, setUpdatePopup]=useState();
    const [transitionProp, setTransitionProp]=useState(false);
    const [showAreYouSure, setShowAreYouSure]=useState(false);
    const [AreYouSureName, setAreYouSureName]=useState('');
    const [areYouSureTransitionProp, setAreYouSureTransitionProp]=useState(false);


    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Loader */
    const [loader, setLoader]=useState(true);
    const [formLoader, setFormLoader]=useState(false);

    /*Navigation */
    const navigation=useNavigate();

    /*button control */
    const [btndisabled, setBtnDisabled]=useState(false);

    /*Methods */
    const functionControl=(dataForm, fn_alias, name)=>{
        console.log(dataForm, fn_alias, name);
        if(name === 'deleteBreak'){
            console.log("HEYHÜ");
            removeSchoolBreak();
            console.log("Enter the hook");
            setAreYouSureTransitionProp(false);
        }else if(fn_alias==="break"){
            createSchoolBreak(dataForm);
            
        }else if(fn_alias==="specWorkDay"){
            createSpecialWorkDay(dataForm);
            
        }else if(name === 'deleteSpecWorkDay'){
            removeSpecialWorkDay();
            setAreYouSureTransitionProp(false);
            console.log("Enter");
        }else{
            setAreYouSureTransitionProp(false);
        }
        
        
    }
    
    const getSchoolYearDetails=()=>{
        let url=`http://127.0.0.1:8000/api/school/${schoolId}/school-year-details/${schoolYearId}`
        ServiceClient.get(url).then((response)=>{
            if(response.status===200){
                console.log(response.data[0].specialWorkDays)
                setHeader(response.data[0].header);
                setSchoolBrakes(response.data[0].breaks);
                setSpecialWorkDays(response.data[0].specialWorkDays);

                setLoader(false);

            }
        }).catch((error)=>{
            setServerError(error);
            //setLoader(false);
        })
    }
    const createSchoolBreak=(dataForm)=>{
        let url="http://127.0.0.1:8000/api/createSchoolBreak";
        ServiceClient.post(url,dataForm).then((response)=>{
            if(response.status===200){
                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                },2000)
                getSchoolYearDetails();
                setSelectedRow("");
                setTransitionProp(false);
            }
        }).catch((error)=>{
            setServerError(error);
        })
    }
    const createSpecialWorkDay=(dataForm)=>{
        let url="http://127.0.0.1:8000/api/createSpecialWorkDay";
        ServiceClient.post(url,dataForm).then((response)=>{
            if(response.status===200){
                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                },2000)
                getSchoolYearDetails();
                setSelectedRow("");
                setTransitionProp(false);
            }
        }).catch((error)=>{
            setServerError(error);
        })
    }
    const removeSchoolBreak=()=>{
        console.log("Heyhó");
        let url="http://127.0.0.1:8000/api/removeSchoolBreak";
        let dataPost={};
        dataPost.schoolId=selectedRow.school_id;
        dataPost.yearId=selectedRow.school_year_id;
        dataPost.id=selectedRow.id;

        ServiceClient.post(url,dataPost).then((response)=>{
            if(response.status===200){
                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                },2000)
                getSchoolYearDetails();
                setSelectedRow("");
                setTransitionProp(false);
            }
        }).catch((error)=>{
            setServerError(error);
        })
    }
    const removeSpecialWorkDay=()=>{
        let url="http://127.0.0.1:8000/api/removeSpecialWorkDay";
        let dataPost={};
        dataPost.schoolId=selectedRow.school_id;
        dataPost.yearId=selectedRow.school_year_id;
        dataPost.id=selectedRow.id;

        ServiceClient.post(url,dataPost).then((response)=>{
            if(response.status===200){
                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                },2000)
                getSchoolYearDetails();
                setSelectedRow("");
                setTransitionProp(false);
            }
        }).catch((error)=>{
            setServerError(error);
        })
    }
    useLayoutEffect(()=>{
        getSchoolYearDetails();
    },[])
    return (
        <>
        <EventHandler
            success={success} 
            errors={errors} 
            serverError={serverError} 
            closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}
        />
        <AreYouSure
        name={AreYouSureName}
        answer={(name)=> functionControl(null,null,name)}
        transitionProp={areYouSureTransitionProp}/>

        <SchoolYearDetailsPopup 
        title={title}
        update={updatePopup}
        loader={loader}
        btndisabled={btndisabled}
        transitionProp={transitionProp}
        closeModal={(data)=>{if(data===true){setTransitionProp(!transitionProp); setSelectedRow("")}}}
        fn_alias={alias}
        emitData={(dataForm, fn_alias)=>functionControl(dataForm, fn_alias)}
        selected={selectedRow}/>
        <div className="content-main-container">
            <form className="flex">
                <div className="school-breaks-container">
                    <div className="form-title"><h2>School Breaks</h2></div>
                    <div className="table-main-container">
                        {!loader ? 
                        <table>
                            <thead>
                                <tr>
                                    {header ? header.map((e, i) => (

                                        <th key={i}>{e}</th>
                                        

                                    )) : null}
                                    <th></th>
                                    
                                </tr>

                            </thead>
                            <tbody>
                                { schoolBrakes?.length>0  ? schoolBrakes.map((e) => (
                                    <tr key={e.id} onClick={() => setSelectedRow(e)}>
                                    
                                        <td>{e.id}</td>
                                        <td>{e.name}</td>
                                        <td>{e.start}</td>
                                        <td>{e.end}</td>
                                    
                                        <td>
                                            <MdDelete className='table-action-icon' onClick={() => [
                                                setSelectedRow(e), 
                                                setAreYouSureName("deleteBreak"), 
                                                setAreYouSureTransitionProp(true)
                                            ]}/>
                                            <MdEdit className='table-action-icon' onClick={() => [
                                                setSelectedRow(e), 
                                                console.log(selectedRow), 
                                                setUpdatePopup(true), 
                                                setAlias("break"), 
                                                setTitle("Update"), 
                                                setTransitionProp(true)
                                            ]}/>
                                        </td>
                                    </tr>

                                )) :
                                <>
                                    <tr>
                                        <td colSpan={5} className="no-school">No registered school break in this school.</td>
                                    </tr>
                                 </>}    
                                <tr className="addNewTableRow">
                                    <td><FaPlus className='table-action-icon' onClick={() => [
                                        setTitle("Add school brake"),
                                        setUpdatePopup(false),
                                        setAlias("break"),
                                        setTransitionProp(true), 
                                        setSelectedRow(""),
                                        console.log(selectedRow)
                                    ]}/></td>
                                </tr>
                            
                            </tbody>
                        </table> : <span className='loader table'></span>}
                        
                    </div>
                </div>
                <div className="special-work-days-container">
                    <div className="form-title"><h2>Special Work Days</h2></div>
                    <div className="table-main-container">
                        {!loader ? 
                        <table>
                            <thead>
                                <tr>
                                    {header ? header.map((e, i) => (

                                        <th key={i}>{e}</th>
                                        

                                    )) : null}
                                    <th></th>
                                </tr>

                            </thead>
                            <tbody>
                                { specialWorkDays?.length>0 ? specialWorkDays.map((e) => (
                                    <tr key={e.id} onClick={() => setSelectedRow(e)}>
                                    
                                        <td>{e.id}</td>
                                        <td>{e.name}</td>
                                        <td>{e.start}</td>
                                        <td>{e.end}</td>
                                    
                                    <td>
                                        <MdDelete className='table-action-icon' onClick={() => {
                                            setSelectedRow(e); 
                                            setAreYouSureName("deleteSpecWorkDay"); 
                                            setAreYouSureTransitionProp(true)
                                        }}/>
                                        <MdEdit  className='table-action-icon'onClick={() => {
                                            setSelectedRow(e); 
                                            setUpdatePopup(true); 
                                            setTransitionProp(true); 
                                            setAlias("specWorkDay");
                                        }}/>
                                    </td>
                                    </tr>

                                )):
                                
                                <>
                                    <tr>
                                        <td colSpan={5} className="no-school">No registered special work days in this school.</td>
                                    </tr>
                                </>}
                                <tr className="addNewTableRow">
                                    <td><FaPlus className='table-action-icon' onClick={() => [
                                        setTitle("Add special work day"),
                                        setUpdatePopup(false), 
                                        setAlias("specWorkDay"),
                                        setTransitionProp(true), 
                                        setSelectedRow("")
                                    ]} /></td>
                                </tr>
                               
                            </tbody>
                        </table> : <span className='loader table'></span>}
                        
                    </div>
                </div>
            </form>
        </div>
        </>
    );
};
export default SchoolYearDetails;