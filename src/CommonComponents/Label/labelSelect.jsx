import { useEffect, useState } from "react";
import LabelPopup from "./labelPopup";
import { FaPlus } from "react-icons/fa";

        
const LabelSelector = ({transition, labelEmit, getLabels, popUpTitle, disabled, initial}) => {
    
    const [labels, setLabels]=useState();
    const [labelTransition, setLabelTransition]=useState();

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
    return (

        <div className="selector-main">

            {labelTransition && !disabled ?
            <LabelPopup 
            labelTransition={labelTransition} 
            closeModal={(data)=>{if(data===true){setLabelTransition(false)}}} 
            selection={(data)=>setLabels(data)}
            selected={labels}
            initialValues={initial}
            title={popUpTitle}/> : <input className="selector-input" type="text" value={labels?.map(e=>e.label)}readOnly
            />}
            <FaPlus className="selector-icon" onClick={()=> {
                if(disabled === false){setLabelTransition(true)}
            }}/>

        </div>
    );
};
export default LabelSelector;