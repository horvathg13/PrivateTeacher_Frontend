import React, {useLayoutEffect, useState} from 'react';
import {Outlet, useNavigate, useParams} from "react-router-dom";
import ServiceClient from "../../../ServiceClient";
import EventHandler from "../../../EventHandler/eventhandler";
import AreYouSure from "../../../CommonComponents/AreYouSure/areyousure";
import {MdEdit} from "react-icons/md";
import {GrUpdate} from "react-icons/gr";
import {FaTrashAlt} from "react-icons/fa";

const Location = () => {
    /*Data */
    const { schoolId, locationId }=useParams();

    const [name, setName]=useState();
    const [country, setCountry]=useState();
    const [zip , setZip]=useState();
    const [selectedRow, setSelectedRow]=useState();
    const [alias, setAlias]=useState();
    const [city, setCity]=useState();
    const [street, setStreet]=useState();
    const [number, setNumber]=useState();
    const [floor, setFloor]=useState();
    const [door, setDoor]=useState();

    const [readOnly, setReadOnly]=useState(true);


    /*Popup control */
    const [AreYouSureName, setAreYouSureName]=useState('');
    const [areYouSureTransitionProp, setAreYouSureTransitionProp]=useState(false);

    /*Event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Loader */
    const [loader, setLoader]=useState(true);
    const [deleteLoader, setDeleteLoader]=useState(true);

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
        let url=`http://127.0.0.1:8000/api/school/${schoolId}/location/${locationId}`
        ServiceClient.get(url).then((response)=>{
            if(response.status===200){
                setName(response.data.name);
                setCountry(response.data.country);
                setZip(response.data.zip);
                setCity(response.data.city);
                setStreet(response.data.street);
                setNumber(response.data.number);
                setFloor(response.data.floor);
                setDoor(response.data.door);

                setLoader(false);
                setDeleteLoader(false);
            }
        }).catch((error)=>{
            setServerError(error);
            //setLoader(false);
        })
    }
    const updateLocationInfo=(e)=>{

        e.preventDefault();
        setLoader(true);
        setBtnDisabled(true);

        let dataPost={};
        dataPost.id=locationId;
        dataPost.name=name;
        dataPost.country=country;
        dataPost.zip=zip;
        dataPost.city=city;
        dataPost.street=street;
        dataPost.number=number;
        dataPost.floor=floor;
        dataPost.door=door;

        let url="http://127.0.0.1:8000/api/createLocation";
        ServiceClient.post(url, dataPost).then((response)=>{
            if(response.status===200){
                setLoader(false);
                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                },2000)
                setBtnDisabled(false);
                getLocations();
            }
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

        let url="http://127.0.0.1:8000/api/removeLocation";

        ServiceClient.post(url, dataPost).then((response)=>{
            if(response.status===200){
                setDeleteLoader(false);
                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                },2000)

                navigation(`/school/${schoolId}/locations`);
            }
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