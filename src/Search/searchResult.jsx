import { IoIosCloseCircle } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../CommonComponents/Table/table";
        
const SearchResult = ({data, title,transitionProp, closeModal, perPage, counter, loader, findPerPage}) => {
   
    const nodeRef = useRef(null);
    /*const [loader, setLoader]=useState(false);*/
    const [selectedRow, setSelectedRow]=useState();
    const navigate = useNavigate();

   /* Methods:*/ 

    const openInNewTab=()=>{
        if(selectedRow){
            window.open(`/course/profile/${selectedRow.id}`, '_blank' );
            setSelectedRow('');
        }
    }

   useEffect(()=>{
       setTimeout(openInNewTab,0)
   },[selectedRow]);

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
                page={(data)=>counter(data)}
                perPage={(data)=>perPage(data)}
                selectedRow={(e)=>[setSelectedRow(e)]}
                setPaginator={true}
                pageFind={findPerPage}
                />
            </div>

        </CSSTransition>
    );
};
export default SearchResult;