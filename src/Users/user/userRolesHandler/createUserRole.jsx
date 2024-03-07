import { useEffect, useState } from "react";
import EventHandler from "../../../EventHandler/eventhandler";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import ServiceClient from "../../../ServiceClient";
import Select from "../../../CommonComponents/Select/select";
        
const CreateUserRole = () => {

    /*Loaders*/
    const dataLoader =useLoaderData();
    useEffect(()=>{
       
        setLoader(false);
        setReadOnly(false);
        
    },[]);

    /*Form fields */
    const [ref_schools, setRefSchool]=useState();
    const [roles, setRoles]=useState();
    const [readOnly, setReadOnly]=useState(true);
    
    const {userId}=useParams();
    /*btn handle*/
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
        setBtnDisabled(true);
        setLoader(true);
        setReadOnly(true);

        let dataPost={};
        dataPost.roleId = roles;
        dataPost.refId = ref_schools;
        dataPost.userId = userId;

        let url='http://127.0.0.1:8000/api/createUserRole';
        ServiceClient.post(url,dataPost).then((response)=>{
            if(response.status===200){
                setSuccess(true);
                setLoader(false);
                setBtnDisabled(false);
                setReadOnly(false);
                setTimeout(()=>{
                    setSuccess(false);
                },2000)
                setRoles('');
                setRefSchool('');
            }
        }).catch((error)=>{
            setServerError(error);
            setLoader(false);
            setBtnDisabled(false);
            setReadOnly(false);
        });
    }
    return (
        <>
        <EventHandler 
        success={success} 
        errors={errors} 
        serverError={serverError} 
        closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>
        <div className="content-main-container">
            <div className="title"><h2>Permission Control</h2></div>
            <form onSubmit={(e)=>createRole(e)} className="SchoolForm">
                
                <div className="school-form flex">

                    <div className="flex">
                        <label>Role</label>
                        <div className="selectContainer">
                            <Select 
                            options={dataLoader?.roles}
                            onSelect={(option)=>setRoles(option.id)}
                            InitialValue={""}
                            disabled={readOnly}/>
                        </div>
                    </div>    
                    
                    <div className="flex">
                        <label>Reference School</label>
                        <div className="selectContainer">
                            <Select 
                            options={dataLoader?.schools}
                            onSelect={(option)=>setRefSchool(option.id)}
                            InitialValue={""}
                            disabled={readOnly}/>
                        </div>
                    </div>
                    
                </div>
                
                {!loader ?
                    <button 
                    type='submit' 
                    disabled={btndisabled} 
                    className={btndisabled ? 'btn disabled':'btn formButton'}>
                        Create <FaArrowCircleRight className='btn-icon'/>
                    </button>:
                    <span className='loader schoolCreate'></span>
                }
            </form>

         </div>
         </>
    );
};
export default CreateUserRole;