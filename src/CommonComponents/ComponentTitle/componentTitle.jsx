import { IoIosArrowForward } from "react-icons/io";
import "../common.css";
import { NavLink } from "react-router-dom";
import {useContext, useState} from "react";
import {ComponentTitleContext} from "../../Context/UserContext";
        
const ComponentTitle = ({}) => {
    const getIcon=(iconName)=>{
        switch (iconName) {
            case 'IoIosArrowForward':return <IoIosArrowForward className='breadicon'/>;
            default: return null;
        }
    }
    const {title, breadcrumbs}=useContext(ComponentTitleContext);
    return (
        <div className="component-title-container flex">
            <div className="title">
                <h1 style={{overflow:"auto", textOverflow:"ellipsis"}}>{title}</h1>
            </div>
            <div className="breadcrumbs flex">
                {breadcrumbs.map((e)=>
                <><h4 key={e.id}><NavLink to={e.url} end={e.end}>{e.name}</NavLink></h4>{getIcon(e.icon)}</>
                )}
            </div>
            <div className="nofitications"><h4>New Message Arrived</h4></div>
        </div>
    );
};
export default ComponentTitle;