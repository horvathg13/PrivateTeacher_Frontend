import './createUser.css';
import EventHandler from '../../EventHandler/eventhandler';
import Table from '../../CommonComponents/Table/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleRight } from 'react-icons/fa';
import ServiceClient from '../../ServiceClient';


        
const UserCreate = () => {
    /*Form fields*/
    const [fname, setFname]=useState('');
    const [lname, setLname]=useState('');
    const [email, setEmail]=useState('');
    const [emailError, setEmailError]=useState(false);
    const [password, setPassword]=useState('');
    const [passwordError, setPasswordError]=useState(false);
    const [cpassword, setCPassword]=useState('');
    const [cpasswordError, setCPasswordError]=useState(false);
    
    const [generatedLink, setGeneratedLink]=useState('');
    /*Navigate*/
    const navigate = useNavigate();

    /*btn handle*/
    const [btndisabled, setBtnDisabled]=useState(false);
    const [loader, setLoader]=useState(false);

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);
   
    /*Methods: */
    const createUser=(e)=>{
        e.preventDefault();
        setBtnDisabled(true);
        setLoader(true);

        if(errors.length || serverError.length){
            setErrors([]);
            setServerError([]);
        }
        if(password != cpassword){
            setCPasswordError(true);
            setPasswordError(true);
            setErrors(['Passwords does not match']);
            setBtnDisabled(false);
            setLoader(false);
            return
        }
        if(passwordError==true & cpasswordError==true){
            setCPasswordError(false);
            setPasswordError(false);
        }

        let url='http://127.0.0.1:8000/api/createUser';
        let dataPost={};
        dataPost.fname=fname;
        dataPost.lname=lname;
        dataPost.email=email;
        dataPost.psw=password;

        ServiceClient.post(url,dataPost).then((response)=>{
            console.log(response);
            if(response.status===200){
                setSuccess(true);
                setLoader(false);
                setGeneratedLink(response.data.link);
                setTimeout(()=>{
                    setSuccess(false);
                    setBtnDisabled(false);
                },2000)
                
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
            
           
            {!generatedLink ? 
            <form onSubmit={(e)=>createUser(e)}>
                <div className="title"><h2>User Creation</h2></div>
                <div className="name-fields flex">
                    <div className="first-name">
                        <label>First Name</label>
                        <input type="text" required onChange={(e)=>{setFname(e.target.value)}}/>
                    </div>
                    <div className="last-name">
                        <label>Last Name</label>
                        <input type="text" required onChange={(e)=>{setLname(e.target.value)}}/>
                    </div>
                    
                </div>
                <div className="emailPassword-fields grid">
                    <label>Email</label>
                    <input className={emailError ? 'InputError':'emailInput'} type="email" required onChange={(e)=>{setEmail(e.target.value)}}/>
                    
                    <label>Password</label>
                    <input className={passwordError ? 'InputError':'passwordInput'} type="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
                    
                    <label>Confirm Password</label>
                    <input className={cpasswordError ? 'InputError':'passwordInput'}type="password" required onChange={(e)=>{setCPassword(e.target.value)}}/>
                </div>
                
                {!loader ?
                    <button type='submit' disabled={btndisabled} className={btndisabled ? 'btn disabled':'btn formButton'}>Generate <FaArrowCircleRight className='btn-icon'/></button> :
                    <span className='loader createUser'></span>
                }
            </form>:

            <div className="generatedLink grid">
                <label><h2>Generated Link</h2></label>
                <input type="text" readOnly value={generatedLink}/>
            </div>}
        </div>
        </>
    
        
    );
};
export default UserCreate;