import { useEffect, useState } from 'react';
import EventHandler from '../../EventHandler/eventhandler';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import ServiceClient from '../../ServiceClient';
import {FaMinus, FaPlus, FaPlusCircle} from 'react-icons/fa';
import {useTranslation} from "react-i18next";
import Select from 'react-select';

const UserRoles = () => {
    /*Translation*/
    const {t}=useTranslation();
    /*dataLoader */
    const [dataLoader, roleOptions]=useLoaderData();

    useEffect(()=>{
        if(dataLoader){
            setHeader(dataLoader.header);
            /*setUserRoles(dataLoader.userRoles);*/
            setLoader(false);
        }else{
            setHeader("");
            setLoader(false);
        }
    },[]);

    /*Data*/
    const [userRoles, setUserRoles]=useState(dataLoader.userRoles);
    const [header, setHeader]=useState();
    const [selectedRowId, setSelectedRow]=useState();
    const [createUserRole, setCreateUserRole]=useState(false);
    const [tableRow, setTableRow]=useState([{roleId:null,role:''}]);
    const [removeRole,setRemoveRole]=useState([]);
    
    /*Event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);
    const navigate = useNavigate();

    /*Btn handle*/
    const [btndisabled, setBtnDisabled]=useState(false);
    const [loader, setLoader]=useState(false);
    const [saveBtn, setSaveBtn] = useState(false)
    const [readOnly, setReadOnly] = useState()

    /*DataSave*/
    const [dataSave, setDataSave]=useState();
    let { userId }=useParams();

    /*Popup control */
    const [AreYouSureName, setAreYouSureName]=useState('');
    const [areYouSureTransitionProp, setAreYouSureTransitionProp]=useState(false);

    

    /*Methods: */
    const functionControl=(name)=>{
        if(name === 'delete'){
            removeUserRole();
            setAreYouSureTransitionProp(false);
        }
            
        setAreYouSureTransitionProp(false);
        
    }
    const removeUserRole=()=>{
        setLoader(true);
        let url=`/api/removeUserRole/${userId}/${selectedRowId.roleId}`
        
        ServiceClient.removeUserRole(userId,selectedRowId.roleId).then((success)=>{
            getUserRoles();
            setLoader(false);
        }).catch((error)=>{
            setErrors(error);
            setLoader(false);
        });
    }
    const getUserRoles=()=>{
        setLoader(true);
        ServiceClient.getUserRoles(userId).then((success)=>{
            setHeader(success.header);
            setUserRoles(success.userRoles);
            setLoader(false);
        }).catch((error)=>{
            setErrors(error);
            setLoader(false);
        });
    }
    const handleAddTableRow=()=>{
        if(!btndisabled){
            let values=[...tableRow, {roleId:null,role:''}];
            setTableRow(values);
        }
    }
    const handleRemoveTableRow=(e)=>{
        if(!btndisabled){
            const values=tableRow.filter(r=>r.roleId !== e.roleId);

            setTableRow(values);

            const filterRemoveRole=removeRole.filter(r=>r.roleId === e.roleId);

            if(!filterRemoveRole.length){
                const values=[...removeRole,e];
                setRemoveRole(values)
            }
        }
    }
    const handleSelection=(selection,i)=>{
        const values=[...tableRow];

        values[i].role= selection.label
        values[i].roleId= selection.value
        setTableRow(values);
    }
    const createRole=(e)=> {
        e.preventDefault();
        setErrors([]);
        setServerError([]);
        const finalData = tableRow.filter(r => r.roleId && r.role)
        if(finalData.length || removeRole.length){
            setBtnDisabled(true);
            setLoader(true);
            setReadOnly(true);

            let filterFinalData= userRoles.length ? finalData.filter(f=>!userRoles.some(r=>r.roleId === f.roleId)) : finalData;

            ServiceClient.createUserRole(filterFinalData, removeRole, userId).then((success)=>{
                setSuccess(true);
                setLoader(false);
                setBtnDisabled(false);
                setReadOnly(false);
                setRemoveRole([]);
                getUserRoles()
                setTimeout(()=>{
                    setSuccess(false);
                },2000)

            }).catch((error)=>{
                setServerError(error);
                setLoader(false);
                setBtnDisabled(false);
                setReadOnly(false);
            });

        }else{
            setErrors([t('users.user.createUserRole.validation.required')])
        }
    }
    useEffect(() => {
        if(dataLoader?.userRoles){
            setTableRow(dataLoader?.userRoles)
            setUserRoles(dataLoader?.userRoles)
        }
    }, [dataLoader.userRoles]);
    return (
        <>
        <EventHandler 
            success={success}
            errors={errors}
            serverError={serverError}
            closeErrorMessage={(data)=>{if(data===true){setErrors([])}}}
        />

        <div>
            <div className="userRoles-table-container">
                {!loader ?
                    <table>
                        <thead>
                        <tr>
                            {header ? header.map((e, i) => (
                                <>
                                    <th key={i}>{t(`tableHeaders.${e}`)}</th>
                                </>
                            )) : null}
                            <th></th>
                            <th></th>
                        </tr>

                        </thead>
                        <tbody>

                        {tableRow.length ? tableRow.map((e, i) => (
                            <tr className="disableSelection" key={i}>
                                <td>
                                    <Select
                                        placeholder={t('users.user.createUserRole.placeholder')}
                                        defaultValue={({value:e.roleId, label: t(`enums.${e.role}`)})}
                                        value={({value:e.roleId, label: e.role ? t(`${e.role}`) : null})}
                                        options={userRoles.length ? roleOptions.filter((o)=>!userRoles.some(r=>r.roleId === o.value) && !tableRow.some(t=>t.roleId === o.value)).map(l=>({value:l.value, label:t(`enums.${l.label}`)})) : roleOptions.map(r=>({value:r.value, label:t(`enums.${r.label}`)}))}
                                        onChange={(selected)=>handleSelection(selected,i)}
                                        isSearchable={true}
                                        isDisabled={userRoles.some(r=>r.roleId === e.roleId)}
                                        noOptionsMessage={()=>t('no-option')}
                                    />
                                </td>
                                <td className="table-action-container">
                                    <span className="table-action-button">
                                        {<FaMinus className='table-action-icon' onClick={() => {
                                             handleRemoveTableRow(e)
                                        }}/>}
                                    </span>
                                </td>
                            </tr>
                            )) :
                            <>
                                <tr>
                                    <td colSpan={2} className="no-school">{t('empty-table')}</td>
                                </tr>
                            </>
                        }
                    <tr>
                        {tableRow.length<3&&<td colSpan={3}>
                            <FaPlusCircle className='table-action-icon' onClick={() => {
                                handleAddTableRow()
                            }}/>
                        </td>}
                    </tr>
                    </tbody>
                </table> : 
                <span className='loader table'></span>}
                <div className="button-container">
                    {!saveBtn ? <button type="submit" className="formButton" disabled={btndisabled} onClick={(e)=>createRole(e)}>{t('users.user.createUserRole.create')}</button>:null}
                </div>
                
            </div>
           
        </div>
        </>
    );
};
export default UserRoles;