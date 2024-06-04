import { useEffect, useRef, useState } from 'react';
import "../../transitions.css";
import { IoIosCloseCircle } from 'react-icons/io';
import { CSSTransition } from 'react-transition-group';
import { useParams } from 'react-router-dom';
import ServiceClient from '../../ServiceClient';
        
const AddSchoolYear = ({loader,btndisabled, transitionProp, closeModal, emitData, schoolYearStatuses}) => {
    const [year, setYear]=useState();
    const [name, setName]=useState();
    const [startDate, setStartDate]=useState();
    const [endDate, setEndDate]=useState();
    const nodeRef = useRef(null);
    const {schoolId}=useParams();
    const [statuses, setStatuses]=useState([]);
    const [selectedStatus, setSelectedStatus]=useState();

   /* Methods:*/ 

   const FormDataEmit=(e)=>{
    e.preventDefault();

    let dataForm={};
    dataForm.schoolYear=year
    dataForm.schoolId=schoolId
    dataForm.name=name
    dataForm.startDate=startDate
    dataForm.endDate=endDate
    dataForm.status=selectedStatus
    emitData(dataForm);

   }

   useEffect(()=>{
    setStatuses(schoolYearStatuses);
   },[statuses])

    useEffect(()=>{
        console.log(selectedStatus)
    },[selectedStatus])

    return (
        <CSSTransition 
        nodeRef={nodeRef} 
        in={transitionProp} 
        classNames="fade" 
        timeout={500} 
        mountOnEnter 
        unmountOnExit>
            <div className="addSchoolYear-main-container" ref={nodeRef} >
                
                 <form className='addSchoolYear-form flex' onSubmit={FormDataEmit}>
                    <div className="closeModal"><IoIosCloseCircle className='closeModalIcon' onClick={() => closeModal(true)} /></div>
                    <div className="formTitle"><h2>Create a new school year</h2></div>
                    {!loader ?<>
                    <div className="addSchoolYear flex">
                        
                        <div className="add-school-year flex">
                            <label>Year</label>
                            <input 
                            type='text' 
                            onChange={(e) => setYear(e.target.value)}
                            required></input>
                        </div>
                        <div className="flex">
                            <label>Name</label>
                            <input 
                            type='text' 
                            onChange={(e) => setName(e.target.value)}
                            required></input>
                        </div>
                        <div className="flex">
                            <label>Start date</label>
                            <input 
                            type='date' 
                            onChange={(e) => setStartDate(e.target.value)}
                            required></input>
                        </div>
                        <div className="flex">
                            <label>End date</label>
                            <input 
                            type='date' 
                            onChange={(e) => setEndDate(e.target.value)}
                            required></input>
                        </div>
                        <div className="flex">
                            <label>Status </label>
                            <select onChange={(e)=>{setSelectedStatus(e.target.value)}}>
                                {statuses ? statuses.map((e,i)=>(
                                <option key={i} value={e.id}>{e.status}</option>)):null}
                            </select>
                        </div>
                    </div>
                    <button type='submit'
                        disabled={btndisabled}
                        className={btndisabled ? 'formBtnDisabled' : 'btn formButton'}>
                            Create
                    </button></>: <span className='loader table'></span>}
                </form>
            </div>
        </CSSTransition>
    );
};
export default AddSchoolYear;