import { useState } from "react";
import EventHandler from "../../EventHandler/eventhandler";
import "./schoolCreate.css";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../CommonComponents/SideMenu/sidemenu";
import ComponentTitle from "../../CommonComponents/ComponentTitle/componentTitle";
import { FaArrowCircleRight } from "react-icons/fa";
import ServiceClient from "../../ServiceClient";
        
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

        let dataPost={};
        dataPost.name = schoolName;
        dataPost.country = schoolCountry;
        dataPost.zip = schoolZip;
        dataPost.city = schoolCity;
        dataPost.street = schoolStreet;
        dataPost.number = schoolNumber;

        let url='http://127.0.0.1:8000/api/schoolCreate';
        ServiceClient.post(url,dataPost).then((response)=>{
            if(response.status===200){
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
            }
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
        <div className="content-main-container">
            <div className="title"><h2>School Creation</h2></div>
            <form onSubmit={(e)=>createSchool(e)} className="SchoolForm">
                
                <div className="school-form flex">

                    <div className="flex">
                        <label>School Name</label>
                        <input type="text" 
                        required 
                        onChange={(e)=>{setSchoolName(e.target.value)}}
                        value={schoolName}/>
                    </div>    
                    
                

                    <div className="flex">
                        <label>Country</label>
                        <input type="text" 
                        required 
                        onChange={(e)=>{setSchoolCountry(e.target.value)}}
                        value={schoolCountry}/>
                    </div>
                    
                   
                    <div className="flex">
                        <label>Zip Code</label>
                        <input type="number"
                        required  
                        onChange={(e)=>{setSchoolZip(e.target.value)}}
                        value={schoolZip}/>
                    </div>
                   
                    <div className="flex">
                        <label>City</label>
                        <input
                        type="text" 
                        required  
                        onChange={(e)=>{setSchoolCity(e.target.value)}}
                        value={schoolCity}/>
                    </div>

                    <div className="flex">
                        <label>Street</label>
                        <input  
                        type="text" 
                        required 
                        onChange={(e)=>{setSchoolStreet(e.target.value)}}
                        value={schoolStreet}/>
                    </div>
                    
                    <div className="flex">
                        <label>Number</label>
                        <input  
                        type="number" 
                        required 
                        onChange={(e)=>{setSchoolNumber(e.target.value)}}
                        value={schoolNumber}/>
                    </div>
                    
                </div>
                
                {!loader ?
                    <button 
                    type='submit' 
                    disabled={btndisabled} 
                    className={btndisabled ? 'btn disabled':'btn formButton'}>
                        Create <FaArrowCircleRight className='btn-icon'/>
                    </button>:
                    <span className='loader schoolCreate'></span>
                }
            </form>

         </div>
         </>
    );
};
export default SchoolCreate;