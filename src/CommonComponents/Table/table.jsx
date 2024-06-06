import '../common.css';
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { MdLastPage, MdFirstPage, MdNavigateNext, MdDelete, } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { useEffect, useState } from 'react';
import { FaCirclePlus } from 'react-icons/fa6';


const Table = ({datas, loader, page, perPage, selectedRow, selectableRow}) => {
    /* data: */

    const [sort, setSort]=useState(true);
    const [column, setColumn]=useState();
    const [activeRow, setActiveRow]=useState();
   
    /* methods:*/
    const handleSort=(e)=>{
        setColumn(e);
        setSort(!sort)
    }
    const rowClasses=(e)=>{
        let classes = [];

        if (activeRow === e) {
            classes.push('active');
        }
        if (selectableRow === "false") {
            classes.push('disableSelection');
        }

        return classes.join(' ');
    }
    
    useEffect(()=>{console.log(column)},[column])
    return (
        <>
        {!loader ?
        
        <div className="table-main-container">
            <div className="table-action-menu flex">
                {/*<div className="table-action"><MdDelete className='table-action-icon'/></div>
                <div className="table-action"><FaCirclePlus className='table-action-icon'/></div>*/}

            </div>
            <table>
                <thead>


                    <tr>
                        {datas.header ? Object.keys(datas.header).map((e, i) => (

                            <th key={i}>{e} {datas.header[e] === true ? 
                                <button onClick={()=>handleSort(e)} className='table-icon' > {column === e && sort  ? <FaSortAmountUp /> : <FaSortAmountDown />}</button>
                                : null}
                            </th>

                        )) : null}

                    </tr>


                </thead>
                <tbody>
                    { datas.data?.map((e) => (
                        <tr key={e.id} onClick={() => {if(selectableRow!=="false"){selectedRow(e);setActiveRow(e)}}} className={rowClasses(e)}>
                           { Object.values(e).map((j=>
                            <td>{j}</td>
                           ))}
                        </tr>
                    ))}

                </tbody>
            </table>

            <div className="pagination-continer flex">
                <div className="show-container flex">
                    Show/page<input type='number' onKeyDown={(e) => { if (e.key === 'Enter') { return perPage(e.target.value); } } } />

                </div>
                <div className="pagination flex">
                    <MdFirstPage className='paginate-icon' onClick={() => page('first')} />
                    <GrFormPrevious className='paginate-icon' onClick={() => page('prev')} /> 
                    {datas?.pagination?.currentPageNumber} / {datas?.pagination?.lastPageNumber}{datas?.pagination?.hasMorePages ? <><MdNavigateNext className='paginate-icon' onClick={() => page('next')} /><MdLastPage className='paginate-icon' onClick={() => page('last')} /></> : null}
                </div>
            </div>


        </div>: 
        <span className='loader table'></span>}
        </>
           
    );
};
export default Table;