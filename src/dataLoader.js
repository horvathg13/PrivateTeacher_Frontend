import ServiceClient from "./ServiceClient"

export const userDataLoader=(params)=>{
    return ServiceClient.get(`http://127.0.0.1:8000/api/selectedUserData/${params.userId}`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    })

}

export const generatedUserLoader=(params)=>{
    return ServiceClient.get(`http://127.0.0.1:8000/api/password-reset/${params.token}`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    })
}

export const getSchoolInfo=(params)=>{
    return ServiceClient.get(`http://127.0.0.1:8000/api/school/${params.schoolId}`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    })
}

export const getSchoolYearInfos=(params)=>{
    return  ServiceClient.get(`http://127.0.0.1:8000/api/school/${params.schoolId}/school-year-infos/${params.schoolYearId}`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    });
}
export const getSchoolYears=(params)=>{
    return ServiceClient.post(`http://127.0.0.1:8000/api/school-year-list/${params.schoolId}`).then((response)=> {
        return response.data;
    })
}

export const getSchoolBreaks=(params)=>{
    return ServiceClient.get(`http://127.0.0.1:8000/api/school/${params.schoolId}/school-year-details/${params.schoolYearId}`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    });
}

export const getSchoolCourses=(params)=>{
    return ServiceClient.get(`http://127.0.0.1:8000/api/school/${params.schoolId}/school-year-details/${params.schoolYearId}/courses`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    });
}
export const getSchoolCourseInfo=(params)=>{
    return ServiceClient.get(`http://127.0.0.1:8000/api/school/${params.schoolId}/school-year-details/${params.schoolYearId}/courses/${params.courseId}`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    });
}

export const getSchoolCourseStatuses=()=>{
    return ServiceClient.post("http://127.0.0.1:8000/api/getCourseStatuses").then((response)=>{
        if(response.status===200){
            return response.data
        }
    });
}

export const getUserRoles=(params)=>{
    return ServiceClient.post(`http://127.0.0.1:8000/api/getUserRoles/${params.userId}`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    });
}

export const getRolesandSchools=(params)=>{
    return ServiceClient.post(`http://127.0.0.1:8000/api/getRolesandSchools/${params.userId}`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    })
}

export const getConnectedChildren=()=>{
    return ServiceClient.get('http://127.0.0.1:8000/api/getConnectedChildren').then((response)=>{
        if(response.status===200){
            return response.data
        }
    })
}

export const getSchoolYearStatuses=()=>{
    
    return ServiceClient.post('http://127.0.0.1:8000/api/getSchoolYearStatuses').then((response)=>{
        if(response.status===200){
           return response.data;
        }
    }).catch((error)=>{
        console.log(error);
    })
}
export const getSchoolLocations=(params)=>{
    return ServiceClient.post("http://127.0.0.1:8000/api/getSchoolLocations?perPage=1&page=1",{schoolId:params.schoolId}).then((response)=>{
        return response.data
    }).catch((error)=>{
        console.log(error);
    })
}
export const getPaymentPeriods=()=>{
    return ServiceClient.post("http://127.0.0.1:8000/api/getPaymentPeriods").then((response)=>{
        return response.data
    });
}
export const getSchoolTeachers=(params)=>{
    return ServiceClient.post(`http://127.0.0.1:8000/api/getSchoolTeachers?perPage=1&page=1`, {schoolId:params.schoolId}).then((response)=>{
        return response.data
    })
}
export const getSchoolLocation=(params)=>{
    return ServiceClient.post("http://127.0.0.1:8000/api/getSchoolLocation", {schoolId:params.schoolId, locationId:params.locationId}).then((response)=>{
        return response.data
    }).catch((error)=>{
        console.log(error);
    })
}