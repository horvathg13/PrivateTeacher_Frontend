import './sidemenu.css';
import {FaBan, FaUsers ,FaUserPlus} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import {FaScaleUnbalanced} from 'react-icons/fa6';
import {RxUpdate} from 'react-icons/rx';
import menu from './menu.json'        
import { CSSTransition } from 'react-transition-group';
import { useRef, useState } from 'react';
import '../../transitions.css'

const SideMenu = ({active}) => {
    const getIcon=(iconName)=>{
        switch (iconName) {
            case 'FaBan':return <FaBan className='menu-icon icon'/>;
            //case 'FaScaleUnbalanced': return <FaScaleUnbalanced className='menu-icon icon' />;
            //case 'RiLockPasswordFill': return <RiLockPasswordFill className='menu-icon icon'/>;
            case 'FaUsers': return <FaUsers className='menu-icon icon'/>;
            case 'FaUserPlus':return <FaUserPlus className='menu-icon icon'/>;
            default: return null;
        }
    }
    const [selectedMenu,setSelectedMenu]=useState(1);
        

    const nodeRef = useRef(null);
    return (
        <div className="side-main-conainer" ref={nodeRef}>
            {
                menu.map((e,i)=>
                    <div className="element-container flex" key={i}>
                        <div className={selectedMenu === e.id ? "icon-container active" : "icon-container"} onClick={()=>setSelectedMenu(e.id, console.log(e))}>{getIcon(e.icon)}</div>
                        <div className="name-container"><h4>{e.name}</h4></div>
                    </div>
                )
            }
        </div>
    );
};
export default SideMenu;
