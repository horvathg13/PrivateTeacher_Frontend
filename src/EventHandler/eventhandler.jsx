
import ErrorMessage from '../ErrorHandle/ErrorMessage/errorMessage';     
import Success from '../SuccessPopup/success';
import ErrorHandle from '../ErrorHandle/errorHandle';
        
const EventHandler = ({errors, success, serverError, closeErrorMessage}) => {
    const closeErrorPopup=(data)=>{
        if(data===true){
           closeErrorMessage(true);
        }
    }
    return (
        <>
        {serverError ? <ErrorHandle error={serverError}/> :null}
        {errors.length ? <ErrorMessage messageArray={errors} closeModal={closeErrorPopup}/>:null}
        <Success success={success ? success : null}/>
        </>           
    );
};
export default EventHandler;