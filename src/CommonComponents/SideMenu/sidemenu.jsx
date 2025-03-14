import '../common.css';
import {FaBan, FaUsers, FaUserPlus, FaChild, FaSearch, FaEnvelope,} from 'react-icons/fa';
import { BiSolidMessageDetail } from "react-icons/bi";
import {RiLockPasswordFill} from 'react-icons/ri';
import {FaScaleUnbalanced, FaSchool, FaTruckMedical, FaUserGraduate } from 'react-icons/fa6';
import {RxUpdate} from 'react-icons/rx';
import menu from '../../Home/homeMenu.json';
import homeMenu from '../../Home/homeMenu.json';
import { CSSTransition } from 'react-transition-group';
import {useContext, useEffect, useRef, useState} from 'react';
import '../../transitions.css'
import { NavLink } from 'react-router-dom';
import {IoMenu} from "react-icons/io5";
import {AiOutlineMenuFold, AiOutlineMenuUnfold} from "react-icons/ai";
import {MdMenu, MdMenuOpen, MdNotificationsActive} from "react-icons/md";
import {PiNewspaperBold} from "react-icons/pi";
import {UserContext} from "../../Context/UserContext";
import menuButtonPermission from "../../menuButtonPermission";

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
            case 'FaUserGraduate': return <FaUserGraduate className='menu-icon icon'/>;
            case 'PiNewspaperBold': return <PiNewspaperBold className='menu-icon icon'/>;
            case 'FaEnvelope': return <FaEnvelope className='menu-icon icon'/>;

            default: return null;
        }
    }
    const [selectedMenu,setSelectedMenu]=useState(1);
    const [showMobileMenu, setShowMobileMenu]=useState(false);

    const {roles,hasAccessMessages, hasAccessRequests} = useContext(UserContext);
    const nodeRef = useRef(null);
    const [newMenu, setNewMenu] = useState([]);

    useEffect(() => {
        let menuPermission = menuButtonPermission.hasAccess(menu, roles, hasAccessMessages, hasAccessRequests)
        setNewMenu(menuPermission.menu);

    }, [hasAccessMessages, hasAccessRequests, roles]);
    return (
        <>
            <div className="mobile-sidemenu-container">
                <div className="mobile-menu-button-container">
                    {!showMobileMenu && <MdMenuOpen    className="mobile-menu-open-icon" onClick={()=>setShowMobileMenu(!showMobileMenu)}/>}
                    {showMobileMenu && <MdMenu className="mobile-menu-open-icon" onClick={()=>setShowMobileMenu(!showMobileMenu)}/>}
                </div>
                <CSSTransition
                    nodeRef={nodeRef}
                    in={showMobileMenu}
                    classNames="slide"
                    timeout={500}
                    mountOnEnter
                    unmountOnExit
                >
                <div className="mobile-side-main-conainer" ref={nodeRef}>
                    {
                        newMenu.map((e, i) =>
                            <>
                                <div className="element-container flex" key={i}>
                                    <NavLink to={e.url}>
                                        <div className="icon-container">{getIcon(e.icon)}</div>
                                    </NavLink>
                                </div>
                            </>
                        )
                    }
                </div>
                </CSSTransition>
            </div>
            <div className="side-main-conainer">
                {
                    newMenu.map((e, i) =>
                        <>
                            <div className="element-container flex" key={i}>
                                <NavLink to={e.url}>
                                    <div className="icon-container">{getIcon(e.icon)}</div>
                                </NavLink>
                            </div>
                        </>
                    )
                }
            </div>
        </>

    );
};
export default SideMenu;
