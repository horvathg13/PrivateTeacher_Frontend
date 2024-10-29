import { IoIosCloseCircle } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../CommonComponents/Table/table";
        
const SearchResult = ({data, title,transitionProp, closeModal}) => {
   
    const nodeRef = useRef(null);
    const [loader, setLoader]=useState(false);
    const [counter, setCounter]=useState(1);
    const [lastPage, setLastPage]=useState();
    const [perPage, setPerPage]=useState(5);
    const [selectedRow, setSelectedRow]=useState();
    const navigate = useNavigate();

   /* Methods:*/ 
   
    const pageCounter=(data)=>{
        switch (data){
            case 'next': return setCounter(counter+1);
            case 'prev': if(counter >1){return setCounter(counter-1)}else{return null};
            case 'last': return setCounter(lastPage);
            case 'first':return setCounter(1);
            default: return counter;
        }
    }

   useEffect(()=>{
       if(selectedRow){
           window.open(`/course/${selectedRow.id}`, '_blank' );
       }
   },[selectedRow])

    return (
        <CSSTransition 
        nodeRef={nodeRef} 
        in={transitionProp}
        classNames="fade" 
        timeout={500} 
        mountOnEnter 
        unmountOnExit>
            <div className="popupWhite" ref={nodeRef} >
                <div className="closeModal"><IoIosCloseCircle className='closeModalIcon' onClick={() => closeModal(true)} /></div>
                <div className="formTitle"><h2>{title ? title : ''}</h2></div>
                <Table
                datas={data ? data :null}
                loader={loader}
                page={(data)=>pageCounter(data)}
                perPage={(data)=>setPerPage(data)}
                selectedRow={(e)=>[setSelectedRow(e)]}
                />
            </div>

        </CSSTransition>
    );
};
export default SearchResult;