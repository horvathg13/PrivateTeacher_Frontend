import { useEffect, useState } from 'react';
import ComponentTitle from '../../CommonComponents/ComponentTitle/componentTitle';
import SideMenu from '../../CommonComponents/SideMenu/sidemenu';
import EventHandler from '../../EventHandler/eventhandler';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import TabMenu from '../../CommonComponents/TabMenu/tabMenu';
import ServiceClient from '../../ServiceClient';
import AreYouSure from "../../CommonComponents/AreYouSure/areyousure";
import { FaPlus } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import CreateUserRole from "./createUserRole";
import {useTranslation} from "react-i18next";
        
const UserRoles = () => {
    /*Translation*/
    const {t}=useTranslation();
    /*dataLoader */
    const [dataLoader, roleOptions]=useLoaderData();
    useEffect(()=>{
        if(dataLoader){
            setHeader(dataLoader.header);
            /*setUserRoles(dataLoader.userRoles);*/
            setLoader(false);
        }else{
            setHeader("");
            setLoader(false);
        }
    },[]);

    /*Data*/
    const [userRoles, setUserRoles]=useState(dataLoader.userRoles);
    const [header, setHeader]=useState();
    const [selectedRowId, setSelectedRow]=useState();
    const [createUserRole, setCreateUserRole]=useState(false);
    
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
            removeUserRole();
            setAreYouSureTransitionProp(false);
        }
            
        setAreYouSureTransitionProp(false);
        
    }
    const removeUserRole=()=>{
        setLoader(true);
        console.log(selectedRowId);
        let url=`/api/removeUserRole/${userId}/${selectedRowId.roleId}`
        
        ServiceClient.removeUserRole(userId,selectedRowId.roleId).then((success)=>{
            getUserRoles();
            setLoader(false);
        }).catch((error)=>{
            setErrors(error);
            setLoader(false);
        });
    }
    const getUserRoles=()=>{
        setLoader(true);
        ServiceClient.getUserRoles(userId).then((success)=>{
            setHeader(success.header);
            setUserRoles(success.userRoles);
            setLoader(false);
        }).catch((error)=>{
            setErrors(error);
            setLoader(false);
        });
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
        answer={(name)=>functionControl(name)}
        transitionProp={areYouSureTransitionProp}/>
        {createUserRole ?
        <CreateUserRole
            transitionProp={createUserRole}
            closeModal={(data)=>setCreateUserRole(data)}
            updateUserRoles={(data)=> {
                if (data === true) {
                    return getUserRoles()
                }
            }}
            roleOptions={roleOptions}
        />:null}
        <div>
            <div className='formTitle'><FaPlus className='table-action-icon' onClick={() => setCreateUserRole(!createUserRole)}/></div>
            <div className="table-main-container">
                {!loader ? 
                <table>
                    <thead>
                        <tr>
                           
                            {header ? header.map((e, i) => (
                                <> 
                                <th key={i}>{t(`tableHeaders.${e}`)}</th>
                                </>
                            )) : null}
                             <th></th>
                        </tr>

                    </thead>
                    <tbody>
                        { userRoles ? userRoles.map((e,i) => (
                            <tr key={i} onClick={() => {setSelectedRow(e);}}>
                           
                                <td>{e.role}</td>
                                <td><FaTrashCan className='table-action-icon' onClick={()=>{setAreYouSureName("delete");setSelectedRow(e); setAreYouSureTransitionProp(true)}}/></td>
                            
                            </tr>

                        )):
                        <tr>
                             <td colSpan={3} className="no-school" >{t('empty-table')}</td>
                        </tr>}
                        
                    </tbody>
                </table> : 
                <span className='loader table'></span>}
                
            </div>
           
        </div>
        </>
    );
};
export default UserRoles;