import { useContext, useState } from "react";
import EventHandler from "../../EventHandler/eventhandler";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import ServiceClient from "../../ServiceClient";
import { UserContext } from "../../Context/UserContext";
        
const GeneratedUser = () => {

    const userData = useLoaderData();
    
    /*Form fields*/
    const [password, setPassword]=useState('');
    const [passwordError, setPasswordError]=useState(false);
    const [cpassword, setCPassword]=useState('');
    const [cpasswordError, setCPasswordError]=useState(false);
    
    /*Navigate*/
    const navigate = useNavigate();

    /*Context*/
    const {setUsername}=useContext(UserContext);

    /*btn handle*/
    const [btndisabled, setBtnDisabled]=useState(false);
    const [loader, setLoader]=useState(false);

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Methods: */

    const resetPassword=(e)=>{
        e.preventDefault();
        setLoader(true);
        setBtnDisabled(true);

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

        let url='http://127.0.0.1:8000/api/resetPassword';
        let dataPost={};
        dataPost.userId=userData.id;
        dataPost.psw=password;

        ServiceClient.post(url,dataPost).then((response)=>{
            if(response.status===200){
                setSuccess(true);

                let url='http://127.0.0.1:8000/api/login';
                let dataPost={};
                dataPost.email=userData.email;
                dataPost.psw=password;
                ServiceClient.post(url,dataPost).then((response)=>{
                    if(response.status===200){
                        setSuccess(true);
                        localStorage.setItem('token',response.data.data.token);
                        setUsername(response.data.data.first_name);
                        setLoader(false)
                        setTimeout(()=>{
                            navigate('/home');
                        },1000)
                    }
                }).catch((error)=>{
                    setServerError(error);
                    setLoader(false);
                    setBtnDisabled(false);
                })
                    
            }
        }).catch((error)=>{
            setServerError(error);
            setBtnDisabled(false);
            setLoader(false);
        })
        
    }
    return (
        <div className="login-container flex">
            <EventHandler 
            success={success} 
            errors={errors} 
            serverError={serverError} 
            closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>
            <div className="left-container">
                <div className="title">
                    <h1>Welcome {userData.firstname}</h1>
                    <h3>Please, set your new password!</h3>
                </div>
                
                <div className="form-container">
                    <form onSubmit={(e)=>resetPassword(e)}>
                        <div className="emailPassword-fields grid">
                            <label>Password</label>
                            <input type="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
                            
                            <label>Confirm Password</label>
                            <input type="password" required onChange={(e)=>{setCPassword(e.target.value)}}/>
                            
                        </div>
                        
                        {!loader ? <button type='submit' disabled={btndisabled} className={!btndisabled ? 'btn' : 'btn disabled'}>Log In <FaArrowCircleRight className='btn-icon'/></button>:
                        <span className='loader'></span>}
                    </form>
                </div>
            </div>
            <div className="right-container"></div>
                  
        </div>
            
       
    );
};
export default GeneratedUser;