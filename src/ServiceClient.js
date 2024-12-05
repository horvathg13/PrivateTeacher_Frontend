import axios from 'axios'
import i18next from "i18next";
import school from "./Course/course";

class ServiceClient {

    static get(url, config = {}) {
        return axios.get(url, {
            ...config,
            headers: {
                ...config.headers,
                Authorization: 'Bearer ' +  window.localStorage.getItem('token') || '',
                locale:i18next.language
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
                locale:i18next.language
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
    static resetPassword(userId, password){
        return this.post("http://127.0.0.1:8000/api/resetPassword",{userId:userId, psw:password}).then((response)=>{
            return response.data
        })
    }
    static createUser(fname,lname,email,password){
        return this.post("http://127.0.0.1:8000/api/createUser", {fname:fname, lname:lname, email:email, psw:password}).then((response)=>{
            return response.data
        })
    }
    static updateUser(userId, userInfo, password, cpassword){
        return this.post("http://127.0.0.1:8000/api/updateUser",{id:userId, userInfo:userInfo, newPassword:password, confirmPassword:cpassword}).then((response)=>{
            return response.data
        })
    }
    static updateChild(childId, childIfo, password, cpassword){
        return this.post("http://127.0.0.1:8000/api/updateChildInfo",{childId:childId, userInfo:childIfo, password:password, confirmPassword:cpassword}).then((response)=>{
            return response.data
        })
    }
    static sendCourseRequest(childId, courseId,numberOfLesson, notice){
        return this.post("http://127.0.0.1:8000/api/sendCourseRequest", {childId:childId, courseId:courseId, notice:notice, numberOfLesson:numberOfLesson}).then((response)=>{
            return response.data
        })
    }
    static acceptCourseRequest(requestId, message){
        return this.post("http://127.0.0.1:8000/api/acceptCourseRequest", {requestId:requestId, message:message}).then((response)=>{
            return response.data
        })
    }
    static rejectCourseRequest(requestId,message){
        return this.post("http://127.0.0.1:8000/api/rejectCourseRequest", {requestId:requestId, message:message}).then((response)=>{
            return response.data
        })
    }
    static getUserStatuses(){
        return this.post("http://127.0.0.1:8000/api/getUserStatuses").then((response)=>{
            return response.data
        })
    }
    static createUserRole(roleId,userId){
        return this.post("http://127.0.0.1:8000/api/createUserRole", {roleId:roleId, userId:userId}).then((response)=>{
            return response.data
        })
    }
    static getRoles(){
        return this.post("http://127.0.0.1:8000/api/getAllRoles").then((response)=>{
            return response.data
        })
    }
    static getUserRoles=(userId)=>{
        return this.post(`http://127.0.0.1:8000/api/getUserRoles/${userId}`).then((response)=>{
            if(response.status===200){
                return response.data
            }
        });
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
    static getSchoolYearInfos(schoolId, schoolYearId){
        return this.get(`http://127.0.0.1:8000/api/school/${schoolId}/school-year-infos/${schoolYearId}`).then((response)=>{
            return response.data
        })
    }
    static createSchoolYear(dataForm){
        return this.post("http://127.0.0.1:8000/api/createSchoolYear", {schoolYear:dataForm.schoolYear, startDate:dataForm.startDate, endDate:dataForm.endDate, schoolId:dataForm.schoolId, name:dataForm.name, status:dataForm.status}).then((response)=>{
            return response.data
        })
    }
    static updateSchoolYear(schoolYearId, schoolId, schoolYear, name, startDate, endDate, status){
        return this.post("http://127.0.0.1:8000/api/createSchoolYear", {id:schoolYearId,schoolYear:schoolYear, startDate:startDate, endDate:endDate, schoolId:schoolId, name:name, status:status}).then((response)=>{
            return response.data
        });
    }
    static removeSchoolYear(schoolId, schoolYearId){
        return this.post("http://127.0.0.1:8000/api/removeSchoolYear",{schoolId:schoolId, yearId:schoolYearId}).then((response)=>{
            return response.data
        });
    }
    static createTeachingDay(schoolId, schoolYearId, courseId, days, teacherId, startDate, endDate, locationId){
        return this.post("http://127.0.0.1:8000/api/createTeachingDay",{schoolId:schoolId, yearId:schoolYearId, courseId: 15, days:days, teacherId:teacherId, startTime:startDate, endTime:endDate, locationId:locationId}).then((response)=>{
            return response.data
        })
    }
    static createLocation(name, country, city, zip, street, number, floor, door, locationId, selectedCourseId){
        return this.post("http://127.0.0.1:8000/api/createLocation",{
            name:name, country:country, city:city, zip:zip, street:street, number:number, floor:floor, door:door, locationId:locationId||null, selectedCourseId:selectedCourseId
        }).then((response)=>{
            return response.data
        })
    }
    static getSchoolLocations(){
        return this.post("http://127.0.0.1:8000/api/getSchoolLocations").then((response)=>{
            return response.data
        })
    }
    static getCourseLocation=(locationId)=>{
        return ServiceClient.get(`http://127.0.0.1:8000/api/getLocationInfo/${locationId}`,).then((response)=>{
            return response.data
        })
    }
    static removeSchoolLocation(schoolId, locationId){
        return this.post("http://127.0.0.1:8000/api/removeSchoolLocation",{schoolId:schoolId, locationId:locationId}).then((response)=>{
            return response.data
        });
    }
    static getSchoolBreaksAndScpecialWorkDays(schoolId, schoolYearId){
        return this.get(`http://127.0.0.1:8000/api/school/${schoolId}/school-year-details/${schoolYearId}`).then((response)=>{
            return response.data
        });
    }
    static createSchoolBreak(schoolId, yearId, name, startDate, endDate, id){
       return this.post("http://127.0.0.1:8000/api/createSchoolBreak",{schoolId:schoolId, yearId:yearId, name:name,start:startDate, end:endDate, id:id||null}).then((response)=>{
           return response.data
       })
    }
    static removeSchoolBreak(schoolId, yearId, id){
        return this.post("http://127.0.0.1:8000/api/removeSchoolBreak", {schoolId:schoolId, yearId:yearId, id:id}).then((response)=>{
            return response.data
        })
    }
    static createSpecialWorkDay(schoolId, yearId, name, startDate, endDate, id){
        return this.post("http://127.0.0.1:8000/api/createSpecialWorkDay",{schoolId:schoolId, yearId:yearId, name:name,start:startDate, end:endDate, id:id||null}).then((response)=>{
            return response.data
        });
    }
    static removeSpecialWorkDay(schoolId, yearId, id){
        return this.post("http://127.0.0.1:8000/api/removeSpecialWorkDay", {schoolId:schoolId, yearId:yearId, id:id}).then((response)=>{
            return response.data
        });
    }
    static createCourse(courseName, studentLimit, minutesLesson, minTeachingDay, coursePricePerLesson, labels, locationId, paymentPeriod, courseId, currency){
        return this.post("http://127.0.0.1:8000/api/createCourse",{
            courseId: courseId || null, name:courseName, studentLimit:studentLimit,minutesLesson:minutesLesson, minTeachingDay:minTeachingDay, coursePricePerLesson:coursePricePerLesson, labels:labels, paymentPeriod:paymentPeriod, locationId:locationId, currency:currency}).then((response)=>{
                return response.data
        });
    }
    static removeCourse(courseId){
        return this.post("http://127.0.0.1:8000/api/removeCourse",{id:courseId}).then((response)=>{
            return response.data
        });
    }
    static getNotifications(){
        return ServiceClient.get(`http://127.0.0.1:8000/api/getNotifications`).then((response)=>{
            return response.data
        });
    }

    static readNotification(notificationId){
        return ServiceClient.get(`http://127.0.0.1:8000/api/readNotification/${notificationId}`).then((response)=>{
            return response.data
        });
    }
    static getMessages=()=>{
        return ServiceClient.get(`http://127.0.0.1:8000/api/getMessages`).then((response)=>{
            return response.data
        })
    }
    static sendMessage=(Id,message, childId, teacherId)=>{
        return ServiceClient.post(`http://127.0.0.1:8000/api/sendMessage`, {Id:Id, message:message, childId:childId, teacherId:teacherId}).then((response)=>{
            return response.data
        })
    }
    static getMessageInfo=(Id)=>{
        return ServiceClient.get(`http://127.0.0.1:8000/api/getMessageInfo/${Id}`).then((response)=>{
            return response.data
        })
    }

    static searchLabel=(keyword)=>{
        return ServiceClient.post("http://127.0.0.1:8000/api/searchLabel", {keyword:keyword}).then((response)=>{
            return response.data
        });
    }

    static createLabel=(keyword)=>{
        return ServiceClient.post("http://127.0.0.1:8000/api/createLabel", {keyword:keyword}).then((response)=>{
            return response.data
        });
    }

}

export default ServiceClient