import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ServiceClient from "../../../ServiceClient";
import EventHandler from "../../../EventHandler/eventhandler";
import AreYouSure from "../../../CommonComponents/AreYouSure/areyousure";
import {MdEdit} from "react-icons/md";

const AddNewLocation = () => {
    /*Data */
    const {schoolId} =useParams();

    const [name, setName]=useState();
    const [country, setCountry]=useState();
    const [zip , setZip]=useState();
    const [city, setCity]=useState();
    const [street, setStreet]=useState();
    const [number, setNumber]=useState();
    const [floor, setFloor]=useState();
    const [door, setDoor]=useState();

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

        ServiceClient.createSchoolLocation(name, country, city, zip, street, number, floor, door, schoolId).then((success)=>{
            setLoader(false);
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            },2000)
            setBtnDisabled(false);
            navigation(`/school/${schoolId}/locations`);
        }).catch((error)=>{
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

            <div>

                <div className="title"><h2>Create Location</h2></div>
                <form onSubmit={(e)=>createLocation(e)} className="FlexForm">

                    <div className="form-items flex">

                        <div className="form-children">
                            <label>Name</label>
                            <input type="text"
                                   required
                                   onChange={(e) => {
                                       setName(e.target.value)
                                   }}
                                   value={name}
                                   readOnly={readOnly}/>
                        </div>

                        <div className="form-children">
                            <label>Country</label>
                            <input type="text"
                                   required
                                   onChange={(e) => {
                                       setCountry(e.target.value)
                                   }}
                                   value={country}
                                   readOnly={readOnly}/>
                        </div>


                        <div className="form-children">
                            <label>Zip</label>
                            <input type="text"
                                   required
                                   onChange={(e) => {
                                       setZip(e.target.value)
                                   }}
                                   value={zip}
                                   readOnly={readOnly}/>
                        </div>

                        <div className="form-children">
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
                        <div className="form-children">
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
                        <div className="form-children">
                            <label>Number</label>
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
                            <label>Floor</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => {
                                    setFloor(e.target.value)
                                }}
                                value={floor}
                                readOnly={readOnly}/>
                        </div>
                        <div className="form-children">
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
                    <div className="form-button-container">
                        {!loader ?
                            <button
                                type='submit'
                                disabled={btndisabled}
                                className={readOnly ? 'formBtnDisabled' : 'btn formButton'}>
                                Create
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