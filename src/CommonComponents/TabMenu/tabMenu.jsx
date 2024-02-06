import { NavLink, useNavigate } from 'react-router-dom';
import './tabMenu.css';
import { useContext } from 'react';
import { TabMenuContext } from '../../Context/UserContext';
        
const TabMenu = ({menu}) => {
    const navigate=useNavigate();
    const {menuItem,setMenuItems} = useContext(TabMenuContext);
    return (
        
        <div className="tabMenu-container flex">
        { /*menu.map((e)=>
           <NavLink to={e.url} end={e.end}><button className={'btn action flex'}>{e.name}</button></NavLink>
        )*/}
        { menuItem?.map((e)=>
           <NavLink to={e.url} end={e.end}><button className={'btn action flex'}>{e.name}</button></NavLink>
        )}
        </div>
        
        
    );
};
export default TabMenu;



