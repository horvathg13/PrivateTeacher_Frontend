import {Outlet, Navigate} from 'react-router-dom';
import {useContext} from "react";
import {UserContext} from "./Context/UserContext";

const AdminRight=(props)=>{
    const {roles} = useContext(UserContext);
    const isAdmin=roles.some(i=> i ==='Admin');

    if(isAdmin){
        return props.children
    }else{
        return(
            <Navigate to={'/home'}/>
        )
    }
}

export default AdminRight