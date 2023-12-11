import { useState } from 'react';
import ComponentTitle from '../../../CommonComponents/ComponentTitle/componentTitle';
import SideMenu from '../../../CommonComponents/SideMenu/sidemenu';
import TabMenu from '../../../CommonComponents/TabMenu/tabMenu';
import EventHandler from '../../../EventHandler/eventhandler';
import './userLog.css';
import { useNavigate, useParams } from 'react-router-dom';
        
const UserLog = () => {
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
            "url":`/users/${userId}`,
            "end":true,
        },
        {
            "id":"2",
            "name":"Roles",
            "url":`/users/${userId}/roles`,
            "end":true,
        },
        {
            "id":"3",
            "name":"Logs",
            "url":`/users/${userId}/logs`,
            "end":true,
        }
         
     ]
    return (
    <>
    <EventHandler
    success={success}
    errors={errors}
    serverError={serverError}
    closeErrorMessage={(data) => { if (data === true) { setErrors([]); } } } />
    
    <div className="content-main-container">


    </div>
    </>
    );
};
export default UserLog;