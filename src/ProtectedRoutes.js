import {Outlet, Navigate} from 'react-router-dom';
import {useContext} from "react";
import {UserContext} from "./Context/UserContext";

const ProtectedRoutes=(props)=>{
    const {status}=useContext(UserContext);
    if(localStorage.getItem('token') && status !== 'BANNED'){
        return props.children
        
    }else{
        return(
        <Navigate to={'/'}/>
        ) 
    }
}

export default ProtectedRoutes