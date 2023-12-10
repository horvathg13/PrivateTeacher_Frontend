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