import './home.css';
import menu from './homeMenu.json';
import { HiDocumentDownload } from "react-icons/hi";
import { IoMdSchool } from "react-icons/io";
import { FaChild, FaSearch, FaUsers } from "react-icons/fa";
import { BiSolidMessageDetail } from "react-icons/bi";
import {PiNewspaperBold, PiStudentBold} from "react-icons/pi";
import { MdPayment } from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";
import {FaSchool, FaUserGraduate} from 'react-icons/fa6';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import {useTranslation} from "react-i18next";
        
const Home = () => {
    const {username} =useContext(UserContext);
    const navigate = useNavigate();
    const {t}=useTranslation();
    const getIcon=(iconName)=>{
        switch (iconName) {
            case 'FaUsers':return <FaUsers />;
            //case 'HiDocumentDownload': return <HiDocumentDownload />;
            //case 'IoMdSchool': return <IoMdSchool />;
            case 'FaChild': return <FaChild/>;
            case 'FaSearch': return <FaSearch/>;
            case 'BiSolidMessageDetail': return <BiSolidMessageDetail/>;
            //case 'PiStudentBold': return <PiStudentBold/>;
            //case 'MdPayment': return <MdPayment/>;
            //case 'BsCalendar3': return <BsCalendar3/>;
            case 'FaSchool':return <FaSchool  />;
            case 'FaUserGraduate':return <FaUserGraduate/>;
            case 'PiNewspaperBold':return <PiNewspaperBold/>;

                default: return null;
        }
    }

    return (
        <>
        <div className="home-text">
            <h1>{t('home.greeting')} {username}</h1>
            <p>{t('home.subtitle')}</p>
        </div>
        <div className="homeMenu-main-container flex">
            {menu.map((e, i) => (
                <div className="circle-menu-container" key={i}>
                    <div className="icon grid" onClick={()=>navigate(`${e.url}`)}>{getIcon(e.icon)}</div>
                    <div className="menu-name">{t(`home.menu.${e.name}`)}</div>
                </div>
            ))}
        </div>
        </>
    );
};
export default Home;