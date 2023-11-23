import './home.css';
import menu from './homeMenu.json';
import { HiDocumentDownload } from "react-icons/hi";
import { IoMdSchool } from "react-icons/io";
import { FaChild, FaSearch, FaUsers } from "react-icons/fa";
import { BiSolidMessageDetail } from "react-icons/bi";
import { PiStudentBold } from "react-icons/pi";
import { MdPayment } from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";
import { FaSchool } from 'react-icons/fa6';

        
const Home = () => {
    const getIcon=(iconName)=>{
        switch (iconName) {
            case 'FaUsers':return <FaUsers />;
            case 'HiDocumentDownload': return <HiDocumentDownload />;
            case 'IoMdSchool': return <IoMdSchool />;
            case 'FaChild': return <FaChild/>;
            case 'FaSearch': return <FaSearch/>;
            case 'BiSolidMessageDetail': return <BiSolidMessageDetail/>;
            case 'PiStudentBold': return <PiStudentBold/>;
            case 'MdPayment': return <MdPayment/>;
            case 'BsCalendar3': return <BsCalendar3/>;
            case 'FaSchool':return <FaSchool  />;
            default: return null;
        }
    }

    return (
        <div className="homeMenu-main-container flex">
            {menu.map((e, i) => (
                <div className="circle-menu-container" key={i}>
                    <div className="icon">{getIcon(e.icon)}</div>
                    <div className="menu-name">{e.name}</div>
                </div>
            ))}
        </div>
    );
};
export default Home;