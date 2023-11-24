import { useContext, useState } from 'react';
import './login.css';
import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ServiceClient from '../ServiceClient'
import ErrorHandle from '../ErrorHandle/errorHandle';
import Success from '../SuccessPopup/success';
import { UserContext } from '../Context/UserContext';


const Login = () => {
    /*Form fields*/
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*btn handler*/
    const [btndisabled, setBtnDisabled]=useState(false);

    /*navigate*/
    const navigate = useNavigate();

    /*context*/
    const {setUsername}=useContext(UserContext);

    /*methods:*/
    const login=(event)=>{
        event.preventDefault();
        setBtnDisabled(true);

        if(email.length>0 && password.length>0){
            let url='http://127.0.0.1:8000/api/login';
            let dataPost={};
            dataPost.email=email;
            dataPost.psw=password;

            ServiceClient.post(url,dataPost).then((response)=>{
                if(response.status===200){
                    setSuccess(true);
                    localStorage.setItem('token',response.data.data.token);
                    setUsername(response.data.data.first_name);
                    setBtnDisabled(false);
                    setTimeout(()=>{
                        navigate('/home');
                    },2000)
                }
            }).catch((error)=>{
                setServerError(error);
                setBtnDisabled(false);
            })
        }
    }

    
    return (
        <div className="login-container flex">
            {serverError ? <ErrorHandle error={serverError}/>:null}
            {success? <Success></Success>:null}
            <div className="left-container">
                <div className="title">
                    <h1>Log In</h1>
                </div>
                <div className="form-container">
                    <form onSubmit={login}>
                        <div className="emailPassword-fields grid">
                            <label>Email</label>
                            <input type="email" required onChange={(e)=>{setEmail(e.target.value)}}/>
                            
                            <label>Password</label>
                            <input type="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
                            
                        </div>
                        
                        {!btndisabled ? <button type='submit' className='btn'>Log In <FaArrowCircleRight className='btn-icon'/></button>:
                        <span className='loader'></span>}
                    </form>
                </div>
                <div className="mobile-nav-to-register flex">
                    <p>If you have no account, please <span>register</span>.</p>
                </div>
            </div>
            <div className="right-container">
                <div className="text-field">
                    <p>If you have no account, please register.</p>
                    <button className='outline btn' onClick={()=>{navigate('/register')}}>Register</button>

                </div>
            </div>            
        </div>
    );
};
export default Login;