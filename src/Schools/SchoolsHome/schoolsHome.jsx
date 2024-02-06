import { Link, Outlet, useNavigate } from "react-router-dom";
import ComponentTitle from "../../CommonComponents/ComponentTitle/componentTitle";
import SideMenu from "../../CommonComponents/SideMenu/sidemenu";
import TabMenu from "../../CommonComponents/TabMenu/tabMenu";
import { FaListUl } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import "./schoolsHome.css";
import { useContext, useEffect } from "react";
import { TabMenuContext } from "../../Context/UserContext";
        
const SchoolsHome = () => {
    const navigate= useNavigate();
    /*TabMenu */
    const {setMenuItems}=useContext(TabMenuContext);
    useEffect(()=>{
        setMenuItems([
            {
                "id":"1",
                "name":"School List",
                "url":'/schools/list',
            },
            {
                "id":"2",
                "name":"Create",
                "url":'/schools/create'
            },
        ]);
    },[])
   

    const breadcrumbs=[
        {
            "id":"1",
            "name":"Home",
            "url":"/home",
            "icon":"IoIosArrowForward"
        },
        {
            "id":"2",
            "name":"Schools",
            "url":"/schools",
        },
    ]
    return (
        <>
        <SideMenu/> 
        <div className="content-main-container">
            
            <div className="home-component-main">
                
                
                
                <ComponentTitle 
                title={"Schools"}
                breadcrumbs={breadcrumbs}/>
                { window.location.pathname === '/schools' ?
                <div className="button-main-container flex">
                    <div className="button-container">
                        <Link to={"/schools/list"}><div className="icon-container"><FaListUl className="icon" /></div></Link>
                        <div className="icon-text"><h3>List</h3></div>
                    </div>
                    <div className="button-container">
                        <Link to={"/schools/create"}><div className="icon-container"><IoIosCreate className="icon" /></div></Link>
                        <div className="icon-text"><h3>Create</h3></div>
                    </div>

                </div>
                :<TabMenu/>}
                 <Outlet/>
            </div>
           
        </div>
        </>
    );
};
export default SchoolsHome;