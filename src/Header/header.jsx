import { useEffect, useState } from 'react';
import './header.css';
import { FaListUl } from "react-icons/fa";
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import ServiceClient from '../ServiceClient';
import Success from '../SuccessPopup/success';
import { useNavigate } from 'react-router-dom';

        
const Header = () => {
    const [showMobileMenu, setMobileMenu]=useState(false);
    const [success, setSuccess]=useState(false);
    const [name, setName]=useState('');
    const navigate = useNavigate();

    let {username, setUsername}=useContext(UserContext); 

    /*methods:*/
    const logout=()=>{
        
        let url='http://127.0.0.1:8000/api/logout';

        ServiceClient.post(url).then((response)=>{
            if(response.status===200){
                setSuccess(true);
                setUsername(null);
                localStorage.removeItem('token');

                setTimeout(()=>{
                    navigate('/');
                    setSuccess(false);
                },2000)
                
            }
        }).catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        setName(username);
    },[{username}])

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            setName(null);
        }
    },[])
    return (
        <div className="main-container flex">
            {success ? <Success></Success>:null}
            <div className='logo-container'>
                <i className='graduatehat'></i>
                <h1>PrivateTeacher</h1> 
            </div>
            {name? <div className="mobile-menu">
                <FaListUl className='dropdown-btn icon' onClick={()=>{setMobileMenu(!showMobileMenu)}}/>
                
                {showMobileMenu ? <div className="menu-container">
                    <button className='headerBtn btn'>Home</button>
                    <button className='headerBtn btn'>My Requests</button>
                    <button className='headerBtn btn'>Messages</button>
                    <button className='headerBtn btn'>{name}</button>
                    <button className='headerBtn btn'>Logout</button>
                </div> :null}
            </div>:null}
            
            {name ?<div className="navbar">
                <button className='headerBtn btn'>Home</button>
                <button className='headerBtn btn'>My Requests</button>
                <button className='headerBtn btn'>Messages</button>
            </div>:null}
            {name ? <div className="user-container">
                <button className='headerBtn btn'>{username ? username : null}</button>
                <button className='headerBtn btn' onClick={logout}>Logout</button>
            </div>:null}
            
        </div>
        
    );
};
export default Header;