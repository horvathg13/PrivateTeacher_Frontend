import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ServiceClient from "../../../ServiceClient";
import EventHandler from "../../../EventHandler/eventhandler";
import AreYouSure from "../../../CommonComponents/AreYouSure/areyousure";
import {MdEdit} from "react-icons/md";

const AddNewLocation = () => {
    /*Data */
    const  schoolId =useParams();

    const [name, setName]=useState();
    const [country, setCountry]=useState();
    const [zip , setZip]=useState();
    const [city, setCity]=useState();
    const [street, setStreet]=useState();
    const [number, setNumber]=useState();
    const [floor, setFloor]=useState();
    const [door, setDoor]=useState();

    const [readOnly, setReadOnly]=useState(true);

    /*Event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Loader */
    const [loader, setLoader]=useState(true);

    /*Navigation */
    const navigation=useNavigate();

    /*Button Control */
    const [btndisabled, setBtnDisabled]=useState(true);

    /*Methods */

    const createLocation=(e)=>{

        e.preventDefault();
        setLoader(true);
        setBtnDisabled(true);

        let dataPost={};
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
                navigation(`/school/${schoolId}/locations`);
            }
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
            <AreYouSure
                name={AreYouSureName}
                answer={(name)=> functionControl(name)}
                transitionProp={areYouSureTransitionProp}/>

            <div className="content-main-container">

                <div className="title"><h2>Location Info <MdEdit className='icon formIcon' onClick={()=>[setReadOnly(!readOnly), setBtnDisabled(!btndisabled)]}/> </h2></div>
                <form onSubmit={(e)=>createLocation(e)} className="SchoolForm">

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
                                   value={Country}
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
                            Create
                        </button> :
                        <span className='loader schoolDetails'></span>
                    }

                </form>

            </div>
        </>
    );
};

export default AddNewLocation;