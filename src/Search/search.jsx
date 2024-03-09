import { Outlet, useLoaderData, useParams } from "react-router-dom";
import ComponentTitle from "../CommonComponents/ComponentTitle/componentTitle";
import SideMenu from "../CommonComponents/SideMenu/sidemenu";
import TabMenu from "../CommonComponents/TabMenu/tabMenu";
import {TabMenuContext, userInfoContext} from "../Context/UserContext";
import { useContext, useEffect } from "react";
        
const Search = () => {
    

    /*TabMenu*/
    const {setMenuItems}=useContext(TabMenuContext);
    useEffect(()=>{
        setMenuItems([
            {
                "id":"1",
                "name":"Teacher",
                "url":`/search`,
                "end":true,
            },
            {
                "id":"2",
                "name":"School",
                "url":`/search/school`
            },
            {
                "id":"3",
                "name":"Course",
                "url":`/search/course`
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
            "name":"Users",
            "url":"/users",
            "icon":"IoIosArrowForward",
            "end":true,
        },
        
    ]
    
    return (

        <>
        <SideMenu />
        <div className="content-main-container">
            <ComponentTitle
                title={"Search"}
                breadcrumbs={breadcrumbs} />

            <div className="user-main">

                <TabMenu />
                <Outlet />
            </div>
        </div>
        </>
    );
};
export default Search;