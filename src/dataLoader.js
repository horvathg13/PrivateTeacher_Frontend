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

export const getCourses=()=>{
    return ServiceClient.get(`http://127.0.0.1:8000/api/getCourses`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    });
}
export const getCourseInfo=(params)=>{
    return ServiceClient.get(`http://127.0.0.1:8000/api/getCourseInfo/${params.courseId}`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    });
}

export const getCourseStatuses=()=>{
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

export const getGlobalRoles=(params)=>{
    return ServiceClient.post(`http://127.0.0.1:8000/api/getAllRoles`).then((response)=>{
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
export const getCourseLocations=()=>{
    return ServiceClient.post("http://127.0.0.1:8000/api/getLocations",).then((response)=>{
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
export const getCurrenciesISO=()=>{
    return ServiceClient.get("http://127.0.0.1:8000/api/getCurrenciesISO").then((response)=>{
        return response.data
    });
}
export const getSchoolTeachers=(params)=>{
    return ServiceClient.post(`http://127.0.0.1:8000/api/getSchoolTeachers?perPage=1&page=1`, {schoolId:params.schoolId}).then((response)=>{
        return response.data
    })
}
export const getCourseLocation=(params)=>{
    return ServiceClient.get(`http://127.0.0.1:8000/api/getLocationInfo/${params.locationId}`,).then((response)=>{
        return response.data
    }).catch((error)=>{
        console.log(error);
    })
}
export const getTeachingDayNames=()=>{
    return ServiceClient.post("http://127.0.0.1:8000/api/getTeachingDayNames").then((response)=>{
        return response.data
    });
}

export const getTeachingDays=(params)=>{
    return ServiceClient.post(`http://127.0.0.1:8000/api/getTeachingDays`, {schoolId:params.schoolId, yearId:params.schoolYearId, courseId:15, teacherId:10}).then((response)=>{
        return response.data
    })
}

export const getChildInfo=(params)=>{
    return ServiceClient.get(`http://127.0.0.1:8000/api/getChildInfo/${params.childId}`).then((response)=>{
        return response.data
    })
}
export const getChildren=()=>{
    return ServiceClient.post(`http://127.0.0.1:8000/api/getChildren`).then((response)=>{
        return response.data
    })
}

export const getRequests=()=>{
    return ServiceClient.get(`http://127.0.0.1:8000/api/getRequests`).then((response)=>{
        return response.data
    })
}