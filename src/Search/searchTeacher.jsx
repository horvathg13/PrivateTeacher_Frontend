import { useState } from "react";
import EventHandler from "../EventHandler/eventhandler";
import "./schoolCreate.css";
import { useNavigate } from "react-router-dom";
import SideMenu from "../CommonComponents/SideMenu/sidemenu";
import ComponentTitle from "../CommonComponents/ComponentTitle/componentTitle";
import { FaArrowCircleRight } from "react-icons/fa";
import ServiceClient from "../ServiceClient";
        
const SearchTeacher = () => {

    /*Form fields */
    const [fname, setFname]=useState();
    const [lname, setLname]=useState();
    const [email, setEmail]=useState();
    const [result, setResult]=useState();
    
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

    const searchTeacher=(e)=>{
        e.preventDefault();
        setBtnDisabled(true);
        setLoader(true);

        let dataPost={};
        dataPost.fname = fname;
        dataPost.lname = lname;
        dataPost.email = email;

        let url='http://127.0.0.1:8000/api/searchTeacher';
        ServiceClient.post(url,dataPost).then((response)=>{
            if(response.status===200){
                setSuccess(true);
                setLoader(false);
                setBtnDisabled(false);
                formClear();
                setTimeout(()=>{
                    setSuccess(false);
                },2000)
                setResult(response.data);
            }
        }).catch((error)=>{
            setServerError(error);
            setLoader(false);
            setBtnDisabled(false);
        })
    }
    const formClear=()=>{
        setFname('');
        setLname('');
        setEmail('');
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
            <form onSubmit={(e)=>searchTeacher(e)} className="SchoolForm">
                
                <div className="school-form flex">

                    <div className="flex">
                        <label>Firstname</label>
                        <input type="text" 
                        onChange={(e)=>{setFname(e.target.value)}}
                        value={fname}/>
                    </div>    
                    
                

                    <div className="flex">
                        <label>Lastname</label>
                        <input type="text" 
                        onChange={(e)=>{setLname(e.target.value)}}
                        value={lname}/>
                    </div>
                    
                   
                    <div className="flex">
                        <label>Email</label>
                        <input type="email"
                        onChange={(e)=>{setEmail(e.target.value)}}
                        value={email}/>
                    </div>
                </div>
                
                {!loader ?
                    <button 
                    type='submit' 
                    disabled={btndisabled} 
                    className={btndisabled ? 'btn disabled':'btn formButton'}>
                        Search <FaArrowCircleRight className='btn-icon'/>
                    </button>:
                    <span className='loader schoolCreate'></span>
                }
            </form>

         </div>
         </>
    );
};
export default SearchTeacher;