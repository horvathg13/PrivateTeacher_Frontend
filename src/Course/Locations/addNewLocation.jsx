import React, {useState} from 'react';
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import ServiceClient from "../../ServiceClient";
import EventHandler from "../../EventHandler/eventhandler";
import AreYouSure from "../../CommonComponents/AreYouSure/areyousure";
import {MdEdit} from "react-icons/md";
import {useTranslation} from "react-i18next";
import Select from "react-select";

const AddNewLocation = () => {

    const getCourses=useLoaderData();
    /*Translation*/
    const {t}=useTranslation("translation", {keyPrefix:'schools.school.location'});
    /*Data */
    const [name, setName]=useState();
    const [country, setCountry]=useState();
    const [zip , setZip]=useState();
    const [city, setCity]=useState();
    const [street, setStreet]=useState();
    const [number, setNumber]=useState();
    const [floor, setFloor]=useState();
    const [door, setDoor]=useState();
    const [selectedCourseId,setSelectedCourse]=useState();
    const [readOnly, setReadOnly]=useState(false);

    /*Event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Loader */
    const [loader, setLoader]=useState(false);

    /*Navigation */
    const navigation=useNavigate();

    /*Button Control */
    const [btndisabled, setBtnDisabled]=useState(false);

    /*Methods */

    const createLocation=(e)=>{
        e.preventDefault();
        setLoader(true);
        setBtnDisabled(true);
        setErrors([]);
        setServerError([]);

        ServiceClient.createLocation(name, country, city, zip, street, number, floor, door, null, selectedCourseId || null).then((success) => {
            setLoader(false);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 2000)
            setBtnDisabled(false);
        }).catch((error) => {
            setServerError(error);
            setLoader(false);
            setBtnDisabled(false);
        })

    }


    return (
        <>
            <EventHandler
                success={success}
                errors={errors}
                serverError={serverError}
                closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}
            />

            <div className="">
                <div className="title"><h2>{t('create.title')}</h2></div>
                <form onSubmit={(e)=>createLocation(e)} className="FlexForm">
                    <div className="form-items flex">
                        <div className="form-children">
                            <label>{t('info.form.locationName')}</label>
                            <input type="text"
                                   required
                                   onChange={(e) => {
                                       setName(e.target.value)
                                   }}
                                   value={name}
                                   readOnly={readOnly}/>
                        </div>

                        <div className="form-children">
                            <label>{t('info.form.country')}</label>
                            <input type="text"
                                   required
                                   onChange={(e) => {
                                       setCountry(e.target.value)
                                   }}
                                   value={country}
                                   readOnly={readOnly}/>
                        </div>


                        <div className="form-children">
                            <label>{t('info.form.zip')}</label>
                            <input type="text"
                                   required
                                   onChange={(e) => {
                                       setZip(e.target.value)
                                   }}
                                   value={zip}
                                   readOnly={readOnly}/>
                        </div>

                        <div className="form-children">
                            <label>{t('info.form.city')}</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => {
                                    setCity(e.target.value)
                                }}
                                value={city}
                                readOnly={readOnly}/>
                        </div>
                        <div className="form-children">
                            <label>{t('info.form.street')}</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => {
                                    setStreet(e.target.value)
                                }}
                                value={street}
                                readOnly={readOnly}/>
                        </div>
                        <div className="form-children">
                            <label>{t('info.form.number')}</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => {
                                    setNumber(e.target.value)
                                }}
                                value={number}
                                readOnly={readOnly}/>
                        </div>
                        <div className="form-children">
                            <label>{t('info.form.floor')}</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    setFloor(e.target.value)
                                }}
                                value={floor}
                                readOnly={readOnly}/>
                        </div>
                        <div className="form-children">
                            <label>{t('info.form.door')}</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    setDoor(e.target.value)
                                }}
                                value={door}
                                readOnly={readOnly}/>
                        </div>
                    </div>
                    <div className="form-button-container">
                        {!loader ?
                            <button
                                type='submit'
                                disabled={btndisabled}
                                className={readOnly ? 'formBtnDisabled' : 'btn formButton'}>
                                {t('info.buttons.create')}
                            </button> :
                            <span className='loader schoolDetails'></span>
                        }
                    </div>
                </form>

            </div>
        </>
    );
};

export default AddNewLocation;