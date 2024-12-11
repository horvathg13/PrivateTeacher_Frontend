import { useRef } from 'react';
import '../common.css';
import { CSSTransition } from 'react-transition-group';
import '../../transitions.css'
import {useTranslation} from "react-i18next";
        
const AreYouSure = ({label, name, answer, transitionProp}) => {
    const nodeRef=useRef(null)
    const {t}=useTranslation();
    return (
        <CSSTransition nodeRef={nodeRef} in={transitionProp} classNames="fade" timeout={500} mountOnEnter unmountOnExit>
            <div className="are-you-sure-bcg" ref={nodeRef}>
                <div className="are-yousure-main">
                    <div className="title">
                        <h3>{label ? label : t('areYouSure.title')}</h3>
                    </div>
                    <div className="answers flex">
                        <button onClick={()=>{answer(name)}} >{t('areYouSure.yes')}</button>
                        <button onClick={()=>{answer('cancel')}} >{t('areYouSure.no')}</button>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};
export default AreYouSure;