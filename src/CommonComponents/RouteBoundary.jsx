import React, {useState} from 'react';
import {isRouteErrorResponse, useNavigate, useRouteError} from "react-router-dom";
import {FaTriangleExclamation} from "react-icons/fa6";
import {FaRegArrowAltCircleLeft} from "react-icons/fa";
import {useTranslation} from "react-i18next";

const RouteBoundary = () => {
    const error = useRouteError();
    const navigate=useNavigate();
    const {t}=useTranslation();

    if (isRouteErrorResponse(error)) {
        return (
        <>
            <div className="boundary-back-container">
                <FaRegArrowAltCircleLeft className='icon' onClick={() => navigate(-1)}/>
            </div>
            <div className="boundary-main-container">
                <div className="error-boundary-img-container">
                    <img src="/error-boundary-img.jpg"/>
                </div>
                <div className="error-message-container">
                    <h1>Oops!</h1>
                    <h2>{error.status}</h2>
                    <p>{error.statusText}</p>
                    {error.data?.message && <p>{error.data.message}</p>}
                </div>
            </div>
        </>
        );
    } else {


        return (
            <>
                <div className="boundary-back-container">
                <FaRegArrowAltCircleLeft className='icon' onClick={() => navigate(-1)}/>
                </div>
                <div className="boundary-main-container">
                    <div className="error-boundary-img-container">
                        <img src="/error-boundary-img.jpg"/>
                    </div>
                    <div className="error-message-container">
                        {error.response?.data.validatorResponse ?
                            error.response?.data.validatorResponse.map((e,i) =>
                                <h3 key={i}>{t(`${e}`)}</h3>
                            )
                            :
                            error.response?.data?.message ?
                                <h3>{t(`${error.response.data.message}`)}</h3>
                                : <h3>{t(`${error.response.data}`)}</h3>
                        }
                    </div>
                </div>
    </>
        );
    }
};

export default RouteBoundary;