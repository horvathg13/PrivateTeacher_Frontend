import { NavLink, useNavigate } from 'react-router-dom';
import './tabMenu.css';
        
const TabMenu = ({menu}) => {
    const navigate=useNavigate();
    return (
        
        <div className="tabMenu-container flex">
        { menu.map((e)=>
           <NavLink to={e.url} end={e.end}><button className={'btn action flex'}>{e.name}</button></NavLink>
        )}
        </div>
        
    );
};
export default TabMenu;



