import './errorMessage.css';
import { FaTriangleExclamation } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";

const ErrorMessage = ({message,messageArray,closeModal}) => {
    
    return (
        <div className="error-main">
            <IoMdCloseCircle className='icon close' onClick={()=>{closeModal(true)}}/>
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