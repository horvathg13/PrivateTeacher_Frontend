import React, {useLayoutEffect, useState} from 'react';
import {Outlet, useLoaderData, useNavigate, useParams} from "react-router-dom";
import ServiceClient from "../../../ServiceClient";
import EventHandler from "../../../EventHandler/eventhandler";
import AreYouSure from "../../../CommonComponents/AreYouSure/areyousure";
import {MdEdit} from "react-icons/md";
import {GrUpdate} from "react-icons/gr";
import {FaTrashAlt} from "react-icons/fa";

const Location = () => {
    /*Data */
    const { schoolId, locationId }=useParams();
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
        ServiceClient.getSchoolLocation(schoolId, locationId).then((data)=>{
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

        ServiceClient.createSchoolLocation(name,country,city,zip,street,number,floor,door,schoolId,locationId).then((success)=>{
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
        let dataPost={};
        dataPost.schoolId=schoolId;
        dataPost.locationId=locationId;

        ServiceClient.removeSchoolLocation(schoolId, locationId).then((success)=>{
            setDeleteLoader(false);
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            },2000)

            navigation(`/school/${schoolId}/locations`);
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

            <div className="content-main-container">

                <div className="title"><h2>Location Info <MdEdit className='icon formIcon' onClick={()=>[setReadOnly(!readOnly), setBtnDisabled(!btndisabled)]}/> </h2></div>
                <form onSubmit={(e)=>updateLocationInfo(e)} className="SchoolForm">

                    <div className="school-form flex">

                        <div className="flex">
                            <label>Name</label>
                            <input type="text"
                                   required
                                   onChange={(e) => {
                                       setName(e.target.value)
                                   }}
                                   value={name}
                                   readOnly={readOnly}/>
                        </div>

                        <div className="flex">
                            <label>Country</label>
                            <input type="text"
                                   required
                                   onChange={(e) => {
                                       setCountry(e.target.value)
                                   }}
                                   value={country}
                                   readOnly={readOnly}/>
                        </div>


                        <div className="flex">
                            <label>Zip</label>
                            <input type="text"
                                   required
                                   onChange={(e) => {
                                       setZip(e.target.value)
                                   }}
                                   value={zip}
                                   readOnly={readOnly}/>
                        </div>

                        <div className="flex">
                            <label>City</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => {
                                    setCity(e.target.value)
                                }}
                                value={city}
                                readOnly={readOnly}/>
                        </div>
                        <div className="flex">
                            <label>Street</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => {
                                    setStreet(e.target.value)
                                }}
                                value={street}
                                readOnly={readOnly}/>
                        </div>
                        <div className="flex">
                            <label>Floor</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => {
                                    setFloor(e.target.value)
                                }}
                                value={street}
                                readOnly={readOnly}/>
                        </div>
                        <div className="flex">
                            <label>Door</label>
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

                    {!loader ?
                        <button
                            type='submit'
                            disabled={btndisabled}
                            className={readOnly ? 'formBtnDisabled' : 'btn formButton'}>
                            <GrUpdate className='btn-icon'/> Update
                        </button> :
                        <span className='loader schoolDetails'></span>
                    }
                    {!deleteLoader ?
                        <button
                            type="button"
                            disabled={btndisabled}
                            className={readOnly ? 'formBtnDisabled':'btn formButton' }
                            onClick={()=>{setAreYouSureName("delete"); setAreYouSureTransitionProp(true)}}>
                            <FaTrashAlt   className='btn-icon'/> Delete
                        </button>:
                        <span className='loader schoolDetails'></span>
                    }
                </form>

            </div>
        </>
    );
};

export default Location;