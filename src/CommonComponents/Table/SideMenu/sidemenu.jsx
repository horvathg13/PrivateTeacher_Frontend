import './sidemenu.css';
import {FaBan} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import {FaScaleUnbalanced} from 'react-icons/fa6';
import {RxUpdate} from 'react-icons/rx';
import menu from './menu.json'        

const SideMenu = () => {
    const getIcon=(iconName)=>{
        switch (iconName) {
            case 'FaBan':return <FaBan className='icon' style={{color:'var(--RedColor)'}}/>;
            case 'FaScaleUnbalanced': return <FaScaleUnbalanced className='icon' style={{color:'var(--PurpleColor)'}}/>;
            case 'RiLockPasswordFill': return <RiLockPasswordFill className='icon' style={{color:'var(--DangerColor)'}}/>;
            case 'RxUpdate': return <RxUpdate className='icon' style={{color:'var(--PrimaryColor)'}}/>;
            default: return null;
        }
    }
    return (
        <div className="side-main-conainer">
            {
                menu.map((e,i)=>
                    <div className="element-container flex">
                        <div className="icon-container">{getIcon(e.icon)}</div>
                        <div className="name-container"><h4>{e.name}</h4></div>
                    </div>
                )
            }
            
                
            
        </div>
    );
};
export default SideMenu;
