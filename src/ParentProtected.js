import {Outlet, Navigate} from 'react-router-dom';
import {useContext, useEffect} from "react";
import {UserContext} from "./Context/UserContext";

const ParentProtectedRoutes=(props)=>{
    const {roles, status}=useContext(UserContext);

    if(!roles.some(e=>e === 'Parent') && localStorage.getItem('token') && status !== 'BANNED'){
        return(
            <Navigate to={'/'}/>
        )
    }else{
        return props.children
    }
}

export default ParentProtectedRoutes