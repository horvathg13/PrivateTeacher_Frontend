import {useEffect, useRef, useState} from "react";
import EventHandler from "../../EventHandler/eventhandler";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import ServiceClient from "../../ServiceClient";
//import Select from "../../CommonComponents/Select/select";
import {IoCloseCircle} from "react-icons/io5";
import {CSSTransition} from "react-transition-group";
import '../../transitions.css';
import Select from "react-select"
import {userDataLoader} from "../../dataLoader";
import {useTranslation} from "react-i18next";

        
const CreateUserRole = ({closeModal, transitionProp, updateUserRoles, roleOptions}) => {

    /*Translation*/
    const {t}=useTranslation("translation", {keyPrefix:"users"});

    /*Form fields */
    const [ref_schools, setRefSchool]=useState();
    const [roles, setRoles]=useState();
    const [readOnly, setReadOnly]=useState(false);
    const {userId}=useParams();

    /*Btn handle*/
    const [btndisabled, setBtnDisabled]=useState(false);
    const [loader, setLoader]=useState(false);
    
    /*Navigation */
    const navigate=useNavigate();

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Methods: */

    const createRole=(e)=>{
        e.preventDefault();
        setErrors([]);
        setServerError([]);
        if(roles){
            setBtnDisabled(true);
            setLoader(true);
            setReadOnly(true);

            ServiceClient.createUserRole(roles, userId).then((success)=>{
                setSuccess(true);
                setLoader(false);
                setBtnDisabled(false);
                setReadOnly(false);
                setTimeout(()=>{
                    setSuccess(false);
                },2000)
                updateUserRoles(true);
                closeModal(false);
            }).catch((error)=>{
                setServerError(error);
                setLoader(false);
                setBtnDisabled(false);
                setReadOnly(false);
            });
        }else{
            setErrors([t('user.createUserRole.validation.required')])
        }

    }
    const nodeRef=useRef(null);
    return (
        <>
        <EventHandler 
        success={success} 
        errors={errors} 
        serverError={serverError} 
        closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>
        <CSSTransition nodeRef={nodeRef} in={transitionProp} classNames="fade" timeout={2500} mountOnEnter unmountOnExit>
        <div className="popup">
            <div className="createUserRole-main">
                <div className="closeModalWhite"> <IoCloseCircle className="closeModalIcon" onClick={()=>closeModal(false)}/></div>
                <div className="title"><h2>{t('user.createUserRole.title')}</h2></div>
                <form onSubmit={(e)=>createRole(e)} className="FlexForm">

                    <div className="form-items flex">

                        <div className="form-children">
                            <label>{t('user.createUserRole.role')}</label>
                            <div className="selectContainer createUserRoleSelect">
                                <Select
                                    options={roleOptions}
                                    onChange={(selected)=>{setRoles(selected.value)}}
                                    isDisabled={readOnly}
                                    isSearchable={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-button-container">
                    {!loader ?
                        <button
                        type='submit'
                        disabled={btndisabled}
                        className={btndisabled ? 'btn disabled':'btn formButton'}>
                            {t('user.createUserRole.create')} <FaArrowCircleRight className='btn-icon'/>
                        </button>:
                        <span className='loader schoolCreate'></span>
                    }
                    </div>
                </form>
            </div>
         </div>
        </CSSTransition>
         </>
    );
};
export default CreateUserRole;