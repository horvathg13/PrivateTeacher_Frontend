import { useState } from "react";
import EventHandler from "../EventHandler/eventhandler";
import {Outlet, useNavigate} from "react-router-dom";
import SideMenu from "../CommonComponents/SideMenu/sidemenu";
import ComponentTitle from "../CommonComponents/ComponentTitle/componentTitle";
import { FaArrowCircleRight } from "react-icons/fa";
import ServiceClient from "../ServiceClient";
import SearchResult from "./searchResult";
        
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

    /*Popup control */

    const [title, setTitle]=useState();
    const [transitionProp, setTransitionProp]=useState(false);

    /*Methods: */

    const searchTeacher=(e)=>{
        e.preventDefault();
        setBtnDisabled(true);
        setLoader(true);

        let dataPost={};
        dataPost.email = email;

        let url=`http://127.0.0.1:8000/api/searchTeacher`;
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
                setTitle('Search Result');
                setTransitionProp(true);
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
        <div>
            <div className="title"><h2>Search Teacher</h2></div>
            <form onSubmit={(e)=>searchTeacher(e)} className="FlexForm">
                
                <div className="form-items flex">
                   
                    <div className="form-children">
                        <label>Email</label>
                        <input type="email"
                        onChange={(e)=>{setEmail(e.target.value)}}
                        value={email}/>
                    </div>
                </div>
                <div className="form-button-container">
                {!loader ?
                    <button 
                    type='submit' 
                    disabled={btndisabled} 
                    className={btndisabled ? 'btn disabled':'btn formButton'}>
                        Search <FaArrowCircleRight className='btn-icon'/>
                    </button>:
                    <span className='loader schoolCreate'></span>
                }
                </div>
            </form>
         </div>
         </>
    );
};
export default SearchTeacher;