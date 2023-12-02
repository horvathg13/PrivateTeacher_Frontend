import './sidemenu.css';
import {FaBan} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import {FaScaleUnbalanced} from 'react-icons/fa6';
import {RxUpdate} from 'react-icons/rx';
import menu from './menu.json'        
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import '../../transitions.css'

const SideMenu = ({active}) => {
    const getIcon=(iconName)=>{
        switch (iconName) {
            case 'FaBan':return <FaBan className='menu-icon icon'/>;
            case 'FaScaleUnbalanced': return <FaScaleUnbalanced className='menu-icon icon' />;
            case 'RiLockPasswordFill': return <RiLockPasswordFill className='menu-icon icon'/>;
            case 'RxUpdate': return <RxUpdate className='menu-icon icon'/>;

            default: return null;
        }
    }

    const nodeRef = useRef(null);
    return (
        <CSSTransition nodeRef={nodeRef} in={active} classNames="sideMenu" timeout={500} mountOnEnter unmountOnExit>
            <div className="side-main-conainer" ref={nodeRef}>
                {
                    menu.map((e,i)=>
                        <div className="element-container flex">
                            <div className="icon-container">{getIcon(e.icon)}</div>
                            <div className="name-container"><h4>{e.name}</h4></div>
                        </div>
                    )
                }
            </div>
        </CSSTransition>
    );
};
export default SideMenu;
