import { useEffect, useState } from "react";
import LabelPopup from "./labelPopup";
import {FaMinusSquare, FaPlus} from "react-icons/fa";

        
const LabelSelector = ({transition, labelEmit, getLabels, popUpTitle, disabled, initial}) => {
    
    const [labels, setLabels]=useState();
    const [labelTransition, setLabelTransition]=useState();
    const [removeItem, setRemoveItem]=useState();

    useEffect(()=>{
        if(transition){
            setLabelTransition(transition);
        }
    },[transition])

    useEffect(()=>{
        labelEmit(labels);
    },[labels]);
    useEffect(()=>{
        setLabels(getLabels);
    },[]);
    useEffect(()=>{
        if(initial)
        {
            setLabels(initial);
        }
    },[initial])

    /*Methods*/

    const renderLabels=(labels)=>{
        if(labels){
            return labels.map((e,i)=>(
                <span>
                    {e.label} {!disabled && <FaMinusSquare className={disabled ? "label-icon grey" : "label-icon red"} onClick={()=> {
                        if(disabled === false){
                            labelFilter(e)
                        }
                    }}/>} {i < labels.length-1 ? ", " :null}
                </span>
            ))
        }
    }
    const labelFilter=(e)=>{
        const newLabels=labels.filter(l=>l.id !== e.id)
        setLabels(newLabels);
    }
    return (

        <div className="selector-main">

            {labelTransition && !disabled ?
            <LabelPopup 
            labelTransition={labelTransition} 
            closeModal={(data)=>{if(data===true){setLabelTransition(false)}}} 
            selection={(data)=>setLabels(data)}
            selected={labels}
            initialValues={initial}
            remove={removeItem}
            title={popUpTitle}/> : <div className="selector-input">{renderLabels(labels)}</div>
            }
            {!disabled && < FaPlus className="selector-icon" onClick={()=> {
                if(disabled === false){setLabelTransition(true)}
            }}/>}

        </div>
    );
};
export default LabelSelector;