import { useEffect, useState } from 'react';
import ComponentTitle from '../../../CommonComponents/ComponentTitle/componentTitle';
import SideMenu from '../../../CommonComponents/SideMenu/sidemenu';
import EventHandler from '../../../EventHandler/eventhandler';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import TabMenu from '../../../CommonComponents/TabMenu/tabMenu';
import ServiceClient from '../../../ServiceClient';
import AreYouSure from "../../../CommonComponents/AreYouSure/areyousure";
import { FaPlus } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
        
const UserRoles = () => {
    /*dataLoader */
    const dataLoader=useLoaderData();
    useEffect(()=>{
        if(dataLoader){
            setHeader(dataLoader.header);
            setUserRoles(dataLoader.userRoles);
            setLoader(false);
        }else{
            setHeader("");
            setUserRoles("Something went wrong!");
            setLoader(false);
        }
    },[]);
    /*Datas */
    const [userRoles, setUserRoles]=useState();
    const [header, setHeader]=useState();
    const [selectedRow, setSelectedRow]=useState();
    
    /*Event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);
    const navigate = useNavigate();

    /*Btn handle*/
    const [btndisabled, setBtnDisabled]=useState(false);
    const [loader, setLoader]=useState(false);

    /*DataSave*/
    const [dataSave, setDataSave]=useState();
    let { userId }=useParams();

    /*Popup control */
   
    const [AreYouSureName, setAreYouSureName]=useState('');
    const [areYouSureTransitionProp, setAreYouSureTransitionProp]=useState(false);

    

    /*Methods: */
    const functionControl=(name)=>{
        if(name === 'delete'){
            //remove
            setAreYouSureTransitionProp(false);
        }
            
        setAreYouSureTransitionProp(false);
        
    }
    
    return (

        <>
        <EventHandler 
        success={success} 
        errors={errors} 
        serverError={serverError} 
        closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>
        <AreYouSure
        name={AreYouSureName}
        answer={functionControl}
        transitionProp={areYouSureTransitionProp}/>

        <div className="content-main-container">
            <div className='formTitle'><FaPlus className='table-action-icon' /></div> 
            <div className="table-main-container">
                {!loader ? 
                <table>
                    <thead>
                        <tr>
                           
                            {header ? header.map((e, i) => (
                                <> 
                                <th key={i}>{e}</th>
                                </>
                            )) : null}
                             <th></th>
                        </tr>

                    </thead>
                    <tbody>
                        { userRoles ? userRoles.map((e,i) => (
                            <tr key={i} onClick={() => {setSelectedRow(e);}}>
                           
                                <td>{e.role}</td>
                                <td>{e.reference?.name}</td>
                                <td><FaTrashCan className='table-action-icon' onClick={()=>{setAreYouSureName("delete");setAreYouSureTransitionProp(true)}}/></td>
                            
                            </tr>

                        )):null}
                        {!userRoles || userRoles.length===0  ?
                        <tr>
                             <td colSpan={3} className="no-school" >No registered role to this user.</td>
                        </tr>:null}
                        
                    </tbody>
                </table> : 
                <span className='loader table'></span>}
                
            </div>
           
        </div>
        </>
    );
};
export default UserRoles;