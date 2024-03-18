import { useState } from "react";
import { FaArrowRight, FaCheck, FaMinusCircle, FaPlusCircle, FaSearch } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

       
const LabelPopup = () => {

    /*Fields */
    const [keyword, setKeyword]=useState();
    const [labels, setLabels]=useState([]);

    /*Btn handle*/
    const [btndisabled, setBtnDisabled]=useState(false);
    const [loader, setLoader]=useState(false);

    /*Event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Methods: */
    const Search=(e)=>{

    }
    const Select=(e)=>{
        
    }
    return (
        <div className="popup">
            <div className="label-close-button-container closeModalWhite">
                <IoMdCloseCircle className="closeModalIcon" />
            </div>
            <div className="label-main">
                <div className="label-header">
                    <h2>Add labels to your course</h2>
                </div>
                <div className="label-search flex">
                    <input placeholder="Search a label..."  disabled={btndisabled}></input>
                    <button className={btndisabled ? "btn formButton disabled" : "btn formButton"} disabled={btndisabled}><FaSearch className="btn-icon"/>Search</button>
                </div>
                <div className="label-results">
                    {!loader ?
                    <div className="label-result flex">
                        <h4>Music</h4>
                        <div className="label-action"><FaCheck className="label-action-icon label-success" /></div>
                    </div>
                    :
                    <span className='loader add-label'></span>}
                </div>
                <div className="label-action-buttons flex">
                    <div className="label-header"><h4>Selected: {labels.length}</h4></div>
                    <button className="btn formButton">Select<FaArrowRight className="btn-icon"/></button>
                </div>
            </div>
        </div>
    );
};
export default LabelPopup;