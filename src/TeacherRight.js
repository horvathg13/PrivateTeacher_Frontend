import {Outlet, Navigate} from 'react-router-dom';
import {useContext} from "react";
import {UserContext} from "./Context/UserContext";

const TeacherRight=(props)=>{
    const {roles} = useContext(UserContext);
    const isTeacher=roles.some(i=> i ==='Teacher');

    if(isTeacher){
        return props.children
    }else{
        return(
            <Navigate to={'/home'}/>
        )
    }
}

export default TeacherRight