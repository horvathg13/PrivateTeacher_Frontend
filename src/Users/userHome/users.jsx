import { Link, Outlet, useNavigate } from "react-router-dom";
import ComponentTitle from "../../CommonComponents/ComponentTitle/componentTitle";
import SideMenu from "../../CommonComponents/SideMenu/sidemenu";
import TabMenu from "../../CommonComponents/TabMenu/tabMenu";
import { PiUserListFill  } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";
import "./users.css";
        
const Users = () => {
    const navigate= useNavigate();
    const tabData=[
        {
            "id":"1",
            "name":"User List",
            "url":'/users/list',
        },
        {
            "id":"2",
            "name":"Create",
            "url":'/users/create'
        },
    ]

    const breadcumbs=[
        {
            "id":"1",
            "name":"Home",
            "url":"/home",
            "icon":"IoIosArrowForward"
        },
        {
            "id":"2",
            "name":"Users",
            "url":"/users",
        },
    ]
    return (
        <div className="user-main-container">
            <ComponentTitle breadcumbs={breadcumbs}/>
            <SideMenu/> 
            <div className="user-main">
                { window.location.pathname === '/users' ? 
                <div className="button-main-container flex">
                    <div className="button-container">
                        <Link to={"/users/list"}><div className="icon-container"><PiUserListFill  className="icon"/></div></Link>
                        <div className="icon-text"><h3>List</h3></div>
                    </div>
                    <div className="button-container">
                        <Link to={"/users/create"}><div className="icon-container" ><FaUserPlus className="icon"/></div></Link>
                        <div className="icon-text"><h3>Create</h3></div>
                    </div>
                   
                </div>:<TabMenu menu={tabData}/>}
                <Outlet/>
            </div>
        </div>
    );
};
export default Users;