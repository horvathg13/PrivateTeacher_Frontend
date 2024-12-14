import React, {useContext, useEffect, useRef, useState} from 'react';
import {FaLocationArrow} from "react-icons/fa";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import EventHandler from "../EventHandler/eventhandler";
import {useTranslation} from "react-i18next";
import ServiceClient from "../ServiceClient";
import {isInt} from "@fullcalendar/core/internal";
import {UserContext} from "../Context/UserContext";
import Select from "react-select";

const NewMessage = () => {
    /*Loader*/
    const childLoader = useLoaderData();

    /*Data*/
    const [messageData, setMessageData] = useState([]);
    const [message, setMessage]=useState('');
    const [childId, setChildId]=useState(null);
    const [requestId, setRequestId]=useState();
    const [requests, setRequests]=useState();
    const [teacherId, setTeacherId]=useState();

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
        if(childId !== null){
            ServiceClient.getChildRequests(childId).then((success)=>{
                setRequests(success);
            })
        }

    }, [childId]);

    useEffect(() => {
        if(childId !== null && requestId !== null){
            ServiceClient.getMessageControl(childId, requestId).then((success)=>{
                setMessageData(success);
                setTeacherId(success.data? success.data[0].course_info.teacher_id : success.teacher_id);
            })
        }
    }, [requestId]);

    const messageEndRef=useRef(null);
    const scrollToBottom=()=>{
        messageEndRef.current?.scrollIntoView({behavior:"smooth"});
    }
    useEffect(()=>{
        scrollToBottom();
    },[messageData])
    const sendMessage=(e)=>{
        e.preventDefault();

        setErrors([]);
        setServerError([]);

        Promise.all([
            ServiceClient.sendMessage(requestId,message, childId, teacherId).catch(error=>setServerError(error)),

            !serverError.length && !errors.length ?
            ServiceClient.getMessageInfo(requestId).then((success)=>{
                setMessageData(success)
            }).catch(error=>setServerError(error)):null

        ]).catch(error=>{
            setErrors(error)
        });
        setMessage('');

    }
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
            <div className="addressee-selector-container">
                <div className="adressee-child">
                    <label>{t('message.child')}</label>
                    <Select
                        placeholder={t('select')}
                        options={childLoader.select || null}
                        onChange={(selected) => {
                            setChildId(selected.value)
                        }}
                        isSearchable={true}
                        className="select-componentFull"
                    />
                </div>
                {childId ?
                    <div className="addressee-child">
                        <label>{t('message.request')}</label>
                        <Select
                            placeholder={t('select')}
                            options={requests || null}
                            onChange={(selected) => {
                                setRequestId(selected.value)
                            }}
                            isSearchable={true}
                            className="select-componentFull"
                        />
                    </div>
                : null}

            </div>
            <div className="messageDetails-main-container">
                <div className="message-header-container">
                    <div className="message-title">
                        <h2>{messageData.courseName}</h2>
                    </div>
                </div>
                <div className="message-body">
                    {messageData?.data?.map(e =>
                        <div
                            className={e.sender_info.id === null ? "message-content-container reverse" : "message-content-container"}>
                            <div className="avatar"><h4>{e.sender_info.first_name.slice(0, 1)}</h4></div>
                            <div className="content">{e.message}</div>
                        </div>
                    )}
                    <div ref={messageEndRef}></div>
                </div>
                <div className="message-input">
                    <input value={message} onKeyDown={(e)=>{if(e.key==='Enter'){
                       sendMessage(e); setMessage('')
                    }}} onChange={(e)=>setMessage(e.target.value)}/>
                    <div className="message-icon-container">
                        <FaLocationArrow  className="message-icon" onClick={(e)=>sendMessage(e)}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewMessage;