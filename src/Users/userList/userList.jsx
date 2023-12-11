import './userList.css';
import EventHandler from '../../EventHandler/eventhandler';
import Table from '../../CommonComponents/Table/table';
import SideMenu from '../../CommonComponents/SideMenu/sidemenu';
import ComponentTitle from '../../CommonComponents/ComponentTitle/componentTitle';
import ServiceClient from '../../ServiceClient';
import { useEffect, useLayoutEffect, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import TabMenu from '../../CommonComponents/TabMenu/tabMenu';

        
const UserList = () => {
    const [users, setUsers]=useState({});
    const [loader, setLoader]=useState(false);
    const [counter, setCounter]=useState(1);
    const [lastPage, setLastPage]=useState();
    const [perPage, setPerPage]=useState(5);
    const [selectedRow, setSelectedRow]=useState();
    const navigate = useNavigate();
    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);
    /*TabData */
    const tabData=[
        {
            "id":"1",
            "name":"create",
            "url":"/user-create"
        }
    ]

 
   
    /*Methods: */
    const pageCounter=(data)=>{
        switch (data){
            case 'next': return setCounter(counter+1);
            case 'prev': if(counter >1){return setCounter(counter-1)}else{return null};
            case 'last': return setCounter(lastPage);
            case 'first':return setCounter(1);
            default: return counter;
        }
    }

    useLayoutEffect(()=>{
        setLoader(true);
       let url=`http://127.0.0.1:8000/api/getUsers?perPage=${perPage}&page=${counter}`;
       ServiceClient.post(url).then((response)=>{
        if(response.status===200){
            setLoader(false);
            setUsers(response.data);
            setLastPage(response.data.pagination.lastPageNumber)
            console.log(response.data)
        }
       }).catch((error)=>{
        setServerError(error);
        setLoader(false);
       })
    },[counter, perPage])

    useEffect(()=>{
        if(selectedRow){
            navigate(`/users/${selectedRow.id}`)
        }
        
    },[selectedRow])
    return (
        <div className="content-main-container">
           
            <EventHandler 
            success={success} 
            errors={errors} 
            serverError={serverError} 
            closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}/>
            
            <ClickAwayListener onClickAway={()=>setSelectedRow('')}>
                <div className="table-main-container">
                    <Table 
                    datas={users ? users :null}
                    loader={loader}
                    page={pageCounter}
                    perPage={setPerPage}
                    selectedRow={(e)=>[setSelectedRow(e)]}/>
                </div>
            </ClickAwayListener>
            
        </div>
            
        
    );
};
export default UserList;