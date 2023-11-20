import './login.css';
import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    return (
        <div className="login-container flex">
            <div className="left-container">
                <div className="title">
                    <h2>Log In</h2>
                </div>
                <div className="form-container">
                    <form>
                        <div className="emailPassword-fields grid">
                            <label>Email</label>
                            <input type="email" require/>
                            
                            <label>Password</label>
                            <input type="password" require/>
                            
                        </div>
                        
                        <button className='btn'>Log In <FaArrowCircleRight className='btn-icon'/></button>
                    </form>
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