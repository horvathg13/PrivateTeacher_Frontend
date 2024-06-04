import React from 'react';
import {Outlet} from "react-router-dom";

const LocationOutlet = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default LocationOutlet;