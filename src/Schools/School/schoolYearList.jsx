import { MdDelete, MdEdit } from "react-icons/md";
import "../../CommonComponents/Table/table.css"
import { FaCirclePlus } from "react-icons/fa6";
import Table from "../../CommonComponents/Table/table";
import { Outlet, useLoaderData, useNavigate, useParams } from "react-router-dom";
import SideMenu from "../../CommonComponents/SideMenu/sidemenu";
import {useContext, useEffect, useLayoutEffect, useState} from "react";
import EventHandler from "../../EventHandler/eventhandler";
import ServiceClient from "../../ServiceClient";
import { FaPlus } from "react-icons/fa";
import AddSchoolYear from "./addSchoolYear";
import AreYouSure from "../../CommonComponents/AreYouSure/areyousure";
import {useTranslation} from "react-i18next";
        
const SchoolYearList = () => {
    /*Translation*/
    const {t}=useTranslation();
    /*Datas */
    const [selectedRow, setSelectedRow]=useState();
    let { schoolId }=useParams();
    /*const [schoolYears, setSchoolYears]=useState();*/
    const [update, setUpdate]=useState(false);
    const [schoolYearStatuses, schoolYears] = useLoaderData();
    const [schoolYearsList, setSchoolYearsList]=useState(schoolYears?.data);
    
    /*Popup control */
    const [showAreYouSure, setShowAreYouSure]=useState(false);
    const [AreYouSureName, setAreYouSureName]=useState('');
    const [transitionProp, setTransitionProp]=useState(false);
    const [areYouSureTransitionProp, setAreYouSureTransitionProp]=useState(false);

    /*button control */
    const [btndisabled, setBtnDisabled]=useState(false);

    /*event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);

    /*Loader */
    const [loader, setLoader]=useState(false);
    const [formLoader, setFormLoader]=useState(false);

    /*Navigation */
    const navigation=useNavigate();

    /*Methods */
    const RowClickHandle=(e)=>{
       
        if(showAreYouSure === true){
            setAreYouSureTransitionProp(true);
            
        }else{
            navigation(`/school/${schoolId}/school-year/${e?.id}`);
        }
        return
    }
    const getYearsOfSchool=()=>{
         ServiceClient.getSchoolYears(schoolId).then((result)=>{
            setLoader(false);
            setSchoolYearsList(result.data);
        }).catch((error)=>{
            setServerError(error);
            setLoader(false);
        })
    }
    const CreateSchoolYear=(dataForm)=>{
        setFormLoader(true);
        setBtnDisabled(true);

        ServiceClient.createSchoolYear(dataForm).then((success)=>{
            setFormLoader(false);
            setBtnDisabled(false);
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            },2000)
            getYearsOfSchool();
        }).catch((error)=>{
            setServerError(error);
            setLoader(false);
            setFormLoader(false);
            setBtnDisabled(false)
        });
    }

    return (
        <>
        <EventHandler 
            success={success} 
            errors={errors} 
            serverError={serverError} 
            closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}
        />
        <AddSchoolYear 
            transitionProp={transitionProp}
            closeModal={(data)=>{if(data===true){setTransitionProp(!transitionProp); setFormLoader(false); setBtnDisabled(false)}}}
            emitData={(dataForm)=>{CreateSchoolYear(dataForm)}}
            loader={formLoader}
            btndisabled={btndisabled}
            schoolYearStatuses={schoolYearStatuses}
        />
        <div>
            <div className="table-main-container">
                <div className="formTitle">
                    <FaPlus className='table-action-icon' onClick={() => setTransitionProp(true)}/>
                </div>
                {!loader ?
                    <table>
                        <thead>
                        <tr>
                            {schoolYears.header ? Object.keys(schoolYears.header).map((e, i) => (

                                <th key={i}>{e}</th>

                            )) : null}
                        </tr>
                        </thead>
                        <tbody>
                        {schoolYearsList?.map((e) => (
                            <tr key={e.id} onClick={() => {
                                setSelectedRow(e);
                                RowClickHandle(e)
                            }}>
                                {Object.values(e).map((j =>
                                        <td>{j}</td>
                                ))}
                            </tr>
                        ))}
                        {schoolYearsList.length === 0 ?
                            <tr>
                                <td colSpan={5} className="no-school">{t('empty-table')}</td>
                            </tr> : null}
                        </tbody>
                    </table> : <span className='loader table'></span>}

            </div>
        </div>
        </>


    );
};
export default SchoolYearList;