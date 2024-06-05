import { IoIosCloseCircle } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
        
const SchoolYearDetailsPopup = ({fn_alias,title, update, selected, loader ,btndisabled, transitionProp, closeModal, emitData}) => {
    const [name, setName]=useState();
    const [startDate, setStartDate]=useState();
    const [endDate, setEndDate]=useState();
    const [id, setId]=useState();
    const nodeRef = useRef(null);
    const {schoolId, schoolYearId}=useParams();

   /* Methods:*/ 
   const FormDataEmit=(e)=>{
    e.preventDefault();

    let dataForm={};
    dataForm.schoolId=schoolId
    dataForm.yearId=schoolYearId
    dataForm.name=name
    dataForm.start=startDate
    dataForm.end=endDate
    dataForm.id=id ? id : null


    return emitData(dataForm, fn_alias);

   }

   useEffect(()=>{
    if(selected){
        setName(selected ? selected.name :"");
        setStartDate(selected ? selected.start : "");
        setEndDate(selected ? selected.end:"");
        setId(selected ? selected.id : "");
    }else{
        setName("");
        setStartDate("");
        setEndDate("");
        setId("");
    }
    
       
    
   },[selected])

   useEffect(()=>{console.log(selected,"rosszmanó")},[selected])
    return (
        <CSSTransition 
        nodeRef={nodeRef} 
        in={transitionProp} 
        classNames="fade" 
        timeout={500} 
        mountOnEnter 
        unmountOnExit>
            <div className="popup" ref={nodeRef} >
                <form className='school-year-details-popup-form flex' onSubmit={(e)=>FormDataEmit(e)}>
                    <div className="closeModal"><IoIosCloseCircle className='closeModalIcon' onClick={() => closeModal(true)} /></div>
                    <div className="formTitle"><h2>{title ? title : ''}</h2></div>
                    {!loader ?<>
                    <div className="school-year-details-popup flex">
                       
                        <div className="flex">
                            <label>Name</label>
                            <input 
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required></input>
                        </div>
                        <div className="flex">
                            <label>Start date</label>
                            <input
                            value={startDate}
                            type='date' 
                            onChange={(e) => setStartDate(e.target.value)}
                            required></input>
                        </div>
                        <div className="flex">
                            <label>End date</label>
                            <input
                            value={endDate}
                            type='date' 
                            onChange={(e) => setEndDate(e.target.value)}
                            required></input>
                        </div>
                    </div>
                    <button type='submit'
                        disabled={btndisabled}
                        className={btndisabled ? 'formBtnDisabled' : 'btn formButton'}>
                            {update ? "Update" : "Create"}
                    </button></>: <span className='loader table'></span>}
                </form>
            </div>
        </CSSTransition>
    );
};
export default SchoolYearDetailsPopup;