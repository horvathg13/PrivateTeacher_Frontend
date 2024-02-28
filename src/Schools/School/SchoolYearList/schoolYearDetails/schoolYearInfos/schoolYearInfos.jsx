import { useContext, useEffect, useLayoutEffect, useState } from "react";
import EventHandler from "../../../../../EventHandler/eventhandler";
import "./schoolYearInfos.css";
import { Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import AreYouSure from "../../../../../CommonComponents/AreYouSure/areyousure";
import ServiceClient from "../../../../../ServiceClient";
import { GrUpdate } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";
import { TabMenuContext, schoolYearDetailsContext } from "../../../../../Context/UserContext";
import TabMenu from "../../../../../CommonComponents/TabMenu/tabMenu";
        
const SchoolYearInfos = () => {
    /*Context */
    const schoolData = useContext(schoolYearDetailsContext);

    /*TabMenu*/
    const {setMenuItems}=useContext(TabMenuContext);
    useEffect(()=>{
        setMenuItems([
            {
                "id":"1",
                "name":"Info",
                "url":`/school/${schoolId}/school-year/${schoolYearId}`,
                "end":true
            },
            {
                "id":"2",
                "name":"Breaks",
                "url":`/school/${schoolId}/school-year/${schoolYearId}/breaks`,
            },
            {
                "id":"3",
                "name":"Special Work Days",
                "url":`/school/${schoolId}/school-year/${schoolYearId}/special-work-days`,
            },
            {
                "id":"4",
                "name":"Courses",
                "url":`/school/${schoolId}/school-year/${schoolYearId}/courses`
            },
            {
                "id":"5",
                "name":"Students",
                "url":""
            }
        ]);
    },[])

    /*datas */
    const [schoolBrakes, setSchoolBrakes]=useState();
    const [specialWorkDays, setSpecialWorkDays]=useState();
    const [header, setHeader]=useState();
    const [selectedRow, setSelectedRow]=useState();
    let { schoolId, schoolYearId }=useParams();
    const [alias, setAlias]=useState();
    const [schoolYear, setSchoolYear]=useState();
    const [schoolYearName, setSchoolYearName]=useState();
    const [schoolYearStart, setSchoolYearStart]=useState();
    const [schoolYearEnd, setSchoolYearEnd]=useState();
    const [readOnly, setReadOnly]=useState(true);
    

    /*Popup control */
   
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
    const [deleteLoader, setDeleteLoader]=useState(true);

    /*Navigation */
    const navigation=useNavigate();
    

    /*button control */
    const [btndisabled, setBtnDisabled]=useState(true);
    

    /*Methods */
    const functionControl=(name)=>{
        
        if(name === 'delete'){
            removeSchoolYear();
            setAreYouSureTransitionProp(false);
        }
        
        setAreYouSureTransitionProp(false);
    }
    
    const getSchoolYearInfos=()=>{
        let url=`http://127.0.0.1:8000/api/school/${schoolId}/school-year-infos/${schoolYearId}`
        ServiceClient.get(url).then((response)=>{
            if(response.status===200){
                setSchoolYear(response.data.year);
                setSchoolYearName(response.data.name);
                setSchoolYearStart(response.data.start);
                setSchoolYearEnd(response.data.end);
                
                setLoader(false);
                setDeleteLoader(false);
            }
        }).catch((error)=>{
            setServerError(error);
            //setLoader(false);
        })
    }

    const updateSchoolYearInfos=(e)=>{
        
        e.preventDefault();
        setLoader(true);
        setBtnDisabled(true);

        let dataPost={};
        dataPost.id=schoolYearId;
        dataPost.year=schoolYear;
        dataPost.name=schoolYearName;
        dataPost.startDate=schoolYearStart;
        dataPost.endDate=schoolYearEnd;

        let url="http://127.0.0.1:8000/api/createSchoolYear";
        ServiceClient.post(url, dataPost).then((response)=>{
            if(response.status===200){
                setLoader(false);
                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                },2000)
                setBtnDisabled(false);
                getSchoolYearInfos();
            }
        }).catch((error)=>{
            setServerError(error);
            setLoader(false);
            setBtnDisabled(false);
        })
    }

    const removeSchoolYear=()=>{
        setDeleteLoader(true);
        let dataPost={};
        dataPost.schoolId=schoolId;
        dataPost.yearId=schoolYearId;
        let url="http://127.0.0.1:8000/api/removeSchoolYear";

        ServiceClient.post(url, dataPost).then((response)=>{
            if(response.status===200){
                setDeleteLoader(false);
                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                },2000)
                
                navigation(`/school/${schoolId}/school-year-list`);
            }
        }).catch((error)=>{
            setServerError(error);
            setDeleteLoader(false);
        })
    }
    
    useLayoutEffect(()=>{
        getSchoolYearInfos();
    },[]);
   
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
        answer={(name)=> functionControl(name)}
        transitionProp={areYouSureTransitionProp}/>

        {/*<SchoolYearDetailsPopup 
        title={title}
        update={updatePopup}
        loader={loader}
        btndisabled={btndisabled}
        transitionProp={transitionProp}
        closeModal={(data)=>{if(data===true){setTransitionProp(!transitionProp); setSelectedRow("")}}}
        fn_alias={alias}
        emitData={(dataForm, fn_alias)=>functionControl(dataForm, fn_alias)}
        selected={selectedRow}/>*/}
    <div className="content-main-container">
        
        <div className="title"><h2>School Year Info <MdEdit className='icon formIcon' onClick={()=>[setReadOnly(!readOnly), setBtnDisabled(!btndisabled)]}/> </h2></div>
            <form onSubmit={(e)=>updateSchoolYearInfos(e)} className="SchoolForm">
                
                <div className="school-form flex">

                    <div className="flex">
                        <label>Year</label>
                        <input type="text" 
                        required 
                        onChange={(e)=>{setSchoolYear(e.target.value)}}
                        value={schoolYear}
                        readOnly={readOnly}/>
                    </div>    

                    <div className="flex">
                        <label>Name</label>
                        <input type="text" 
                        required 
                        onChange={(e)=>{setSchoolYearName(e.target.value)}}
                        value={schoolYearName}
                        readOnly={readOnly}/>
                    </div>
                    
                   
                    <div className="flex">
                        <label>Start</label>
                        <input type="date"
                        required  
                        onChange={(e)=>{setSchoolYearStart(e.target.value)}}
                        value={schoolYearStart}
                        readOnly={readOnly}/>
                    </div>
                   
                    <div className="flex">
                        <label>End</label>
                        <input
                        type="date" 
                        required  
                        onChange={(e)=>{setSchoolYearEnd(e.target.value)}}
                        value={schoolYearEnd}
                        readOnly={readOnly}/>
                    </div>
                    
                </div>
                
                {!loader ?
                    <button 
                    type='submit' 
                    disabled={btndisabled} 
                    className={readOnly ? 'formBtnDisabled':'btn formButton' }>
                       <GrUpdate  className='btn-icon'/> Update 
                    </button>:
                    <span className='loader schoolDetails'></span>
                }
                {!deleteLoader ?
                    <button
                    type="button"
                    disabled={btndisabled} 
                    className={readOnly ? 'formBtnDisabled':'btn formButton' }
                    onClick={()=>{setAreYouSureName("delete"); setAreYouSureTransitionProp(true)}}>
                       <FaTrashAlt   className='btn-icon'/> Delete 
                    </button>:
                    <span className='loader schoolDetails'></span>
                }
            </form>
            <Outlet/>
        </div>
        </>
    );
};
export default SchoolYearInfos;