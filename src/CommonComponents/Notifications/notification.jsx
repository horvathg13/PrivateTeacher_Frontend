import React, {useRef} from 'react';
import {CSSTransition} from "react-transition-group";
import {GoCheckCircle} from "react-icons/go";
import {MdNotificationsActive} from "react-icons/md";
import '../../transitions.css';
import "../common.css";
import {IoMdClose, IoMdCloseCircle} from "react-icons/io";
const Notification = ({active}) => {
    const nodeRef = useRef(null);
    return (
        <CSSTransition nodeRef={nodeRef} in={active} classNames="slide-right" timeout={500} mountOnEnter unmountOnExit>
            <div className="notification-transition-container" ref={nodeRef}>
                <div className="close-notification"><IoMdCloseCircle  className="close-icon"/></div>
                <div className="notification-container">
                    <div className="notification-icon-container">
                        <MdNotificationsActive  className='notification'/>
                    </div>
                    <div className="notification-message-container">
                        <h4>A 12es számú kérelem ügyében új státusz lett beállítva.</h4>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default Notification;