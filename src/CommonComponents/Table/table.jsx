import '../common.css';
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { MdLastPage, MdFirstPage, MdNavigateNext, MdDelete, } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { useEffect, useState } from 'react';
import { FaCirclePlus } from 'react-icons/fa6';
import {useTranslation} from "react-i18next";
import i18next from "i18next";


const Table = ({datas, loader, page, perPage, selectedRow, selectableRow, setPaginator}) => {

    /*Translate*/
    const {t}=useTranslation()
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

    if(datas !== null) {
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

                                    <th key={i}>{t(`tableHeaders.${e}`)} {datas.header[e] === true ?
                                        <button onClick={() => handleSort(e)}
                                                className='table-icon'> {column === e && sort ? <FaSortAmountUp/> :
                                            <FaSortAmountDown/>}</button>
                                        : null}
                                    </th>

                                )) : null}

                            </tr>


                            </thead>
                            <tbody>
                            {datas.data?.map((e) => (
                                <tr key={e.id} onClick={() => {
                                    if (selectableRow !== "false") {
                                        selectedRow(e);
                                        setActiveRow(e)
                                    }
                                }} className={rowClasses(e)}>
                                    {
                                        Object.entries(e).map(([key, value]) => (
                                            key === 'status' ? (
                                                <td>{t(`enums.${value}`)}</td>
                                            ) : key === 'name' ? (
                                                (e.name.filter(n => n.lang === i18next.language).length > 0
                                                    ?  <td>{e.name.filter(n => n.lang === i18next.language).map(j=>j.name)}</td>
                                                    :  <td>{e.name.map(j=>j.name)}</td>
                                            )) : key === 'course_name' ? (
                                                (e.course_name.filter(n => n.lang === i18next.language).length > 0
                                                    ?  <td>{e.course_name.filter(n => n.lang === i18next.language).map(j=>j.name)}</td>
                                                    :  <td>{e.course_name.map(j=>j.name)}</td>
                                            )) : (
                                                <td>{value}</td>
                                            )
                                        ))
                                    }
                                </tr>
                            ))}

                            </tbody>
                        </table>
                        {setPaginator ?
                            <div className="pagination-continer flex">
                                <div className="show-container flex">
                                    {t('commonComponents.table.counter')}<input type='number' defaultValue={10} onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        return perPage(e.target.value);
                                    }
                                }}/>

                                </div>
                                <div className="pagination flex">
                                    <MdFirstPage className='paginate-icon' onClick={() => page('first')}/>
                                    <GrFormPrevious className='paginate-icon' onClick={() => page('prev')}/>
                                    {datas?.pagination?.currentPageNumber} / {datas?.pagination?.lastPageNumber}{datas?.pagination?.hasMorePages ? <>
                                    <MdNavigateNext className='paginate-icon' onClick={() => page('next')}/><MdLastPage
                                    className='paginate-icon' onClick={() => page('last')}/></> : null}
                                </div>
                            </div> : null}


                    </div> :
                    <span className='loader table'></span>}
                {datas === null ?
                    <h3>{t('empty-table')}</h3>
                    : null}
            </>

        );
    }else{
        return (
            <div className="table-main-container">
                <h3>{t('empty-table')}</h3>
            </div>
        )
    }
};
export default Table;