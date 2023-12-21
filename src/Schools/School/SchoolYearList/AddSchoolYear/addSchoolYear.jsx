import { useRef, useState } from 'react';
import './addSchoolYear.css';
import "../../../../transitions.css";
import { IoIosCloseCircle } from 'react-icons/io';
import { CSSTransition } from 'react-transition-group';
import { useParams } from 'react-router-dom';
        
const AddSchoolYear = ({loader,btndisabled, transitionProp, closeModal, emitData}) => {
    const [year, setYear]=useState();
    const [name, setName]=useState();
    const [startDate, setStartDate]=useState();
    const [endDate, setEndDate]=useState();
    const nodeRef = useRef(null);
    const {schoolId}=useParams();

   /* Methods:*/ 

   const FormDataEmit=(e)=>{
    e.preventDefault();

    let dataForm={};
    dataForm.year=year
    dataForm.schoolId=schoolId
    dataForm.name=name
    dataForm.startDate=startDate
    dataForm.endDate=endDate

    emitData(dataForm);

   }

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