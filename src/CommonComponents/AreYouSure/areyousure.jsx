import { useRef } from 'react';
import './areyousure.css';
import { CSSTransition } from 'react-transition-group';
import '../../transitions.css'
        
const AreYouSure = ({label, name, answer, transitionProp}) => {
    const nodeRef=useRef(null)
    return (
        <CSSTransition nodeRef={nodeRef} in={transitionProp} classNames="fade" timeout={500} mountOnEnter unmountOnExit>
            <div className="are-you-sure-bcg" ref={nodeRef}>
                <div className="are-yousure-main">
                    <div className="title">
                        <h1>{label ? label : 'Are You Sure?'}</h1>
                    </div>
                    <div className="answers flex">
                        <button onClick={()=>{answer(name)}} >Yes</button>
                        <button onClick={()=>{answer('cancel')}} >No</button>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};
export default AreYouSure;