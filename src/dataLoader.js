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

export const getSchoolBreaks=(params)=>{
    return ServiceClient.get(`http://127.0.0.1:8000/api/school/${params.schoolId}/school-year-details/${params.schoolYearId}`).then((response)=>{
        if(response.status===200){
            return response.data
        }
    });
}
