import { useEffect, useRef, useState } from 'react';
import "../../transitions.css";
import { IoIosCloseCircle } from 'react-icons/io';
import { CSSTransition } from 'react-transition-group';
import { useParams } from 'react-router-dom';
import ServiceClient from '../../ServiceClient';
import Select from "react-select";
import {useTranslation} from "react-i18next";
        
const AddSchoolYear = ({loader,btndisabled, transitionProp, closeModal, emitData, schoolYearStatuses}) => {
    const [year, setYear]=useState();
    const [name, setName]=useState();
    const [startDate, setStartDate]=useState();
    const [endDate, setEndDate]=useState();
    const nodeRef = useRef(null);
    const {schoolId}=useParams();
    const [statuses, setStatuses]=useState([]);
    const [selectedStatus, setSelectedStatus]=useState();
    const [disable, setDisable]=useState(false);
    const {t}=useTranslation('translation', {keyPrefix:"schools.school.year"});
   /* Methods:*/ 

   const FormDataEmit=(e)=>{
    e.preventDefault();
    setDisable(true)

    let dataForm={};
    dataForm.schoolYear=year
    dataForm.schoolId=schoolId
    dataForm.name=name
    dataForm.startDate=startDate
    dataForm.endDate=endDate
    dataForm.status=selectedStatus
    emitData(dataForm);

    setDisable(false);
   }

   useEffect(()=>{
    setStatuses(schoolYearStatuses);
   },[statuses])

    useEffect(()=>{
       // console.log(selectedStatus)
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
                    <div className="formTitle"><h2>{t('create.titles.main')}</h2></div>
                    {!loader ?<>
                    <div className="addSchoolYear flex">
                        
                        <div className="add-school-year flex">
                            <label>{t('info.form.year')}</label>
                            <input 
                            type='text' 
                            onChange={(e) => setYear(e.target.value)}
                            required></input>
                        </div>
                        <div className="add-school-year flex">
                            <label>{t('info.form.name')}</label>
                            <input 
                            type='text' 
                            onChange={(e) => setName(e.target.value)}
                            required></input>
                        </div>
                        <div className="add-school-year flex">
                            <label>{t('info.form.start')}</label>
                            <input 
                            type='date' 
                            onChange={(e) => setStartDate(e.target.value)}
                            required></input>
                        </div>
                        <div className="add-school-year flex">
                            <label>{t('info.form.end')}</label>
                            <input 
                            type='date' 
                            onChange={(e) => setEndDate(e.target.value)}
                            required></input>
                        </div>
                        <div className="add-school-year flex">
                            <label>{t('info.form.status')} </label>
                            <Select
                                options={statuses}
                                onChange={(selected)=>{setSelectedStatus(selected.value)}}
                                isDisabled={disable}
                                isSearchable={false}
                                className="select"
                            />
                        </div>
                    </div>
                    <button type='submit'
                        disabled={btndisabled}
                        className={btndisabled ? 'formBtnDisabled' : 'btn formButton'}>
                        {t('create.button.create')}
                    </button></>: <span className='loader table'></span>}
                </form>
            </div>
        </CSSTransition>
    );
};
export default AddSchoolYear;