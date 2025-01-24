import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from "react-i18next";
import {IoMdCloseCircle} from "react-icons/io";
import Select from "react-select";
import {useLoaderData} from "react-router-dom";
import {FaPlus} from "react-icons/fa6";
import {FaMinus} from "react-icons/fa";
import {CSSTransition} from "react-transition-group";
import '../../transitions.css'
import '../common.css';

const TeachingDayPopUp = ({TeachingDayTransition, closeModal, save, selected, days, getLabel}) => {
    const nodeRef = useRef(null);

    /*Loader*/
    const teachingDays = useRef(null);

    /*Translation*/
    const {t}=useTranslation("translation", {keyPrefix:"teachingDaySelect"});
    const {t:a}=useTranslation();
    /*Data*/
    const [tableRows, setTableRows] = useState([{teaching_day:'',from:'',to:''}]);

    /*methods*/
    useEffect(()=>{
        if(getLabel?.length>0){
            setTableRows(getLabel);
        }
    },[getLabel])
    const handleInputChange = (e, i) => {
        const values = [...tableRows];
        if (e.teaching_day) {
            values[i].teaching_day = e.teaching_day;
        } else if(e.from){
            values[i].from = e.from;
        }else if(e.to){
            values[i].to = e.to;
        }
        setTableRows(values);
    };
    const handleAddRow = () => {
        setTableRows([...tableRows, {teaching_day:'',from:'',to:'' }]);
    };
    const handleRemoveRow=(row)=>{
        let find=tableRows.filter((f)=>f !== row);
        setTableRows(find);
    }
    const saveEmit=(e)=>{
        let NotEmptyRow =tableRows.filter(e=>e.teaching_day !== '' && e.from !=='' && e.to !== '');
        if(NotEmptyRow.length !== 0){
            save(NotEmptyRow);
            closeModal(true);
        }
    }
    useEffect(() => {
        if(selected){
            setTableRows(selected);
        }
    }, []);
    return (
        <CSSTransition nodeRef={nodeRef} in={TeachingDayTransition} classNames="fade" timeout={500} mountOnEnter unmountOnExit>
            <div className="popup" ref={nodeRef}>
                <div className="t-day-main">
                    <div className="t-day-close-button-container closeModalWhite">
                        <IoMdCloseCircle className="closeModalIcon" onClick={() => closeModal(true)}/>
                    </div>
                    <div className="t-day-title">
                        <h3>{t('titles.main')}</h3>
                    </div>
                    <div className="t-day-table-container">
                        <table>
                            <thead>
                                <th>{t('table.headers.day')}</th>
                                <th>{t('table.headers.from')}</th>
                                <th>{t('table.headers.to')}</th>
                            </thead>
                            <tbody>
                            {tableRows.map((row, i) => (
                                <tr key={i}>
                                    <td>
                                        <Select
                                            options={days.map(e=> ({
                                                value:e.value, label:a(`${e.label}`)
                                            }))}
                                            onChange={(selected) => {
                                                handleInputChange({teaching_day:selected.value},i)
                                            }}
                                            value={row.teaching_day ?{value: row.teaching_day, label: a(`enums.${row.teaching_day}`)}:null}
                                            isSearchable={true}
                                            isDisabled={false}
                                            className="select-componentFull"
                                        />
                                    </td>
                                    <td>
                                        <input type="time" value={row.from} onChange={(e)=>{
                                            handleInputChange({from:e.target.value},i)
                                        }}/>
                                    </td>
                                    <td>
                                        <input type="time" value={row.to} onChange={(e)=>{
                                            handleInputChange({to:e.target.value},i)
                                        }}/>
                                    </td>
                                    <td>
                                        <FaPlus onClick={handleAddRow} className="selector-icon"/>
                                    {i > 0 && <FaMinus onClick={() => handleRemoveRow(row)} className="selector-icon red"/>}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mobile-container">
                        <div className="form-items">
                            {tableRows.map((row,i)=>
                                <>
                                <div className="form-children">
                                    <label>{t('table.headers.day')}</label>
                                    <Select
                                        options={days.map(e=> ({
                                            value:e.value, label:a(`${e.label}`)
                                        }))}
                                        onChange={(selected) => {
                                            handleInputChange({teaching_day:selected.value},i)
                                        }}
                                        value={row.teaching_day ?{value: row.teaching_day, label: a(`enums.${row.teaching_day}`)}:null}
                                        isSearchable={true}
                                        isDisabled={false}
                                        className="select-componentFull"
                                    />
                                </div>
                                <div className="form-children">
                                    <label htmlFor="from">{t('table.headers.from')}</label>
                                    <input name="from" type="time" value={row.from} onChange={(e) => {
                                        handleInputChange({from: e.target.value}, i)
                                    }}/>
                                </div>
                                <div className="form-children">
                                    <label htmlFor="to">{t('table.headers.to')}</label>
                                    <input name="to" type="time" value={row.from} onChange={(e) => {
                                        handleInputChange({from: e.target.value}, i)
                                    }}/>
                                </div>
                                <div className="form-children">
                                    <div className="t-day-mobile-action-btn-container">
                                        <FaPlus onClick={handleAddRow} className="selector-icon"/>
                                        {i > 0 && <FaMinus onClick={() => handleRemoveRow(row)} className="selector-icon red"/>}
                                    </div>
                                </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="t-day-btn-container">
                        <button className="btn" type="button" onClick={(e) => saveEmit(e)}>{t('buttons.save')}</button>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default TeachingDayPopUp;