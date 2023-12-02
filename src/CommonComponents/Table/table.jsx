import './table.css';
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { MdLastPage, MdFirstPage, MdNavigateNext, } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { useEffect, useState } from 'react';
const Table = ({datas, loader}) => {
    /* data: */
    const [selectedRow, setSelectedRow]=useState();

    /* methods:*/
    
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
                    { datas.data?.map((e,i)=>(
                        <tr key={i}>
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
                    Show/page<input type='number'/>
                </div>
                <div className="pagination flex">
                    <MdFirstPage className='table-icon' /><GrFormPrevious  className='table-icon'/>20 / 1500<MdNavigateNext className='table-icon'/><MdLastPage className='table-icon'/>
                </div>
            </div> 

            
        </div>: <span className='loader'></span>}</>
           
    );
};
export default Table;