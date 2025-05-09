import { useEffect, useState } from "react";
import LabelPopup from "./labelPopup";
import {FaEdit, FaMinusSquare, FaPlus} from "react-icons/fa";

        
const LabelSelector = ({transition, labelEmit, getLabels, popUpTitle, disabled, initial, lang}) => {
    
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
                    {e.label} { false && !disabled && <FaMinusSquare className={disabled ? "label-icon grey" : "label-icon red"} onClick={()=> {
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
            title={popUpTitle}
            courseLanguage={lang}/> : <div className={disabled ? "selector-input readOnly":"selector-input"}>{renderLabels(labels)}</div>
            }
            {!disabled && < FaEdit  className="selector-icon" onClick={()=> {
                if(disabled === false){setLabelTransition(true)}
            }}/>}

        </div>
    );
};
export default LabelSelector;