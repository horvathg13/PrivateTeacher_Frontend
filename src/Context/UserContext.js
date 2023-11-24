import ServiceClient from "../ServiceClient";
import React,{ useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({children})=>{
    const [username, setUsername]=useState('');
    const value ={username, setUsername};

    useEffect(()=>{
        ServiceClient.post("http://127.0.0.1:8000/api/getUserData").then((response)=>{
            console.log(response);
            if(response.status===200){
                setUsername(response.data.user.first_name)
            }
        })
    },[])
    
    
    return(
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}