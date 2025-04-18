import ServiceClient from "../ServiceClient";
import React, {useEffect, useState} from "react";
import { createContext } from "react";
import {getCourseStatuses, getCurrenciesISO, getLanguages, getPaymentPeriods} from "../dataLoader";
import {useTranslation} from "react-i18next";
import i18next from "i18next";

export const UserContext = createContext(null);

export const UserContextProvider = ({children})=>{
    const [username, setUsername]=useState('');
    const [roles, setRoles]=useState([]);
    const [status,setStatus]=useState('');
    const [userId, setUserId]=useState();
    const [hasAccessMessages, setHasAccessMessages]=useState();
    const [hasAccessRequests, setHasAccessRequests]=useState();
    const [hasChild, setHasChild] = useState();

    const value = {
        username,
        setUsername,
        setRoles,
        roles,
        status,
        setStatus,
        userId,
        setUserId,
        hasAccessMessages,
        setHasAccessMessages,
        hasAccessRequests,
        setHasAccessRequests,
        hasChild,
        setHasChild,
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            ServiceClient.getUserData().then((success)=>{
                setUsername(success?.user?.first_name);
                setRoles(success?.roles);
                setStatus(success?.user?.user_status);
                setUserId(success?.user?.id);
                setHasAccessMessages(success?.menuButtonsPermission[0]?.hasAccessMessages);
                setHasAccessRequests(success?.menuButtonsPermission[0]?.hasAccessRequests);
                setHasChild(success?.hasChild)
            })
        }
    },[])
    
    
    return(
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}


export const userInfoContext=createContext(null);

export const UserInfoContextProvider= ({children})=>{
    const [userData, setUserData]=useState([])

    const values ={userData,setUserData};

    return(
        <userInfoContext.Provider value={values}>{children}</userInfoContext.Provider>
    )
}

export const schoolInfoContext = createContext(null);

export const schoolYearContext = createContext(null);

export const schoolYearDetailsContext = createContext(null);

export const TabMenuContext = createContext(null);

export const TabMenuContextProvider = ({children})=>{
    const [menuItem, setMenuItems]=useState([]);
    const value ={menuItem, setMenuItems};
    
    
    return(
        <TabMenuContext.Provider value={value}>{children}</TabMenuContext.Provider>
    )
}

export const ComponentTitleContext = createContext(null);

export const ComponentTitleProvider=({children})=>{
    const [title, setTitle]=useState('');
    const [breadcrumbs, setBreadcrumbs]=useState([]);
    const values= {setTitle, title, setBreadcrumbs, breadcrumbs}
    /*const handleBreadcrums=(breadcrumb)=>{
        let checkCrumb= breadcrumbs.some(i=>i===breadcrumb);
        if(checkCrumb===true){
            let newArray=breadcrumbs.filter(b=>b !== breadcrumb);
            setBreadcrumbs(newArray);
        }else{
            setBreadcrumbs([...breadcrumbs,breadcrumb])
        }
    }*/

    return(
        <ComponentTitleContext.Provider value={values}>{children}</ComponentTitleContext.Provider>
    )
}

export const LocationInfoContext = createContext(null);
export const ChildInfoContext = createContext([]);

export const ChildInfoContextProvider =({children})=>{
    const [childInfo, setChildInfo]=useState([]);

    const values={childInfo, setChildInfo}

    return(
        <ChildInfoContext.Provider value={values}>{children}</ChildInfoContext.Provider>
    )
}

export const SearchResults=createContext(null);

export const NotificationsContext = createContext({});

export const CourseInfoContext=createContext({});

export const StaticDataContext = createContext({});

export const StaticDataContextProvider=({children})=>{
    const {t, i18n }=useTranslation();

    const [statuses, setStatuses]=useState([]);
    const [paymentPeriods, setPaymentPeriod]=useState([]);
    const [currencies, setCurrencies]=useState({});
    const [languages, setLanguages]=useState([]);

    useEffect(()=>{
        if(localStorage.getItem('token')){
            Promise.all ([getCourseStatuses(),getPaymentPeriods(), getCurrenciesISO(),getLanguages()]).then((response)=>{
                setStatuses(response[0]);
                setPaymentPeriod(response[1]);
                setCurrencies(response[2]);
                setLanguages(response[3]);
            })
        }

    },[])

    const values = {statuses, setStatuses, paymentPeriods, setPaymentPeriod, currencies, setCurrencies, languages, setLanguages}

    return <StaticDataContext.Provider value={values}>{children}</StaticDataContext.Provider>
}