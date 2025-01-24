import React from 'react';
import { useEffect, useState } from "react";
import {FaMinusSquare, FaPlus} from "react-icons/fa";
import TeachingDayPopUp from "./teachingDayPopUp";
import {useTranslation} from "react-i18next";

const TeachingDaySelect = ({transition, getLabels, teachingDays, disabled, initial, teachingDaysEmit}) => {

    const [labels, setLabels]=useState();
    const [tDayTransition, setTDayTransition]=useState(false);
    const {t}=useTranslation();

    useEffect(()=>{
        if(transition){
            setTDayTransition(transition);
        }
    },[transition])

    useEffect(()=>{
        setLabels(getLabels);
    },[]);
    useEffect(()=>{
        if(initial)
        {
            setLabels(initial);
        }
    },[initial]);

    useEffect(()=>{
        if(labels){
            teachingDaysEmit(labels);
        }
    },[labels])

    /*Methods*/

    const renderLabels=(labels)=>{
        if(labels){
            return labels.map((e,i)=>(
                <span>
                    {t(`enums.${e.teaching_day}`) + " (" + e.from + "-" + e.to + ") "} {!disabled && <FaMinusSquare className={disabled ? "label-icon grey" : "label-icon red"} onClick={()=> {
                    if(disabled === false){
                        labelFilter(e,i)
                    }
                }}/>} {i < labels.length-1 ? ", " :null}
                </span>
            ))
        }
    }
    const labelFilter=(e,i)=>{
        const removed=labels.splice(i,1);
        setLabels([...labels]);
    }
    return (

        <div className="selector-main">

            {tDayTransition && !disabled ?
                <TeachingDayPopUp
                    TeachingDayTransition={tDayTransition}
                    closeModal={(data)=>{if(data===true){setTDayTransition(false)}}}
                    save={(data)=>setLabels(data)}
                    selected={labels}
                    days={teachingDays}
                    getLabel={labels }
                /> : <div className="selector-input">{renderLabels(labels)}</div>
            }
            {!disabled && < FaPlus className="selector-icon" onClick={()=> {
                if(disabled === false){setTDayTransition(true)}
            }}/>}

        </div>
    );
};
export default TeachingDaySelect;