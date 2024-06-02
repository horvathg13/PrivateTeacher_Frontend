import { useState } from "react";
import EventHandler from "../../EventHandler/eventhandler";
import "./schoolCreate.css";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../CommonComponents/SideMenu/sidemenu";
import ComponentTitle from "../../CommonComponents/ComponentTitle/componentTitle";
import { FaArrowCircleRight } from "react-icons/fa";
import ServiceClient from "../../ServiceClient";
import LabelPopup from "../../CommonComponents/Label/labelPopup";
import LabelSelector from "../../CommonComponents/Label/labelSelect";
        
const SchoolCreate = () => {

    /*Form fields */
    const [schoolName, setSchoolName]=useState();
    const [schoolCountry, setSchoolCountry]=useState();
    const [schoolZip, setSchoolZip]=useState();
    const [schoolCity, setSchoolCity]=useState();
    const [schoolStreet, setSchoolStreet]=useState();
    const [schoolNumber, setSchoolNumber]=useState();
    
    /*btn handle*/
    const [btndisabled, setBtnDisabled]=useState(false);
    const [loader, setLoader]=useState(false);

    
    /*Navigation */
    const navigate=useNavigate();

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Methods: */

    const createSchool=(e)=>{
        e.preventDefault();
        setBtnDisabled(true);
        setLoader(true);

        ServiceClient.schoolCreate(schoolName, schoolCountry, schoolZip, schoolCity, schoolStreet, schoolNumber).then((success)=>{
            setSuccess(true);
            setLoader(false);
            setBtnDisabled(false);
            setTimeout(()=>{
                setSuccess(false);
            },2000)
            setSchoolCountry('');
            setSchoolName('');
            setSchoolCity('');
            setSchoolZip('');
            setSchoolStreet('');
            setSchoolNumber('');
        }).catch((error)=>{
            setServerError(error);
            setLoader(false);
            setBtnDisabled(false);
        })
    }
    return (
        <>
        <EventHandler 
        success={success} 
        errors={errors} 
        serverError={serverError} 
        closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>
        
        <div>
            <div className="title"><h2>School Creation</h2></div>
            <form onSubmit={(e)=>createSchool(e)} className="FlexForm">
                
                <div className="form-items flex">

                    <div className="form-children">
                        <label>School Name</label>
                        <input type="text" 
                        required 
                        onChange={(e)=>{setSchoolName(e.target.value)}}
                        value={schoolName}/>
                    </div>

                    <div className="form-children">
                        <label>Country</label>
                        <input type="text" 
                        required 
                        onChange={(e)=>{setSchoolCountry(e.target.value)}}
                        value={schoolCountry}/>
                    </div>
                   
                    <div className="form-children">
                        <label>Zip Code</label>
                        <input type="number"
                        required  
                        onChange={(e)=>{setSchoolZip(e.target.value)}}
                        value={schoolZip}/>
                    </div>
                   
                    <div className="form-children">
                        <label>City</label>
                        <input
                        type="text" 
                        required  
                        onChange={(e)=>{setSchoolCity(e.target.value)}}
                        value={schoolCity}/>
                    </div>

                    <div className="form-children">
                        <label>Street</label>
                        <input  
                        type="text" 
                        required 
                        onChange={(e)=>{setSchoolStreet(e.target.value)}}
                        value={schoolStreet}/>
                    </div>
                    
                    <div className="form-children">
                        <label>Number</label>
                        <input  
                        type="number" 
                        required 
                        onChange={(e)=>{setSchoolNumber(e.target.value)}}
                        value={schoolNumber}/>
                    </div>
                </div>
                <div className="form-button-container">
                {!loader ?
                    <button 
                    type='submit' 
                    disabled={btndisabled} 
                    className={btndisabled ? 'btn disabled':'btn formButton'}>
                        Create <FaArrowCircleRight className='btn-icon'/>
                    </button>:
                    <span className='loader schoolCreate'></span>
                }
                </div>
            </form>
         </div>
         </>
    );
};
export default SchoolCreate;