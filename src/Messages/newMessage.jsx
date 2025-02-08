import React, {useContext, useEffect, useRef, useState} from 'react';
import {FaLocationArrow} from "react-icons/fa";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import EventHandler from "../EventHandler/eventhandler";
import {useTranslation} from "react-i18next";
import ServiceClient from "../ServiceClient";
import {isInt} from "@fullcalendar/core/internal";
import {UserContext} from "../Context/UserContext";
import Select from "react-select";
import i18next from "i18next";
import i18n from "i18next";

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
        if(childId && requestId){
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

        if(message){
            setErrors([]);
            setServerError([]);

            Promise.all([
                ServiceClient.sendMessage(requestId,message, childId, teacherId),
                ServiceClient.getMessageInfo(requestId).then((success)=>{
                    setMessageData(success)
                })
            ]).catch(error=>{
                setServerError(error)
            });
            setMessage('');
        }
    }
    if(!childLoader.select.length){
        return(
            <>
                <h3>{t('message.no-child')}</h3>
            </>
        )
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
                {childLoader.select ?
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
                    </div>:null}
                {childId && requests ?
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
                    </div>:null
                }
            </div>
            <div className="messageDetails-main-container">
                <div className="message-header-container">
                    <div className="message-title">
                        {messageData?.courseName?.length>0 ?
                            messageData.courseName.filter(e=>e.lang === i18next.language).map(j=>
                                <h2>{j.name}</h2>
                            )
                            :messageData.courseName?.map(e=>
                                <h2>{e.name}</h2>
                            )
                        }
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
                        <FaLocationArrow  className={!message ? "message-icon-disabled":"message-icon"} onClick={(e)=>{sendMessage(e)}}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewMessage;