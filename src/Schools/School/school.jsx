import { Outlet, useLoaderData, useParams } from 'react-router-dom';
import SideMenu from '../../CommonComponents/SideMenu/sidemenu';
import ComponentTitle from '../../CommonComponents/ComponentTitle/componentTitle';
import TabMenu from '../../CommonComponents/TabMenu/tabMenu';
import {TabMenuContext, schoolInfoContext, ComponentTitleContext} from '../../Context/UserContext';
import { useContext, useEffect, useLayoutEffect } from 'react';
        
const School = () => {
    let { schoolId }=useParams();
    const schoolData = useLoaderData();
    const {setMenuItems}=useContext(TabMenuContext);
    const {setTitle,setBreadcrumbs}=useContext(ComponentTitleContext);
    useEffect(()=>{
        setMenuItems([
            {
                "id":"1",
                "name":"Info",
                "url":`/school/${schoolId}`,
                "end":true,
            },
            {
                "id":"2",
                "name":"Years",
                "url":`/school/${schoolId}/school-year-list`
            },
            {
                "id":"3",
                "name":"Locations",
                "url":`/school/${schoolId}/locations`
            },
            {
                "id":"4",
                "name":"Teachers",
                "url":`/school/${schoolId}/teachers`
            }
            /*TODO: Global student search*/
            
        ]);
        setBreadcrumbs([
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
        ]);
        setTitle("School");
    },[])
    
    

    return (
        <schoolInfoContext.Provider value={schoolData}>
            <SideMenu/>    
            <div className="content-main-container">
                <ComponentTitle/>
                
                <div className="user-main">
                   
                    <TabMenu />
                    <Outlet/>
                </div>
            </div>
        </schoolInfoContext.Provider>
        
    );
};
export default School;