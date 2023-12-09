import { useNavigate } from 'react-router-dom';
import './tabMenu.css';
        
const TabMenu = ({menu}) => {
    const navigate=useNavigate();
    return (
        
        <div className="tabMenu-container flex">
        { menu.map((e)=>
            <button onClick={()=>{navigate(e.url)}} className={window.location.pathname === e.url ? 'btn action active flex' :'btn action flex'}>{e.name}</button>
        )}
        </div>
        
    );
};
export default TabMenu;



