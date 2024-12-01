import {useTranslation} from "react-i18next";
import {useLoaderData, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import EventHandler from "../EventHandler/eventhandler";
import Table from "../CommonComponents/Table/table";
import message from "./message";
import {getMessages} from "../dataLoader";
import ServiceClient from "../ServiceClient";
const Messages = () => {
    /*Loader*/
    const messageLoader = useLoaderData();

    /*Data*/
    const [loader, setLoader] = useState(false);
    const [selectedRow, setSelectedRow] = useState();

    const [counter, setCounter]=useState(1);
    const [lastPage, setLastPage]=useState(messageLoader?.lastPage);
    const [perPage, setPerPage]=useState(5);

    /*Navigation*/
    const navigate = useNavigate();

    /*Event handle*/
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState([]);

    /*Translation*/
    const {t} = useTranslation();

    /*Methods: */
    useEffect(() => {
        if(selectedRow) {
            navigate(`/message/${selectedRow.id}`)
        }
    }, [selectedRow]);
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
                }}/>

            <Table
                datas={messageLoader || null}
                loader={loader}
                selectedRow={(e)=>[setSelectedRow(e)]}
                setPaginator={false}
            />

        </>

    );
}
export default Messages