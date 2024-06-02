import { useContext, useEffect, useLayoutEffect, useState } from "react";
import EventHandler from "../../../EventHandler/eventhandler";
import { Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import SchoolYearDetailsPopup from "./schoolYearDetailsPopup";
import AreYouSure from "../../../CommonComponents/AreYouSure/areyousure";
import ServiceClient from "../../../ServiceClient";
import { GrUpdate } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";
import TabMenu from "../../../CommonComponents/TabMenu/tabMenu";
import ComponentTitle from "../../../CommonComponents/ComponentTitle/componentTitle";
import SideMenu from "../../../CommonComponents/SideMenu/sidemenu";
import { TabMenuContext, schoolYearDetailsContext } from "../../../Context/UserContext";
        
const SchoolYearDetails = () => {
    /*datas */
   
    let { schoolId, schoolYearId }=useParams();
    const [schoolData, statuses] = useLoaderData();

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Loader */
    const [loader, setLoader]=useState(true);
    const [formLoader, setFormLoader]=useState(false);
    const [deleteLoader, setDeleteLoader]=useState(true);

    /*Navigation */
    const navigation=useNavigate();

    /*TabMenu*/
    const {setMenuItems}=useContext(TabMenuContext);
    useLayoutEffect(()=>{
        setMenuItems([
            {
                "id":"1",
                "name":"Info",
                "url":""
            },
            {
                "id":"2",
                "name":"Breaks",
                "url":""
            },
            {
                "id":"3",
                "name":"Special Work Days",
                "url":""
            },
            {
                "id":"4",
                "name":"Courses",
                "url":""
            },
            {
                "id":"5",
                "name":"Students",
                "url":""
            }
        ]);
    },[])
    
    const breadcrumbs=[
        {
            "id":"1",
            "name":"Home",
            "url":"/home",
            "icon":"IoIosArrowForward",
            
        },
        {
            "id":"2",
            "name":"Schools",
            "url":"/schools",
            "icon":"IoIosArrowForward",
            
        },
        {
            "id":"3",
            "name":`${schoolData?.schoolName}`,
            "url":`/school/${schoolData?.schoolId}`,
            "icon":"IoIosArrowForward",
            "end":true,
        },
        {
            "id":"4",
            "name":`${schoolData?.year}`,
            "url":`/school/${schoolId}/school-year/${schoolYearId}`,
        }
        
    ]

   
   
    return (
        <>
        <schoolYearDetailsContext.Provider value={[schoolData, statuses]}>
            <div className="content-main-container">
                
                <Outlet/>
                

            </div>
        </schoolYearDetailsContext.Provider>
        </>
    );
};
export default SchoolYearDetails;