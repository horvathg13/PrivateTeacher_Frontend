import {Outlet, Navigate} from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./Context/UserContext";
import ServiceClient from "./ServiceClient";
import {FaSync} from "react-icons/fa";
import {useTranslation} from "react-i18next";

const TeacherRight = ({ children }) => {
    const { roles, setUsername, setRoles, setStatus, setUserId } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const {t}=useTranslation();

    useEffect(() => {
        if (!roles.length) {
            ServiceClient.post("/api/getUserData").then((response) => {
                    if (response.status === 200) {
                        setUsername(response.data.user.first_name);
                        setRoles(response.data.roles);
                        setStatus(response.data.user.user_status);
                        setUserId(response.data.user.id)
                    }
            }).catch(error=>
                console.log(error)
            ).finally(() =>
                setLoading(false)
            );
        } else {
            setLoading(false);
        }
    }, [roles]);

    if (loading) {
        return <div>{t('header.notifications.loader')}</div>
    }

    const isTeacher = roles.some(role => role === "Teacher");

    if(isTeacher && localStorage.getItem('token')){
        return children
    }else{
        return(
            <Navigate to={'/home'}/>
        )
    }
};

export default TeacherRight