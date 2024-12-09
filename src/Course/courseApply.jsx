import React, {useState} from 'react';
import EventHandler from "../EventHandler/eventhandler";
import {MdEdit} from "react-icons/md";
import {useTranslation} from "react-i18next";
import Select from "react-select";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import {GrUpdate} from "react-icons/gr";
import {FaArrowCircleRight} from "react-icons/fa";
import ServiceClient from "../ServiceClient";

const CourseApply = () => {
    /*Translate*/
    const {t}=useTranslation("translation", {keyPrefix:"courseApply"})

    /*Data*/
    const children=useLoaderData();
    const [selectedChild, setSelectedChild]=useState("");
    const [numberOfLesson, setNumberOfLesson]=useState();
    const [notice, setNotice]=useState();
    const {courseId}=useParams()

    /*Loader */
    const [loader, setLoader]=useState(false);
    const [formLoader, setFormLoader]=useState(false);
    const [deleteLoader, setDeleteLoader]=useState(false);
    const [readOnly, setReadOnly]=useState(false);

    /*Navigation */
    const navigation=useNavigate();

    /*button control */
    const [btndisabled, setBtnDisabled]=useState(false);

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Methods*/
    const sendApply=(e)=>{
        e.preventDefault();
        setReadOnly(true);
        setBtnDisabled(true);
        setErrors([]);
        setServerError([]);

        if(selectedChild.value){
            ServiceClient.sendCourseRequest(selectedChild.value, courseId, numberOfLesson, notice).then((success)=>{
                setReadOnly(false);
                setBtnDisabled(false);

                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                },2000)

                setSelectedChild('');
                setNumberOfLesson('');
                setNotice('');

            }).catch((error)=>{
                setServerError(error);

                setReadOnly(false);
                setBtnDisabled(false);

                setSelectedChild('');
                setNumberOfLesson('');
                setNotice('');
            });
        }else {
            setBtnDisabled(false);
            setReadOnly(false);

            setSelectedChild('');
            setNumberOfLesson('');
            setNotice('');
        }
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
            <div className="title">
                <h2>{t('title.main')}</h2>
            </div>
            <form className="FlexForm">
                <div className="form-items">
                    <div className="form-children">
                        <label>{t('form.child')}</label>
                        <Select
                            value={selectedChild || null}
                            options={children}
                            onChange={(selected) => {
                                setSelectedChild(selected);
                                console.log(selectedChild)
                            }}
                            isDisabled={readOnly}
                            isSearchable={true}
                            className="select-componentFull"
                        />
                    </div>
                    <div className="form-children">
                        <label>{t('form.number-of-lesson')}</label>
                        <input
                            type="number"
                            value={numberOfLesson}
                            required
                            onChange={(e)=>setNumberOfLesson(e.target.value)}
                        />
                    </div>
                    <div className="form-children">
                        <label>{t('form.notice')}</label>
                        <textarea
                            value={notice}
                            onChange={(e)=>setNotice(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-button-container">
                    {!loader ?
                        <button
                            type='submit'
                            disabled={btndisabled}
                            onClick={(e)=>sendApply(e)}
                            className={readOnly ? 'formBtnDisabled' : 'btn formButton'}>
                            {t('button.apply')} <FaArrowCircleRight  className='btn-icon'/>
                        </button> :
                        <span className='loader schoolDetails'></span>
                    }
                </div>

            </form>

        </>
    );
};

export default CourseApply;