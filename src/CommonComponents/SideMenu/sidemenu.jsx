import '../common.css';
import {FaBan, FaUsers ,FaUserPlus, FaChild, FaSearch,} from 'react-icons/fa';
import { BiSolidMessageDetail } from "react-icons/bi";
import {RiLockPasswordFill} from 'react-icons/ri';
import {FaScaleUnbalanced, FaSchool, FaTruckMedical} from 'react-icons/fa6';
import {RxUpdate} from 'react-icons/rx';
import menu from './menu.json'        
import homeMenu from '../../Home/homeMenu.json';
import { CSSTransition } from 'react-transition-group';
import { useRef, useState } from 'react';
import '../../transitions.css'
import { NavLink } from 'react-router-dom';

const SideMenu = ({active}) => {
    const getIcon=(iconName)=>{
        switch (iconName) {
            case 'FaBan':return <FaBan className='menu-icon icon'/>;
            //case 'FaScaleUnbalanced': return <FaScaleUnbalanced className='menu-icon icon' />;
            //case 'RiLockPasswordFill': return <RiLockPasswordFill className='menu-icon icon'/>;
            case 'FaUsers': return <FaUsers className='menu-icon icon'/>;
            case 'FaUserPlus':return <FaUserPlus className='menu-icon icon'/>;
            case 'FaChild': return <FaChild className='menu-icon icon'/>;
            case 'FaSearch': return <FaSearch className='menu-icon icon'/>;
            case 'BiSolidMessageDetail': return <BiSolidMessageDetail className='menu-icon icon'/>;
            case 'FaSchool':return <FaSchool  className='menu-icon icon'/>;
            default: return null;
        }
    }
    const [selectedMenu,setSelectedMenu]=useState(1);
        

    const nodeRef = useRef(null);
    return (
        <div className="side-main-conainer" ref={nodeRef}>
            {
                homeMenu.map((e,i)=>
                    <div className="element-container flex" key={i}>
                        <NavLink to={e.url}>
                            <div className="icon-container">{getIcon(e.icon)}</div>
                        </NavLink>
                        {false&&<div className="name-container"><h4>{e.name}</h4></div>}
                    </div>
                )
            }
        </div>
    );
};
export default SideMenu;
