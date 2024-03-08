import EventHandler from '../EventHandler/eventhandler';
import Table from '../CommonComponents/Table/table';
import SideMenu from '../CommonComponents/SideMenu/sidemenu';
import ComponentTitle from '../CommonComponents/ComponentTitle/componentTitle';
import ServiceClient from '../ServiceClient';
import { useEffect, useLayoutEffect, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { NavLink, Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import TabMenu from '../CommonComponents/TabMenu/tabMenu';
import { FaPlus } from 'react-icons/fa';

        
const ChildList = () => {

    /*Loader*/
    const dataLoader = useLoaderData();
    useEffect(()=>{
        if(dataLoader){
            setChild(dataLoader);
        }
    },[]);

    /*Datas */
    const [child, setChild]=useState();
    const [loader, setLoader]=useState(false);
    const [selectedRow, setSelectedRow]=useState();
    const navigate = useNavigate();

    /*Event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]); 
   
    /*Methods: */
    

    

    return (
        <div className="content-main-container">
           
            <EventHandler 
            success={success} 
            errors={errors} 
            serverError={serverError} 
            closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>

            <div className="title"><h2>My connections</h2></div>
            <div className="table-main-container">
                {!loader ? 
                <table>
                    <thead>
                        <tr>
                            {dataLoader.header ? dataLoader.header.map((e, i) => (

                                <th key={i}>{e}</th>
                                

                            )) : null}
                        </tr>

                    </thead>
                    <tbody>
                        { dataLoader.data?.map((e) => (
                            <tr key={e.id} onClick={() => {setSelectedRow(e);}}>
                            
                                <td>{e.firstname}</td>
                                <td>{e.lastname}</td>
                                <td>{e.birthday}</td>
                            </tr>

                        ))}
                        {dataLoader.data.length===0 ?
                        <tr>
                             <td colSpan={5} className="no-school" >No registered child to this user.</td>
                        </tr>:null}
                    </tbody>
                </table> : <span className='loader table'></span>}
                
            </div>
            
        </div>
        
    );
};
export default ChildList;