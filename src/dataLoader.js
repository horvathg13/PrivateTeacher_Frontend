import ServiceClient from "./ServiceClient"

export const userDataLoader=(params)=>{
    return ServiceClient.get(`http://127.0.0.1:8000/api/selectedUserData/${params.userId}`)

}
