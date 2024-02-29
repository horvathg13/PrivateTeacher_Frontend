import { useEffect, useLayoutEffect, useState } from "react";
import EventHandler from "../../../../../EventHandler/eventhandler";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import SchoolYearDetailsPopup from "../Popup/popup";
import AreYouSure from "../../../../../CommonComponents/AreYouSure/areyousure";
import ServiceClient from "../../../../../ServiceClient";
        
const SchoolBreaks = () => {

    /*dataLoader */
    const dataLoader=useLoaderData();
    useEffect(()=>{
        if(dataLoader){
            console.log(dataLoader, "Hopp");
            setHeader(dataLoader.header);
            setSchoolBreaks(dataLoader.breaks);
            setLoader(false);
        }else{
            console.log(dataLoader, "Hopp");
            setHeader("");
            setSchoolBreaks("Something went wrong!");
            setLoader(false);
        }
    },[]);

    /*datas */
    const [schoolBreaks, setSchoolBreaks]=useState();
    const [header, setHeader]=useState();
    const [selectedRow, setSelectedRow]=useState();
    let { schoolId, schoolYearId }=useParams();
    const [alias, setAlias]=useState();
   
    /*Popup control */
    const [schoolBrakesPopup, setSchoolBrakesPopup]=useState();
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
            removeSchoolBreak();
            setAreYouSureTransitionProp(false);
        }else if(fn_alias==="break"){
            createSchoolBreak(dataForm);
        }
        setAreYouSureTransitionProp(false);
        
    }
    
    const getSchoolBreaks=()=>{
        let url=`http://127.0.0.1:8000/api/school/${schoolId}/school-year-details/${schoolYearId}`
        ServiceClient.get(url).then((response)=>{
            if(response.status===200){
                console.log(response.data[0].specialWorkDays)
                setHeader(response.data[0].header);
                setSchoolBreaks(response.data[0].breaks);
                
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
                getSchoolBreaks();
                setSelectedRow("");
                setTransitionProp(false);
            }
        }).catch((error)=>{
            setServerError(error);
        })
    }
    
    const removeSchoolBreak=()=>{
        
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
                getSchoolBreaks();
                setSelectedRow("");
                setTransitionProp(false);
            }
        }).catch((error)=>{
            setServerError(error);
        })
    }
    
   /* useLayoutEffect(()=>{
        getSchoolBreaks();
    },[])*/
    
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
                                { schoolBreaks?.length>0  ? schoolBreaks.map((e) => (
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
                
            </form>
        </div>
        </>
    );
};
export default SchoolBreaks;