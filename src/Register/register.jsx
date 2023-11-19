import './register.css';
import { FaArrowCircleRight } from "react-icons/fa";     
const Register = () => {
    return (
        <div className="reg-container flex">
            <div className="left-container"></div>
            <div className="right-container">
                <div className="title">
                    <h2>Registration</h2>
                </div>
                <div className="form-container">
                    <form>
                        <div className="name-fields flex">
                            <div className="first-name">
                                <label>First Name</label>
                                <input type="text" />
                                
                            </div>
                            <div className="last-name">
                                <label>Last Name</label>
                                <input type="text" />
                            </div>
                            
                        </div>
                        <div className="emailPassword-fields grid">
                            <label>Email</label>
                            <input type="email" />
                            
                            <label>Password</label>
                            <input type="password" />
                            
                            <label>Confirm Password</label>
                            <input type="password" />
                        </div>
                        
                        <button className='btn'>Send <FaArrowCircleRight className='btn-icon'/></button>
                    </form>
                </div>
            </div>            
        </div>
            
    );
};
export default Register;