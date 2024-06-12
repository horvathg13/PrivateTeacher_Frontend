import React from 'react';
import {Outlet} from "react-router-dom";

function TeacherOutlet(props) {
    return (
        <div><Outlet/></div>
    );
}

export default TeacherOutlet;