import React, {useState} from 'react';
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import ServiceClient from "../../ServiceClient";
import EventHandler from "../../EventHandler/eventhandler";
import AreYouSure from "../../CommonComponents/AreYouSure/areyousure";
import {MdAddLocation, MdEdit, MdOutlineAddLocationAlt, MdOutlineLocationOn} from "react-icons/md";
import {useTranslation} from "react-i18next";
import Select from "react-select";
import {GrMapLocation} from "react-icons/gr";
import {TfiLocationPin} from "react-icons/tfi";
import {CiLocationOn} from "react-icons/ci";

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

            <div className="component-container">
                <div className="location-form-container">
                    <div className="location-icon-container"><CiLocationOn  className="location-icon"/></div>
                    <form onSubmit={(e) => createLocation(e)} className="FlexForm">
                        {true &&<div className="title"><h2>{t('create.title')}</h2></div>}
                        <div className="form-items flex">
                            <div className="form-children flexColumnItems">
                                <label>{t('info.form.locationName')}</label>
                                <input type="text"
                                       required
                                       onChange={(e) => {
                                           setName(e.target.value)
                                       }}
                                       value={name}
                                       readOnly={readOnly}
                                       className="fullSize"
                                />
                            </div>
                            <div className="form-children form-collapse">
                                <div className="form-children flexColumnItems">
                                    <label>{t('info.form.country')}</label>
                                    <input type="text"
                                           required
                                           onChange={(e) => {
                                               setCountry(e.target.value)
                                           }}
                                           value={country}
                                           readOnly={readOnly}
                                           className="fullSize"
                                    />
                                </div>
                                <div className="form-children flexColumnItems">
                                    <label>{t('info.form.zip')}</label>
                                    <input type="text"
                                           required
                                           onChange={(e) => {
                                               setZip(e.target.value)
                                           }}
                                           value={zip}
                                           readOnly={readOnly}
                                           className="fullSize"
                                    />
                                </div>

                                <div className="form-children flexColumnItems">
                                    <label>{t('info.form.city')}</label>
                                    <input
                                        type="text"
                                        required
                                        onChange={(e) => {
                                            setCity(e.target.value)
                                        }}
                                        value={city}
                                        readOnly={readOnly}
                                        className="fullSize"
                                    />
                                </div>
                            </div>
                            <div className="form-children form-collapse">
                                <div className="form-children flexColumnItems">
                                    <label>{t('info.form.street')}</label>
                                    <input
                                        type="text"
                                        required
                                        onChange={(e) => {
                                            setStreet(e.target.value)
                                        }}
                                        value={street}
                                        readOnly={readOnly}
                                        className="fullSize"
                                    />
                                </div>
                                <div className="form-children flexColumnItems">
                                    <label>{t('info.form.number')}</label>
                                    <input
                                        type="text"
                                        required
                                        onChange={(e) => {
                                            setNumber(e.target.value)
                                        }}
                                        value={number}
                                        readOnly={readOnly}
                                        className="fullSize"
                                    />
                                </div>
                                <div className="form-children flexColumnItems">
                                    <label>{t('info.form.floor')}</label>
                                    <input
                                        type="text"
                                        onChange={(e) => {
                                            setFloor(e.target.value)
                                        }}
                                        value={floor}
                                        readOnly={readOnly}
                                        className="fullSize"
                                    />
                                </div>
                                <div className="form-children flexColumnItems">
                                    <label>{t('info.form.door')}</label>
                                    <input
                                        type="text"
                                        onChange={(e) => {
                                            setDoor(e.target.value)
                                        }}
                                        value={door}
                                        readOnly={readOnly}
                                        className="fullSize"
                                    />
                                </div>
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
            </div>
        </>
    );
};

export default AddNewLocation;