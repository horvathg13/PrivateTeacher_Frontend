import {Outlet, Navigate} from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./Context/UserContext";
import ServiceClient from "./ServiceClient";
import {useTranslation} from "react-i18next";

const AdminRight=(props)=>{
    const {roles, setUsername, setRoles, setStatus} = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const {t}=useTranslation();

    useEffect(() => {
        if (!roles.length) {
            ServiceClient.post("/api/getUserData").then((response) => {
                if (response.status === 200) {
                    setUsername(response.data.user.first_name);
                    setRoles(response.data.roles);
                    setStatus(response.data.user.user_status);
                }
            }).catch(error=>
                console.log(error)
            ).finally(() => setLoading(false));

        } else {
            setLoading(false);
        }
    }, [roles]);

    if (loading) {
        return <div>{t('header.notifications.loader')}</div>
    }
    const isAdmin=roles.some(i=> i ==='Admin');

    if(isAdmin && localStorage.getItem('token')){
        return props.children
    }else{
        return(
            <Navigate to={'/home'}/>
        )
    }
}

export default AdminRight