import { useState } from 'react';
import ComponentTitle from '../../../CommonComponents/ComponentTitle/componentTitle';
import SideMenu from '../../../CommonComponents/SideMenu/sidemenu';
import EventHandler from '../../../EventHandler/eventhandler';
import { useNavigate, useParams } from 'react-router-dom';
import TabMenu from '../../../CommonComponents/TabMenu/tabMenu';
        
const UserRoles = () => {
    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);
    const navigate = useNavigate();

    /*btn handle*/
    const [btndisabled, setBtnDisabled]=useState(false);
    const [loader, setLoader]=useState(false);
    /*DataSave*/
    const [dataSave, setDataSave]=useState();
    let { userId }=useParams();

    /*TabMenu */
    const tabData=[
        {
            "id":"1",
            "name":"Info",
            "url":`/users/${userId}`
        },
        {
            "id":"2",
            "name":"Roles",
            "url":`/users/${userId}/roles`
        },
        {
            "id":"3",
            "name":"Logs",
            "url":`/users/${userId}/logs`
        }
        
    ]
    return (

        <>
        <EventHandler 
        success={success} 
        errors={errors} 
        serverError={serverError} 
        closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>
        <div className="userRoles-main-container">
            
            
            
        </div>
        </>
    );
};
export default UserRoles;