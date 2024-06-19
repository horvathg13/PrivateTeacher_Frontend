import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaCheck, FaMinusCircle, FaPlus, FaPlusCircle, FaSearch } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import ServiceClient from "../../ServiceClient";
import {CSSTransition} from 'react-transition-group';
import '../../transitions.css'
import EventHandler from "../../EventHandler/eventhandler";
       
const LabelPopup = ({labelTransition, closeModal, selection, selected, title, initialValues}) => {

    /*Fields */
    const [keyword, setKeyword]=useState();
    const [labels, setLabels]=useState([]);
    const [selectedLabels, setSelectedLabels]=useState( []);
    const [check, setCheck]=useState(false);

    /*Btn handle*/
    const [btndisabled, setBtnDisabled]=useState(false);
    const [loader, setLoader]=useState(false);

    /*Event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Methods: */
    const Search=()=>{
        setBtnDisabled(true);
        setLoader(true);
        if(errors.length){
            setErrors([]);
        }
        if(keyword !== undefined && keyword !== ""){

            setLabels([]);
            let dataPost={};
            dataPost.keyword = keyword;
            
            let url='http://127.0.0.1:8000/api/searchLabel';
            ServiceClient.post(url,dataPost).then((response)=>{
                if(response.status===200){
                    setLabels(response.data);
                    setLoader(false);
                    setBtnDisabled(false);
                    setErrors([]);
                    const selectedIndex = selectedLabels.findIndex(label => label.id === response.data.id);

                    if(selectedIndex !== -1) {
                        setCheck(true);
                    }else{
                        setCheck(false);
                    }
                }
            }).catch((error)=>{
                setLabels([]);
                //setServerError(error);
                setErrors(error.response.message ? error.response.message :['Label does not exists']);
                setLoader(false);
                setBtnDisabled(false);
            })
        }else{
            setBtnDisabled(false);
            setLoader(false);
        }
    }
    const Select=(e)=>{
       
        const selectedIndex = selectedLabels.findIndex(label => label.id === e.id);
        if(selectedIndex !== -1) {
            const newLabels = [...selectedLabels];
            newLabels.splice(selectedIndex, 1);
            setSelectedLabels(newLabels);
            setCheck(false);
        }else{
            setSelectedLabels([...selectedLabels, e]);
            setCheck(true);
        }
        shouldCheck(e);
        
    }
    const shouldCheck=(e)=>{
        const check = selectedLabels.filter(label => label.id === e.id);
        const result = check.length > 0;
        return result;
    }
    const createLabel=()=>{
        setBtnDisabled(true);
        setLoader(true);

        if(keyword){

            let dataPost={};
            dataPost.keyword = keyword;
            
            let url='http://127.0.0.1:8000/api/createLabel';
            ServiceClient.post(url,dataPost).then((response)=>{
                if(response.status===200){
                    setSuccess(true);
                    setLoader(false);
                    setBtnDisabled(false);
                    Search();
                    setTimeout(()=>{
                        setSuccess(false);
                    },2000)
                    
                }
            }).catch((error)=>{
                setServerError(error);
                setLoader(false);
                setBtnDisabled(false);
            })
        }else{
            setBtnDisabled(false);
            setLoader(false);
            console.log(errors,);
        }
    }

    useEffect(()=>{
        if(selected){setSelectedLabels(selected)}
        if(initialValues && initialValues.length){
            setLabels(initialValues)
            setSelectedLabels(initialValues);
        }
    },[selected,initialValues]);

    const nodeRef = useRef(null);
    return (

        <CSSTransition nodeRef={nodeRef} in={labelTransition} classNames="fade" timeout={500} mountOnEnter unmountOnExit>
            <div className="popup" ref={nodeRef}>
                <div className="label-main">
                    <div className="label-close-button-container closeModal">
                        <IoMdCloseCircle className="closeModalIcon" onClick={() => closeModal(true)}/>
                    </div>
                    <div className="label-header">
                        <h2>{title ? title : null}</h2>
                    </div>
                    <div className="label-search flex">
                        <input placeholder="Type to search..."
                               onChange={(e) => setKeyword(e.target.value)}
                               value={keyword}
                               disabled={btndisabled}
                               required
                        />
                        <div className="desktopBtn">
                            <button
                                className={btndisabled ? "btn formButton disabled" : "btn formButton"}
                                disabled={btndisabled}
                                onClick={() => Search()}
                            ><FaSearch className="btn-icon"/>
                                Search
                            </button>
                        </div>
                        <div className="mobileBtn">
                            <button
                                className={btndisabled ? "btn mobileFormButton disabled" : "btn mobileFormButton"}
                                disabled={btndisabled}
                                onClick={() => Search()}
                            ><FaSearch className="btn-icon"/>
                            </button>
                        </div>
                </div>
                <div className="label-results">
                    {!loader ?
                        labels.length !== 0 ? labels.map((e, i) => (
                            <div className="label-result flex" key={i} onClick={() => Select(e)}>
                                <h4>{e.label}</h4>
                                    <div className="label-action">{shouldCheck(e) ?
                                        <FaCheck className="label-action-icon label-success"/> : null}</div>
                                </div>
                            )) : null
                            :
                            <span className='loader add-label'></span>
                        }

                        {errors.length ?
                            <div className="label-result label-missing flex" onClick={createLabel}>
                                <h4>Label does not exist, but you can create this one.</h4>
                                <div className="label-action"><FaPlus className="label-action-icon label-success"/>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                    <div className="label-action-buttons flex">
                        <div className="label-header"><h4>Selected: {selectedLabels.length}</h4></div>
                        <button className="btn label-select-button"
                                onClick={() => [selection(selectedLabels), closeModal(true)]}>Select<FaArrowRight
                            className="btn-icon"/></button>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};
export default LabelPopup;