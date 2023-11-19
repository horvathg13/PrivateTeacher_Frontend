import { useState } from 'react';
import './header.css';
import { FaListUl } from "react-icons/fa";
        
const Header = () => {
    const [showMobileMenu, setMobileMenu]=useState(false);

    return (
        <div className="main-container flex">
            <div className='logo-container'>
                <i className='graduatehat'></i>
                <h1>PrivateTeacher</h1> 
            </div>
            <div className="mobile-menu">
                <FaListUl className='dropdown-btn icon' onClick={()=>{setMobileMenu(!showMobileMenu)}}/>
                
                {showMobileMenu ? <div className="menu-container">
                    <button className='headerBtn btn'>Home</button>
                    <button className='headerBtn btn'>My Requests</button>
                    <button className='headerBtn btn'>Messages</button>
                    <button className='headerBtn btn'>Username</button>
                    <button className='headerBtn btn'>Logout</button>
                </div> :null}
            </div>
            
            <div className="navbar">
                <button className='headerBtn btn'>Home</button>
                <button className='headerBtn btn'>My Requests</button>
                <button className='headerBtn btn'>Messages</button>
            </div>
            <div className="user-container">
                <button className='headerBtn btn'>Username</button>
                <button className='headerBtn btn'>Logout</button>
            </div> 
            
        </div>
        
    );
};
export default Header;