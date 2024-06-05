import '../common.css';
import { NavLink } from 'react-router-dom';
import { BsList } from "react-icons/bs";
import { useState } from 'react';
import { FaSchool } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';
        
const NavMenu = ({title, links}) => {
    const [hideMenu, setHideMenu] = useState(true);
    /*const links=[
        {
        "id":"1",
        "name":"create",
        "url":"/user/create"
        },
        {
            "id":"2",
            "name":"logs",
            "url":"/user/logs"
        },
        {
            "id":"3",
            "name":"shools",
            "url":"/user/schools"
        },
        {
            "id":"4",
            "name":"roles",
            "url":"/user/roles"
        }
    ]*/
    return (
        <>
        { hideMenu === false ? <div className="nav-menu-circle flex" onClick={() => setHideMenu(!hideMenu)} >
            
            <div className="nav-icon-container"><BsList className='nav-icon' /></div>
        </div> : ""}
        {links && hideMenu ?
        <div className="nav-main-conatiner flex">

            
            <>
                <div className="nav-header flex">
                    <h3>{title ? title : "Navigation"}<MdClose  className='nav-icon' onClick={() => setHideMenu(!hideMenu)} /></h3>
                </div>
                <div className="links">
                    {links.map((e) => <NavLink><li>{e.name}</li></NavLink>
                    )}
                </div>
            </> 
        </div>: ""}
        </>    
       
    );
};
export default NavMenu;