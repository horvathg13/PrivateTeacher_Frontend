import './user.css';
import EventHandler from '../EventHandler/eventhandler';
import Table from '../CommonComponents/Table/table';
import SideMenu from '../CommonComponents/SideMenu/sidemenu';
import ComponentTitle from '../CommonComponents/ComponentTitle/componentTitle';
import ServiceClient from '../ServiceClient';
import { useEffect, useLayoutEffect, useState } from 'react';
        
const User = () => {
    const [users, setUsers]=useState({});
    const [loader, setLoader]=useState(false);

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);


    useLayoutEffect(()=>{
        setLoader(true);
       let url='http://127.0.0.1:8000/api/getUsers';
       ServiceClient.post(url).then((response)=>{
        if(response.status===200){
            setLoader(false);
            setUsers(response.data);
            console.log(response.data)
        }
       }).catch((error)=>{
        setServerError(error);
        setLoader(false);
       })
    },[])

    useEffect(()=>{console.log(users)},[users])
    return (
        <>
        <EventHandler 
        success={success} 
        errors={errors} 
        serverError={serverError} 
        closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>
        <ComponentTitle />
        <Table datas={users ? users :null}
        loader={loader}/> 
        <SideMenu />
        </>
            
        
    );
};
export default User;