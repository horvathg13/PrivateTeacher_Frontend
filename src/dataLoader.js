import ServiceClient from "./ServiceClient"

export const userDataLoader=(params)=>{
    return ServiceClient.get(`/api/selectedUserData/${params.userId}`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    })

}

export const generatedUserLoader=(params)=>{
    return ServiceClient.get(`/api/password-reset/${params.token}`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    })
}
export const getSchoolYearInfos=(params)=>{
    return  ServiceClient.get(`/api/school/${params.schoolId}/school-year-infos/${params.schoolYearId}`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    });
}
export const getSchoolYears=(params)=>{
    return ServiceClient.post(`/api/school-year-list/${params.schoolId}`).then((response)=> {
        return response.data;
    })
}

export const getSchoolBreaks=(params)=>{
    return ServiceClient.get(`/api/school/${params.schoolId}/school-year-details/${params.schoolYearId}`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    });
}

export const getCourses=()=>{
    return ServiceClient.get(`/api/getCourses/${null}`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    });
}
export const getCourseInfo=(params)=>{
    return ServiceClient.get(`/api/getCourseInfo/${params.courseId}`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    });
}

export const getCourseStatuses=()=>{
    return ServiceClient.post("/api/getCourseStatuses").then((response)=>{
        if(response.status===200){
            return response.data
        }
    });
}

export const getUserRoles=(params)=>{
    return ServiceClient.post(`/api/getUserRoles/${params.userId}`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    });
}

export const getGlobalRoles=(params)=>{
    return ServiceClient.post(`/api/getAllRoles`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    })
}

export const getConnectedChildren=()=>{
    return ServiceClient.get('/api/getConnectedChildren').then((response)=>{
        if(response.status===200){
            return response.data
        }
    })
}

export const getSchoolYearStatuses=()=>{
    
    return ServiceClient.post('/api/getSchoolYearStatuses').then((response)=>{
        if(response.status===200){
           return response.data;
        }
    });
}
export const getCourseLocations=()=>{
    return ServiceClient.post("/api/getLocations",).then((response)=>{
        return response.data
    });
}
export const getPaymentPeriods=()=>{
    return ServiceClient.post("/api/getPaymentPeriods").then((response)=>{
        return response.data
    });
}
export const getCurrenciesISO=()=>{
    return ServiceClient.get("/api/getCurrenciesISO").then((response)=>{
        return response.data
    });
}
export const getSchoolTeachers=(params)=>{
    return ServiceClient.post(`/api/getSchoolTeachers?perPage=1&page=1`, {schoolId:params.schoolId}).then((response)=>{
        return response.data
    })
}
export const getCourseLocation=(params)=>{
    return ServiceClient.get(`/api/getLocationInfo/${params.locationId}`,).then((response)=>{
        return response.data
    });
}
export const getTeachingDayNames=()=>{
    return ServiceClient.post("/api/getTeachingDayNames").then((response)=>{
        return response.data
    });
}

export const getTeachingDays=(params)=>{
    return ServiceClient.post(`/api/getTeachingDays`, {schoolId:params.schoolId, yearId:params.schoolYearId, courseId:15, teacherId:10}).then((response)=>{
        return response.data
    })
}

export const getChildInfo=(params)=>{
    return ServiceClient.get(`/api/getChildInfo/${params.childId}`).then((response)=>{
        return response.data
    })
}
export const getChildren=()=>{
    return ServiceClient.post(`/api/getChildren`).then((response)=>{
        return response.data
    })
}
export const getChildCourses=(params)=>{
    return ServiceClient.get(`/api/getChildCourses/${params.childId}`).then((response)=>{
        return response.data
    })
}
export const getRequests=(status)=>{
    return ServiceClient.post(`/api/getRequests`,{status:status || null}).then((response)=>{
        return response.data
    })
}
export const getRequestDetails=(params)=>{
    return ServiceClient.post(`/api/getRequestDetails`, {requestId:params.requestId}).then((response)=>{
        return response.data
    })
}

export const getCourseProfile=(params)=>{
    return ServiceClient.get(`/api/getCourseProfile/${params.courseId}`).then((response)=>{
        return response.data
    })
}
export const haveUnreadNotifications=()=>{
    return ServiceClient.get(`/api/haveUnreadNotifications`).then((response)=>{
        return response.data
    }).catch(error=>{
        console.log(error)
    });
}

export const getMessages=()=>{
    return ServiceClient.get('/api/getMessages?perPage=10&page=1').then((response)=>{
        return response.data
    })
}

export const getMessageInfo=(params)=>{
    return ServiceClient.get(`/api/getMessageInfo/${params.id}/${null}`).then((response)=>{
        return response.data
    })
}

export const getLanguages=()=>{
    return ServiceClient.get("/api/getLanguages").then((response)=>{
        return response.data
    })
}

export const getLocationCourses=(params)=>{
    return ServiceClient.get(`/api/getCourses/${params.locationId}`).then((response)=> {
        if (response.status === 200) {
            return response.data
        }
    })
}
export const getUserData=()=>{
    return ServiceClient.post('/api/getUserData').then((response)=>{
        return response.data
    })
}