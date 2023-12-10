import { IoIosArrowForward } from "react-icons/io";
import "./componentTitle.css";
import { NavLink } from "react-router-dom";
        
const ComponentTitle = ({breadcumbs}) => {
    const getIcon=(iconName)=>{
        switch (iconName) {
            case 'IoIosArrowForward':return <IoIosArrowForward className='breadicon'/>;
            default: return null;
        }
    }
    return (
        <div className="component-title-container flex">
            <div className="title">
                <h1>Users</h1>
            </div>
            <div className="breadcumbs flex">
                {breadcumbs.map((e)=>
                <><h4 key={e.id}><NavLink to={e.url} end={e.end}>{e.name}</NavLink></h4>{getIcon(e.icon)}</>
                )}
            </div>
            <div className="nofitications"><h4>New Message Arrived</h4></div>
        </div>
    );
};
export default ComponentTitle;