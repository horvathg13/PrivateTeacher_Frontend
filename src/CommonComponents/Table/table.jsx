import './table.css';
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { MdLastPage, MdFirstPage, MdNavigateNext, } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { useEffect, useState } from 'react';


const Table = ({datas, loader, page, perPage,selectedRow}) => {
    /* data: */

    const [active, setActive]=useState();
   
    /* methods:*/
    const setRowActive=(e)=>{
        if(e.id){
            return "active"
        }
    }
    
    useEffect(()=>{console.log(datas, loader)},[datas])
    return (
        <>
        {!loader ?
        <div className="table-main-container">
            
            
            <div className="table-action-menu flex">
                <button className='btn table-btn'><FaFilter className='table-menu-icon'/>Filter</button>
                <button className='btn table-btn'><FaFilter className='table-menu-icon'/>Filter</button>
                <button className='btn table-btn'><FaFilter className='table-menu-icon'/>Filter</button>
            </div>
            <table>
                <thead>
                    
                    
                    <tr> 
                        {
                        datas.header? Object.keys(datas.header).map((e,i)=>(
                           
                            <th key={i}>{e} {datas.header[e]===true ? <><FaSortAmountUp className='table-icon' /><FaSortAmountDown className='table-icon' /></>:null}</th>

                        )):null
                        }
                       
                    </tr>
                   
                    
                </thead>
                <tbody>
                    { datas.data?.map((e)=>(
                        <tr key={e.id} onClick={()=>[selectedRow(e), setRowActive(e)]} className={''}>
                            <td>{e.id}</td>
                            <td>{e.firstname}</td>
                            <td>{e.lastname}</td>
                            <td>{e.email}</td>
                            <td>{e.status}</td>
                        </tr>
                    ))
                    }
                    
                </tbody>
            </table>

            <div className="pagination-continer flex">
                <div className="show-container flex">
                    Show/page<input type='number' onKeyDown={(e)=>{if(e.key === 'Enter'){return perPage(e.target.value)}}}/>
                    
                </div>
                <div className="pagination flex">
                    <MdFirstPage className='table-icon' onClick={()=>page('first')} /><GrFormPrevious  className='table-icon' onClick={()=>page('prev')}/>{datas?.pagination?.currentPageNumber} / {datas?.pagination?.lastPageNumber}{datas?.pagination?.hasMorePages ? <><MdNavigateNext className='table-icon' onClick={()=>page('next')}/><MdLastPage className='table-icon' onClick={()=>page('last')}/></>:null}
                </div>
            </div> 

            
        </div>: <span className='loader'></span>}</>
           
    );
};
export default Table;