import { useEffect, useState } from 'react';
import './errorHandle.css';
import ErrorMessage from './ErrorMessage/errorMessage';
        
const ErrorHandle = ({error}) => {

    const [errorPopup, setErrorPopup]=useState(false);
    const [validator, setValidator]=useState([]);
    const [message, setMessage]=useState('');

    useEffect(()=>{
        if(error?.response?.data?.validatorResponse){
            setValidator(error.response.data.validatorResponse);
            setErrorPopup(true);
        }else if(error?.response?.data?.message){
            setMessage(error.response.data.message);
            setErrorPopup(true);
        }
    },[error])
    
    const close=(data)=>{
        if(data===true){
            setValidator([]);
            setMessage('');
            setErrorPopup(false);
        }
    }
    useEffect(() => {
        if(!Object.keys(error).length){
            setErrorPopup(false);
        }
    }, [error]);
    return (
        <div className="errorComponent">
            { errorPopup ? <ErrorMessage message={message} messageArray={validator} closeModal={close}></ErrorMessage>:null}
        </div>
        
    );
};
export default ErrorHandle;