import {Outlet, Navigate} from 'react-router-dom';
import {useContext} from "react";
import {UserContext} from "./Context/UserContext";

const AdminRight=(props)=>{
    const {roles} = useContext(UserContext);
    const isAdmin=roles.filter(i=> i ==='Admin');

    console.log(roles, isAdmin)
    if(isAdmin.length){
        return props.children
    }else{
        return(
            <Navigate to={'/home'}/>
        )
    }

}

export default AdminRight