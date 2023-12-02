import { useRef } from 'react';
import './success.css';
import '../transitions.css';
import { GoCheckCircle  } from 'react-icons/go';
import {CSSTransition} from 'react-transition-group';


const Success = ({success}) => {
    /*nodRef because of the ReactStrict*/
    const nodeRef = useRef(null);
    return (
        <CSSTransition nodeRef={nodeRef} in={success} classNames="success" timeout={500} mountOnEnter unmountOnExit>
            <div className="transition-container" ref={nodeRef}>
                <GoCheckCircle className='success'/>
            </div>
        </CSSTransition>
    );
};
export default Success;

/* 'in' control the enter-exit hooks */
/* 'classNames' : classname of the hooks */
/* 'mountOnEnter unmountOnExit' thease are magics whits are control the mounting of the success component*/