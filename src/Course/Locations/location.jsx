import React, {useLayoutEffect, useState} from 'react';
import {Outlet, useLoaderData, useNavigate, useParams} from "react-router-dom";
import ServiceClient from "../../ServiceClient";
import EventHandler from "../../EventHandler/eventhandler";
import AreYouSure from "../../CommonComponents/AreYouSure/areyousure";
import {MdEdit} from "react-icons/md";
import {GrUpdate} from "react-icons/gr";
import {FaTrashAlt} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import Select from "react-select";

const Location = () => {
    /*Translation*/
    const {t}=useTranslation('translation',{keyPrefix:'schools.school.location.info'});
    /*Data */
    const { locationId }=useParams();
    const schoolLocation=useLoaderData();

    const [name, setName]=useState(schoolLocation?.name);
    const [country, setCountry]=useState(schoolLocation?.country);
    const [zip , setZip]=useState(schoolLocation?.zip);
    const [city, setCity]=useState(schoolLocation?.city);
    const [street, setStreet]=useState(schoolLocation?.street);
    const [number, setNumber]=useState(schoolLocation?.number);
    const [floor, setFloor]=useState(schoolLocation?.floor);
    const [door, setDoor]=useState(schoolLocation?.door);

    const [readOnly, setReadOnly]=useState(true);
    const [selectedRow, setSelectedRow]=useState();
    const [alias, setAlias]=useState();

    /*Popup control */
    const [AreYouSureName, setAreYouSureName]=useState('');
    const [areYouSureTransitionProp, setAreYouSureTransitionProp]=useState(false);

    /*Event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Loader */
    const [loader, setLoader]=useState(false);
    const [deleteLoader, setDeleteLoader]=useState(false);

    /*Navigation */
    const navigation=useNavigate();

    /*Button Control */
    const [btndisabled, setBtnDisabled]=useState(true);

    /*Methods */
    const functionControl=(name)=>{

        if(name === 'delete'){
            removeLocation();
            setAreYouSureTransitionProp(false);
        }

        setAreYouSureTransitionProp(false);
    }

    const getLocations=()=>{
        setLoader(true);
        ServiceClient.getCourseLocation(locationId).then((data)=>{
            setName(data.name);
            setCountry(data.country);
            setZip(data.zip);
            setCity(data.city);
            setStreet(data.street);
            setNumber(data.number);
            setFloor(data.floor);
            setDoor(data.door);

            setLoader(false);
            setDeleteLoader(false);
        }).catch((error)=>{
            setServerError(error);
            setLoader(false);
        })
    }
    const updateLocationInfo=(e)=>{

        e.preventDefault();
        setLoader(true);
        setBtnDisabled(true);
        setErrors([]);
        setServerError([]);

        ServiceClient.createLocation(name,country,city,zip,street,number,floor,door,locationId).then((success)=>{
            setLoader(false);
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            },2000)
            setBtnDisabled(false);
            getLocations();
        }).catch((error)=>{
            setServerError(error);
            setLoader(false);
            setBtnDisabled(false);
        })
    }

    const removeLocation=()=>{
        setDeleteLoader(true);
        setErrors([]);
        setServerError([]);

        ServiceClient.removeSchoolLocation(locationId).then((success)=>{
            setDeleteLoader(false);
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            },2000)
        }).catch((error)=>{
            setServerError(error);
            setDeleteLoader(false);
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
            <AreYouSure
                name={AreYouSureName}
                answer={(name)=> functionControl(name)}
                transitionProp={areYouSureTransitionProp}/>

            <div>
                <div className="title"><h2>{t('titles.main')}<MdEdit className='icon formIcon' onClick={()=>[setReadOnly(!readOnly), setBtnDisabled(!btndisabled)]}/> </h2></div>
                <form onSubmit={(e)=>updateLocationInfo(e)} className="FlexForm">

                    <div className="form-items flex">

                        <div className="form-children">
                            <label>{t('form.locationName')}</label>
                            <input type="text"
                                   required
                                   onChange={(e) => {
                                       setName(e.target.value)
                                   }}
                                   value={name}
                                   readOnly={readOnly}/>
                        </div>

                        <div className="form-children">
                            <label>{t('form.country')}</label>
                            <input type="text"
                                   required
                                   onChange={(e) => {
                                       setCountry(e.target.value)
                                   }}
                                   value={country}
                                   readOnly={readOnly}/>
                        </div>


                        <div className="form-children">
                            <label>{t('form.zip')}</label>
                            <input type="text"
                                   required
                                   onChange={(e) => {
                                       setZip(e.target.value)
                                   }}
                                   value={zip}
                                   readOnly={readOnly}/>
                        </div>

                        <div className="form-children">
                            <label>{t('form.city')}</label>
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
                            <label>{t('form.street')}</label>
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
                            <label>{t('form.number')}</label>
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
                            <label>{t('form.floor')}</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => {
                                    setFloor(e.target.value)
                                }}
                                value={street}
                                readOnly={readOnly}/>
                        </div>
                        <div className="form-children">
                            <label>{t('form.door')}</label>
                            <input
                                type="text"
                                required
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
                                <GrUpdate className='btn-icon'/> {t('buttons.update')}
                            </button> :
                            <span className='loader schoolDetails'></span>
                    }
                    {!deleteLoader ?
                        <button
                            type="button"
                            disabled={btndisabled}
                            className={readOnly ? 'formBtnDisabled':'btn formButton' }
                            onClick={()=>{setAreYouSureName("delete"); setAreYouSureTransitionProp(true)}}>
                            <FaTrashAlt   className='btn-icon'/> {t('buttons.delete')}
                        </button>:
                        <span className='loader schoolDetails'></span>
                    }
                    </div>
                </form>

            </div>
        </>
    );
};

export default Location;