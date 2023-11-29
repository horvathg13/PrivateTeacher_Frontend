import './sidemenu.css';
import {FaBan} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import {FaScaleUnbalanced} from 'react-icons/fa6';
import menu from './menu.json'        

const SideMenu = () => {
    const getIcon=(iconName)=>{
        switch (iconName) {
            case 'FaBan':return <FaBan style={{color:'var(--RedColor)'}}/>;
            case 'FaScaleUnbalanced': return <FaScaleUnbalanced style={{color:'var(--PurpleColor)'}}/>;
            case 'RiLockPasswordFill': return <RiLockPasswordFill style={{color:'var(--DangerColor)'}}/>;
           
            default: return null;
        }
    }
    return (
        <div className="side-main-conainer">
            {
                menu.map((e,i)=>
                    <div className="element-container flex">
                        <div className="icon">{getIcon(e.icon)}</div>
                        <div className="name"><h4>{e.name}</h4></div>
                    </div>
                )
            }
            
                
            
        </div>
    );
};
export default SideMenu;
