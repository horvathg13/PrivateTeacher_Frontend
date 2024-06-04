import axios from 'axios'

class ServiceClient {

    static get(url, config = {}) {
        return axios.get(url, {
            ...config,
            headers: {
                ...config.headers,
                Authorization: 'Bearer ' +  window.localStorage.getItem('token') || '',         
            }
        }).catch(error=>{
            if(error?.response?.data?.message === "Token has expired"){
                localStorage.removeItem("token");
            }
            throw error
        })
    }

    static post(url, data = undefined, config = {}) {
        return axios.post(url, data, {
            ...config,
            headers: {
                ...config.headers,
                Authorization: 'Bearer ' +  window.localStorage.getItem('token') || '',
            }
        }).catch(error=>{
            if(error?.response?.data?.message === "Token has expired"){
                localStorage.removeItem("token");
            }
            throw error
        })
    }

    static delete(url, config = {}) {
        return axios.delete(url, {
            ...config,
            headers: {
                ...config.headers,
                Authorization: 'Bearer ' +  window.localStorage.getItem('token') || '',
            }
        }).catch(error=>{
            if(error?.response?.data?.message === "Token has expired"){
                localStorage.removeItem("token");
            }
            throw error
        })
    }
    static login(email, password){
        return this.post("http://127.0.0.1:8000/api/login", {email:email, psw:password}).then((response)=>{
            localStorage.setItem('token',response.data.data.token);
            return response.data
        })
    }
    static register(fname,lname,email,password){
        return this.post("http://127.0.0.1:8000/api/register", {fname:fname, lname:lname, email:email, psw:password}).then((response)=>{
            return response.data
        })
    }
    static createUser(fname,lname,email,password){
        return this.post("http://127.0.0.1:8000/api/createUser", {fname:fname, lname:lname, email:email, psw:password}).then((response)=>{
            return response.data
        })
    }
    static createUserRole(roleId, refId, userId){
        return this.post("http://127.0.0.1:8000/api/createUserRole", {roleId:roleId, refId:refId, userId:userId}).then((response)=>{
            return response.data
        })
    }
    static getRoles(){
        return this.post("http://127.0.0.1:8000/api/getAllRoles").then((response)=>{
            return response.data
        })
    }
    static schoolUpdate(schoolId,name,city,zip,street, number){
        return this.post("http://127.0.0.1:8000/api/schoolUpdate", {id: schoolId, name:name, city:city, zip:zip, street:street, number:number}).then((response)=>{
            return response.data
        })
    }
    static getSchoolYears(schoolId){
        return this.post(`http://127.0.0.1:8000/api/school-year-list/${schoolId}`).then((response)=> {
            return response.data;
        })
    }
    static getSchools(){
        return this.post("http://127.0.0.1:8000/api/schools-list").then((response)=>{
            return response.data
        })
    }
    static schoolCreate(name,country, zip, city, street, number){
        return this.post("http://127.0.0.1:8000/api/schoolCreate", {name:name, country:country, city:city, zip:zip, street:street, number:number}).then((response)=>{
            return response.data
        })
    }
    static createSchoolYear(dataForm){
        return this.post("http://127.0.0.1:8000/api/createSchoolYear", {schoolYear:dataForm.schoolYear, startDate:dataForm.startDate, endDate:dataForm.endDate, schoolId:dataForm.schoolId, name:dataForm.name, statusId:dataForm.status}).then((response)=>{
            return response.data
        })
    }
    static createTeachingDay(name, teacherId, startDate, endDate, locationId){
        return this.post("http://127.0.0.1:8000/api/createTeachingDay",{name:name, teacherId:teacherId, start:startDate, end:endDate, locationId:locationId}).then((response)=>{
            return response.data
        })
    }
    static createSchoolLocation(name, country, city, zip, street, number, floor, door, schoolId, locationId){
        return this.post("http://127.0.0.1:8000/api/createSchoolLocation",{
            name:name, country:country, city:city, zip:zip, street:street, number:number, floor:floor, door:door, schoolId:schoolId, locationId:locationId||null
        }).then((response)=>{
            return response.data
        })
    }
    static getSchoolLocations(){
        return this.post("http://127.0.0.1:8000/api/getSchoolLocations").then((response)=>{
            return response.data
        })
    }
}

export default ServiceClient