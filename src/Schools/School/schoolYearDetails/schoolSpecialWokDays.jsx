import { useEffect, useLayoutEffect, useState } from "react";
import EventHandler from "../../../EventHandler/eventhandler";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import SchoolYearDetailsPopup from "./schoolYearDetailsPopup";
import AreYouSure from "../../../CommonComponents/AreYouSure/areyousure";
import ServiceClient from "../../../ServiceClient";
import school from "../school";
import {useTranslation} from "react-i18next";
        
const SchoolSpecialWorkDays = () => {
    /*Translation*/
    const {t}=useTranslation();
    /*dataLoader */
    const dataLoader=useLoaderData();
    useEffect(()=>{
        if(dataLoader){
            setHeader(dataLoader.header);
            setSpecialWorkDays(dataLoader.specialWorkDays);
            setLoader(false);
        }else{
            setHeader("");
            setSpecialWorkDays("Something went wrong!");
            setLoader(false);
        }
    },[]);

    /*datas */
    const [specialWorkDays, setSpecialWorkDays]=useState();
    const [header, setHeader]=useState();
    const [selectedRow, setSelectedRow]=useState();
    let { schoolId, schoolYearId }=useParams();
    const [alias, setAlias]=useState();
   
    /*Popup control */
    const [specialWorkDaysPopup, setSpecialWorkDaysPopup]=useState();
    const [title, setTitle]=useState("Update");
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
        if(fn_alias==="specWorkDay"){
            createSpecialWorkDay(dataForm);
            
        }else if(name === 'deleteSpecWorkDay'){
            removeSpecialWorkDay();
            setAreYouSureTransitionProp(false);
        }else{
            setAreYouSureTransitionProp(false);
        }
    }
    
    const getSpecialWorkDays=()=>{
        ServiceClient.getSchoolBreaksAndScpecialWorkDays(schoolId,schoolYearId).then((success)=>{
            setHeader(success.header);
            setSpecialWorkDays(success.specialWorkDays);
            setLoader(false);
        }).catch((error)=>{
            setServerError(error);
            //setLoader(false);
        })
    }
    
    const createSpecialWorkDay=(dataForm)=>{
        ServiceClient.createSpecialWorkDay(dataForm.schoolId, dataForm.yearId, dataForm.name, dataForm.start, dataForm.end,dataForm.id).then((success)=>{
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            },2000)
            getSpecialWorkDays();
            setSelectedRow("");
            setTransitionProp(false);
        }).catch((error)=>{
            setServerError(error);
        })
    }
    
    const removeSpecialWorkDay=()=>{
        ServiceClient.removeSpecialWorkDay(schoolId,schoolYearId,selectedRow.id).then((success)=>{
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            },2000)
            getSpecialWorkDays();
            setSelectedRow("");
            setTransitionProp(false);
        }).catch((error)=>{
            setServerError(error);
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
        <div>
            <form>
                <div>
                    <div className="form-title">
                        <FaPlus className='table-action-icon' onClick={() => [
                            setTitle("Add special work day"),
                            setUpdatePopup(false),
                            setAlias("specWorkDay"),
                            setTransitionProp(true),
                            setSelectedRow("")
                        ]} />
                    </div>
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
                                        <td colSpan={5} className="no-school">{t('empty-table')}</td>
                                    </tr>
                                </>}
                            </tbody>
                        </table> : <span className='loader table'></span>}
                    </div>
                </div>
            </form>
        </div>
        </>
    );
};
export default SchoolSpecialWorkDays;