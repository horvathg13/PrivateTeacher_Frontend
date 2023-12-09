import './navMenu.css';
import { NavLink } from 'react-router-dom';
        
const NavMenu = () => {
    const links=[
        {
        "id":"1",
        "name":"create",
        "url":"/user/create"
        },
        {
            "id":"2",
            "name":"logs",
            "url":"/user/logs"
        },
        {
            "id":"3",
            "name":"shools",
            "url":"/user/schools"
        },
        {
            "id":"4",
            "name":"roles",
            "url":"/user/roles"
        }
    ]
    return (
       <div className="nav-main-conatiner flex">
            <div className="nav-header flex">
                <h3>Navigation</h3>
            </div>
            
            <div className="links">
                { links.map((e)=>
                    <NavLink><li>{e.name}</li></NavLink>
                )}
            </div>
        </div>    
       
    );
};
export default NavMenu;