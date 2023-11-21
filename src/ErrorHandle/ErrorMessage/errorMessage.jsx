import './errorMessage.css';
import { FaTriangleExclamation } from "react-icons/fa6";
const ErrorMessage = ({message,messageArray}) => {
    
    return (
        <div className="error-main">
            <div className="error-container flex">
                <FaTriangleExclamation className='icon'/>
                {message?<h4>{message}</h4>:null}
                <div className="errorArray-container grid">
                    {messageArray ? messageArray.map((e,i)=>
                        <h4 key={i}>{e}</h4>
                    ):null}
                </div>
                
                
            </div>
        </div>
    );
};
export default ErrorMessage;