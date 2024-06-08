import { useContext, useEffect, useLayoutEffect, useState } from "react";
import EventHandler from "../../../EventHandler/eventhandler";
import { Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import AreYouSure from "../../../CommonComponents/AreYouSure/areyousure";
import ServiceClient from "../../../ServiceClient";
import { GrUpdate } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";
import { TabMenuContext, schoolYearDetailsContext } from "../../../Context/UserContext";
import TabMenu from "../../../CommonComponents/TabMenu/tabMenu";
import Select from "react-select";
        
const SchoolYearInfos = () => {
    /*Context */
    const [schoolData, statuses] = useContext(schoolYearDetailsContext);

    /*TabMenu*/
    /*const {setMenuItems}=useContext(TabMenuContext);
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
    },[])*/

    /*datas */
    let { schoolId, schoolYearId }=useParams();

    /*Form fields*/
    const [schoolYear, setSchoolYear]=useState(schoolData.year);
    const [schoolYearName, setSchoolYearName]=useState(schoolData.name);
    const [schoolYearStart, setSchoolYearStart]=useState(schoolData.start);
    const [schoolYearEnd, setSchoolYearEnd]=useState(schoolData.end);
    const [schoolYearStatus, setSchoolYearStatus]=useState(schoolData.status);
    const [selectedStatus, setSelectedStatus]=useState();
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
    const [loader, setLoader]=useState(false);
    const [formLoader, setFormLoader]=useState(false);
    const [deleteLoader, setDeleteLoader]=useState(false);

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
        ServiceClient.getSchoolYearInfos(schoolId, schoolYearId).then((success)=>{
            setSchoolYear(success.year);
            setSchoolYearName(success.name);
            setSchoolYearStart(success.start);
            setSchoolYearEnd(success.end);
            setSchoolYearStatus(success.status);

            setLoader(false);
            setDeleteLoader(false);
        }).catch((error)=>{
            setServerError(error);
            //setLoader(false);
        });
    }
    const updateSchoolYearInfos=(e)=>{
        
        e.preventDefault();
        setLoader(true);
        setBtnDisabled(true);
        ServiceClient.updateSchoolYear(schoolYearId,schoolId,schoolYear,schoolYearName,schoolYearStart, schoolYearEnd, selectedStatus).then((success)=>{
            setLoader(false);
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            },2000)
            setBtnDisabled(false);
            getSchoolYearInfos();
        }).catch((error)=>{
            setServerError(error);
            setLoader(false);
            setBtnDisabled(false);
        });
    }

    const removeSchoolYear=()=>{
        setDeleteLoader(true);

        ServiceClient.removeSchoolYear(schoolId, schoolYearId).then((success)=>{
            setDeleteLoader(false);
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            },2000)

            navigation(`/school/${schoolId}/school-year-list`);
        }).catch((error)=>{
            setServerError(error);
            setDeleteLoader(false);
        });
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
        answer={(name)=> functionControl(name)}
        transitionProp={areYouSureTransitionProp}/>

        <div>
            <div className="title"><h2>School Year Info <MdEdit className='icon formIcon' onClick={()=>[setReadOnly(!readOnly), setBtnDisabled(!btndisabled)]}/> </h2></div>
                <form onSubmit={(e) => updateSchoolYearInfos(e)} className="FlexForm">

                    <div className="form-items flex">

                        <div className="form-children">
                            <label>Year</label>
                            <input type="text"
                                   required
                                   onChange={(e) => {
                                       setSchoolYear(e.target.value)
                                   }}
                                   value={schoolYear}
                                   readOnly={readOnly}/>
                        </div>

                        <div className="form-children">
                            <label>Name</label>
                            <input type="text"
                                   required
                                   onChange={(e) => {
                                       setSchoolYearName(e.target.value)
                                   }}
                                   value={schoolYearName}
                                   readOnly={readOnly}/>
                        </div>


                        <div className="form-children">
                            <label>Start</label>
                            <input type="date"
                                   required
                                   onChange={(e) => {
                                       setSchoolYearStart(e.target.value)
                                   }}
                                   value={schoolYearStart}
                                   readOnly={readOnly}/>
                        </div>

                        <div className="form-children">
                            <label>End</label>
                            <input
                                type="date"
                                required
                                onChange={(e) => {
                                    setSchoolYearEnd(e.target.value)
                                }}
                                value={schoolYearEnd}
                                readOnly={readOnly}/>
                        </div>
                        <div className="form-children">
                            <label>Status</label>
                            <Select
                                options={statuses}
                                defaultValue={{value: schoolYearStatus, label: schoolYearStatus}}
                                onChange={(selected)=>{setSelectedStatus(selected.value)}}
                                isDisabled={readOnly}
                                isSearchable={false}
                                className="school-year-infos-select"
                            />
                            {/*readOnly ? <input type="text"
                                               value={schoolYearStatus}
                                               readOnly={readOnly}/>
                                : <select className="school-year-infos-select" onChange={(e) => {
                                    setSelectedStatus(e.target.value)
                                }}>
                                    {statuses ? statuses.map((e, i) => (
                                        <option key={i} value={e.id}>{e.status}</option>)) : null}
                                </select>*/}
                        </div>
                    </div>
                    <div className="form-button-container">
                        {!loader ?
                            <button
                                type='submit'
                                disabled={btndisabled}
                                className={readOnly ? 'formBtnDisabled' : 'btn formButton'}>
                                <GrUpdate className='btn-icon'/> Update
                            </button> :
                            <span className='loader schoolDetails'></span>
                        }

                        {!deleteLoader ?
                            <button
                                type="button"
                                disabled={btndisabled}
                                className={readOnly ? 'formBtnDisabled' : 'btn formButton'}
                                onClick={() => {
                                    setAreYouSureName("delete");
                                    setAreYouSureTransitionProp(true)
                                }}>
                                <FaTrashAlt className='btn-icon'/> Delete
                            </button> :
                            <span className='loader schoolDetails'></span>
                        }
                    </div>
            </form>
        </div>
        </>
    );
};
export default SchoolYearInfos;