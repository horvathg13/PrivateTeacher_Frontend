import React, {useState} from 'react';
import {isRouteErrorResponse, useNavigate, useRouteError} from "react-router-dom";
import {FaTriangleExclamation} from "react-icons/fa6";
import {FaRegArrowAltCircleLeft} from "react-icons/fa";

const RouteBoundary = () => {
    const error = useRouteError();
    const navigate=useNavigate();

    return(
      <>
          <div className="boundary-back-container">
              <FaRegArrowAltCircleLeft className='icon' onClick={()=>navigate(-1)}/>
          </div>
          <div className="boundary-main-container">
              <div className="error-boundary-img-container">
                  <img src="/error-boundary-img.jpg"/>
              </div>
              <div className="error-message-container">
                  <h3>{error.response?.data.message}</h3>
              </div>
          </div>
      </>
    );
};

export default RouteBoundary;