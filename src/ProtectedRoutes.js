import {Outlet, Navigate} from 'react-router-dom';

const ProtectedRoutes=(props)=>{

    if(localStorage.getItem('token')){
        return props.children
            
        
    }else{
        return(
        <Navigate to={'/'}/>
        ) 
    }
}

export default ProtectedRoutes