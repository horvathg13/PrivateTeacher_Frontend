import { Outlet, useLoaderData, useParams } from 'react-router-dom';
import './school.css';
import SideMenu from '../../CommonComponents/SideMenu/sidemenu';
import ComponentTitle from '../../CommonComponents/ComponentTitle/componentTitle';
import TabMenu from '../../CommonComponents/TabMenu/tabMenu';
import { schoolInfoContext } from '../../Context/UserContext';
        
const School = () => {
    let { schoolId }=useParams();
    const schoolData = useLoaderData();

    const tabData=[
        {
            "id":"1",
            "name":"Info",
            "url":`/school/${schoolId}`,
            "end":true,
        },
        {
            "id":"2",
            "name":"School Year",
            "url":""
        },
        {
            "id":"3",
            "name":"Courses",
            "url":""
        },
        {
            "id":"4",
            "name":"Days and Times",
            "url":""
        },
        {
            "id":"5",
            "name":"Students",
            "url":""
        },
        
    ]
    
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
            "end":true,
        },
        {
            "id":"3",
            "name":`${schoolData.name}`,
            "url":`/school/${schoolData.id}`,
        },
    ]
    return (
        <schoolInfoContext.Provider value={schoolData}>
            <SideMenu/>    
            <div className="content-main-container">
                <ComponentTitle 
                title={"Users"}
                breadcrumbs={breadcrumbs}/>
                
                <div className="user-main">
                   
                    <TabMenu menu={tabData}/>
                    <Outlet/>
                </div>
            </div>
        </schoolInfoContext.Provider>
        
    );
};
export default School;