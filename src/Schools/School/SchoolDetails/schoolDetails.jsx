import { useNavigate, useParams } from "react-router-dom";
import "./schoolDetails.css";
import { useContext, useState } from "react";
import EventHandler from "../../../EventHandler/eventhandler";
import { FaArrowCircleRight } from "react-icons/fa";
import { TabMenuContext, schoolInfoContext } from "../../../Context/UserContext";
import { GrUpdate } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import ServiceClient from "../../../ServiceClient";
        
const SchoolDetails = () => {
    /*Context */
    const schoolData = useContext(schoolInfoContext);

    /*Params */
    const schoolId = useParams();

    /*Form fields */
    const [schoolName, setSchoolName]=useState(schoolData?.name);
    const [schoolCountry, setSchoolCountry]=useState(schoolData?.country);
    const [schoolZip, setSchoolZip]=useState(schoolData?.zip);
    const [schoolCity, setSchoolCity]=useState(schoolData?.city);
    const [schoolStreet, setSchoolStreet]=useState(schoolData?.street);
    const [schoolNumber, setSchoolNumber]=useState(schoolData?.number);
    const [readOnly, setReadOnly]=useState(true);
    /*btn handle*/
    const [btndisabled, setBtnDisabled]=useState(readOnly);
    const [loader, setLoader]=useState(false);

    
    /*Navigation */
    const navigate=useNavigate();

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

   

    /*Methods: */
    const update=(e)=>{
        e.preventDefault();
        setLoader(true);
        setBtnDisabled(false);

        let dataPost={};
        dataPost.id=schoolId
        dataPost.name=schoolName;
        dataPost.city=schoolCity;
        dataPost.zip=schoolZip;
        dataPost.street=schoolStreet;
        dataPost.number=schoolNumber;

        let url="http://127.0.0.1:8000/api/schoolUpdate";
        ServiceClient.post(url, dataPost).then((response)=>{
            if(response.status===200){
                setSuccess(true);
                setLoader(false);
                setTimeout(()=>{
                    setSuccess(false);
                },2000)
                setBtnDisabled(false);
            }
        }).catch((error)=>{
            setServerError(error);
            setBtnDisabled(false);
            setLoader(false);
        })
    }
    return (
        <>
        <EventHandler 
        success={success} 
        errors={errors} 
        serverError={serverError} 
        closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>
        <div className="content-main-container">
            <div className="title"><h2>School Info <MdEdit className='icon formIcon' onClick={()=>[setReadOnly(!readOnly), setBtnDisabled(!btndisabled)]}/> </h2></div>
            <form onSubmit={(e)=>update(e)} className="SchoolForm">
                
                <div className="school-form flex">

                    <div className="flex">
                        <label>School Name</label>
                        <input type="text" 
                        required 
                        onChange={(e)=>{setSchoolName(e.target.value)}}
                        value={schoolName}
                        readOnly={readOnly}/>
                    </div>    
                    
                

                    <div className="flex">
                        <label>Country</label>
                        <input type="text" 
                        required 
                        onChange={(e)=>{setSchoolCountry(e.target.value)}}
                        value={schoolCountry}
                        readOnly={readOnly}/>
                    </div>
                    
                   
                    <div className="flex">
                        <label>Zip Code</label>
                        <input type="text"
                        required  
                        onChange={(e)=>{setSchoolZip(e.target.value)}}
                        value={schoolZip}
                        readOnly={readOnly}/>
                    </div>
                   
                    <div className="flex">
                        <label>City</label>
                        <input
                        type="text" 
                        required  
                        onChange={(e)=>{setSchoolCity(e.target.value)}}
                        value={schoolCity}
                        readOnly={readOnly}/>
                    </div>

                    <div className="flex">
                        <label>Street</label>
                        <input  
                        type="text" 
                        required 
                        onChange={(e)=>{setSchoolStreet(e.target.value)}}
                        value={schoolStreet}
                        readOnly={readOnly}/>
                    </div>
                    
                    <div className="flex">
                        <label>Number</label>
                        <input  
                        type="text" 
                        required 
                        onChange={(e)=>{setSchoolNumber(e.target.value)}}
                        value={schoolNumber}
                        readOnly={readOnly}/>
                    </div>
                    
                </div>
                
                {!loader ?
                    <button 
                    type='submit' 
                    disabled={btndisabled} 
                    className={readOnly ? 'formBtnDisabled':'btn formButton' }>
                       <GrUpdate  className='btn-icon'/> Update 
                    </button>:
                    <span className='loader schoolDetails'></span>
                }
            </form>

         </div>
        </>
    );
};
export default SchoolDetails;