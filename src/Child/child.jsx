import { Outlet, useLoaderData, useParams } from "react-router-dom";
import ComponentTitle from "../CommonComponents/ComponentTitle/componentTitle";
import SideMenu from "../CommonComponents/SideMenu/sidemenu";
import TabMenu from "../CommonComponents/TabMenu/tabMenu";
import {ComponentTitleContext, TabMenuContext, userInfoContext} from "../Context/UserContext";
import { useContext, useEffect } from "react";
        
const Child = () => {
    //let { userId }=useParams();
    //const userData = useLoaderData();

    /*TabMenu*/
    const {setMenuItems}=useContext(TabMenuContext);
    const {setTitle, setBreadcrumbs}=useContext(ComponentTitleContext);
    useEffect(()=>{
        setMenuItems([
            {
                "id":"1",
                "name":"List",
                "url":"/child",
                "end":true,
            },
            {
                "id":"2",
                "name":"Create",
                "url":"/child/create"
            },
            {
                "id":"3",
                "name":"Connect",
                "url":"/child/connect"
            },
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
                "name":"Child",
                "url":"/child",
                "icon":"IoIosArrowForward",
                "end":true,
            },
        ]);
        setTitle("Child");
    },[])
    
    

    
    return (
        <>
        <SideMenu /><div className="content-main-container">
            <ComponentTitle/>

            <div className="user-main">

                <TabMenu />
                <Outlet />
            </div>
        </div>
        </>
        
    );
};
export default Child;