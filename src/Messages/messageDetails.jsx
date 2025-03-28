import React, {useContext, useEffect, useRef, useState} from 'react';
import {FaLocationArrow} from "react-icons/fa";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import EventHandler from "../EventHandler/eventhandler";
import {useTranslation} from "react-i18next";
import ServiceClient from "../ServiceClient";
import i18next from "i18next";

const MessageDetails = () => {
    /*Loader*/
    const messageLoader = useLoaderData();

    /*Data*/
    const [messageData, setMessageData] = useState([]);
    const [message, setMessage]=useState('');
    const {id}=useParams();
    const childId=messageLoader.data.map(e=>e.child_info.id);
    const teacherId=messageLoader.data.map(e=>e.course_info.teacher_id);
    const userId=messageLoader.userId;

    /*Navigation*/
    const navigate = useNavigate();

    /*Event handle*/
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState([]);

    /*Translation*/
    const {t} = useTranslation();

    /*Methods*/

    useEffect(() => {
        setMessageData(messageLoader)
    }, [messageLoader]);
    const sendMessage=(e)=>{
        e.preventDefault();
        if(message){
            setErrors([]);
            setServerError([]);
            ServiceClient.sendMessage(id,message, childId[0], teacherId[0]).then(()=>{
                ServiceClient.getMessageInfo(id,childId[0]).then((success)=>{
                    setMessageData(success)
                })
            }).catch(error=>{
                setErrors(error)
            })
            setMessage('');
        }
    }
    const messageEndRef=useRef(null);
    const scrollToBottom=()=>{
        messageEndRef.current?.scrollIntoView({behavior:"smooth"});
    }
    useEffect(()=>{
        scrollToBottom();
    },[messageData])
    return (
        <>
        <EventHandler
            success={success}
            errors={errors}
            serverError={serverError}
            closeErrorMessage={(data) => {
                if (data === true) {
                    setErrors([])
                }
            }}
        />
        <div className="messageDetails-main-container">
            <div className="message-header-container">
                <div className="message-title">
                    <h2>{messageData?.courseName}</h2>
                </div>
            </div>
            <div className="message-body">
                {messageData?.data?.map(e=>
                    <div className={e.sender_info.id === userId ? "message-content-container reverse" : "message-content-container"}>
                        <div className="avatar"><h4>{e.sender_info.first_name.slice(0,1)}</h4></div>
                        <div className="content">{e.message}</div>
                    </div>
                )}
                <div ref={messageEndRef}></div>
            </div>
            <div className="message-input">
                <input value={message} onKeyDown={(e)=>{if(e.key==='Enter'){
                    sendMessage(e);setMessage('')
                }}} onChange={(e)=>setMessage(e.target.value)}/>
                <div className="message-icon-container">
                    <FaLocationArrow  className={!message ? "message-icon-disabled":"message-icon"} onClick={(e)=>sendMessage(e)}/>
                </div>
            </div>

        </div>
        </>
    );
};

export default MessageDetails;