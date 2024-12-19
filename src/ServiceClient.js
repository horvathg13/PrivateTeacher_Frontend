import axios from 'axios'
import i18next from "i18next";
import school from "./Course/course";

class ServiceClient {

    static get(url, config = {}) {
        return axios.get(process.env.REACT_APP_SERVICE_URL+url, {
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
        return axios.post(process.env.REACT_APP_SERVICE_URL+url, data, {
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
        return axios.delete(process.env.SERVICE_URL + url, {
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
        return this.post("/api/login", {email:email, psw:password}).then((response)=>{
            localStorage.setItem('token',response.data.data.token);
            return response.data
        })
    }
    static register(fname,lname,email,password){
        return this.post("/api/register", {fname:fname, lname:lname, email:email, psw:password}).then((response)=>{
            return response.data
        })
    }
    static resetPassword(password, token){
        return this.post("/api/resetPassword",{psw:password, token:token}).then((response)=>{
            return response.data
        })
    }
    static createUser(fname,lname,email,password){
        return this.post("/api/createUser", {fname:fname, lname:lname, email:email, psw:password}).then((response)=>{
            return response.data
        })
    }
    static updateUser(userId, userInfo, password, cpassword){
        return this.post("/api/updateUser",{id:userId, userInfo:userInfo, newPassword:password, confirmPassword:cpassword}).then((response)=>{
            return response.data
        })
    }
    static updateChild(childId, childIfo, password, cpassword){
        return this.post("/api/updateChildInfo",{childId:childId, userInfo:childIfo, password:password, confirmPassword:cpassword}).then((response)=>{
            return response.data
        })
    }
    static sendCourseRequest(childId, courseId,numberOfLesson, notice){
        return this.post("/api/sendCourseRequest", {childId:childId, courseId:courseId, notice:notice, numberOfLesson:numberOfLesson}).then((response)=>{
            return response.data
        })
    }
    static acceptCourseRequest(requestId, message){
        return this.post("/api/acceptCourseRequest", {requestId:requestId, message:message}).then((response)=>{
            return response.data
        })
    }
    static rejectCourseRequest(requestId,message){
        return this.post("/api/rejectCourseRequest", {requestId:requestId, message:message}).then((response)=>{
            return response.data
        })
    }
    static getUserStatuses(){
        return this.post("/api/getUserStatuses").then((response)=>{
            return response.data
        })
    }
    static createUserRole(roleId,userId){
        return this.post("/api/createUserRole", {roleId:roleId, userId:userId}).then((response)=>{
            return response.data
        })
    }
    static getRoles(){
        return this.post("/api/getAllRoles").then((response)=>{
            return response.data
        })
    }
    static getUserRoles=(userId)=>{
        return this.post(`/api/getUserRoles/${userId}`).then((response)=>{
            if(response.status===200){
                return response.data
            }
        });
    }
    static schoolUpdate(schoolId,name,city,zip,street, number){
        return this.post("/api/schoolUpdate", {id: schoolId, name:name, city:city, zip:zip, street:street, number:number}).then((response)=>{
            return response.data
        })
    }
    static getSchoolYears(schoolId){
        return this.post(`/api/school-year-list/${schoolId}`).then((response)=> {
            return response.data;
        })
    }
    static getSchools(){
        return this.post("/api/schools-list").then((response)=>{
            return response.data
        })
    }
    static schoolCreate(name,country, zip, city, street, number){
        return this.post("/api/schoolCreate", {name:name, country:country, city:city, zip:zip, street:street, number:number}).then((response)=>{
            return response.data
        })
    }
    static getSchoolYearInfos(schoolId, schoolYearId){
        return this.get(`/api/school/${schoolId}/school-year-infos/${schoolYearId}`).then((response)=>{
            return response.data
        })
    }
    static createSchoolYear(dataForm){
        return this.post("/api/createSchoolYear", {schoolYear:dataForm.schoolYear, startDate:dataForm.startDate, endDate:dataForm.endDate, schoolId:dataForm.schoolId, name:dataForm.name, status:dataForm.status}).then((response)=>{
            return response.data
        })
    }
    static updateSchoolYear(schoolYearId, schoolId, schoolYear, name, startDate, endDate, status){
        return this.post("/api/createSchoolYear", {id:schoolYearId,schoolYear:schoolYear, startDate:startDate, endDate:endDate, schoolId:schoolId, name:name, status:status}).then((response)=>{
            return response.data
        });
    }
    static removeSchoolYear(schoolId, schoolYearId){
        return this.post("/api/removeSchoolYear",{schoolId:schoolId, yearId:schoolYearId}).then((response)=>{
            return response.data
        });
    }
    static createTeachingDay(schoolId, schoolYearId, courseId, days, teacherId, startDate, endDate, locationId){
        return this.post("/api/createTeachingDay",{schoolId:schoolId, yearId:schoolYearId, courseId: 15, days:days, teacherId:teacherId, startTime:startDate, endTime:endDate, locationId:locationId}).then((response)=>{
            return response.data
        })
    }
    static createLocation(name, country, city, zip, street, number, floor, door, locationId, selectedCourseId){
        return this.post("/api/createLocation",{
            name:name, country:country, city:city, zip:zip, street:street, number:number, floor:floor, door:door, locationId:locationId||null, selectedCourseId:selectedCourseId
        }).then((response)=>{
            return response.data
        })
    }
    static getSchoolLocations(){
        return this.post("/api/getSchoolLocations").then((response)=>{
            return response.data
        })
    }
    static getCourseLocation=(locationId)=>{
        return this.get(`/api/getLocationInfo/${locationId}`,).then((response)=>{
            return response.data
        })
    }
    static removeLocation(locationId){
        return this.post("/api/removeCourseLocation",{locationId:locationId}).then((response)=>{
            return response.data
        });
    }
    static getSchoolBreaksAndScpecialWorkDays(schoolId, schoolYearId){
        return this.get(`/api/school/${schoolId}/school-year-details/${schoolYearId}`).then((response)=>{
            return response.data
        });
    }
    static createSchoolBreak(schoolId, yearId, name, startDate, endDate, id){
       return this.post("/api/createSchoolBreak",{schoolId:schoolId, yearId:yearId, name:name,start:startDate, end:endDate, id:id||null}).then((response)=>{
           return response.data
       })
    }
    static removeSchoolBreak(schoolId, yearId, id){
        return this.post("/api/removeSchoolBreak", {schoolId:schoolId, yearId:yearId, id:id}).then((response)=>{
            return response.data
        })
    }
    static createSpecialWorkDay(schoolId, yearId, name, startDate, endDate, id){
        return this.post("/api/createSpecialWorkDay",{schoolId:schoolId, yearId:yearId, name:name,start:startDate, end:endDate, id:id||null}).then((response)=>{
            return response.data
        });
    }
    static removeSpecialWorkDay(schoolId, yearId, id){
        return this.post("/api/removeSpecialWorkDay", {schoolId:schoolId, yearId:yearId, id:id}).then((response)=>{
            return response.data
        });
    }
    static createCourse(courseName, studentLimit, minutesLesson, minTeachingDay, coursePricePerLesson, labels, locationId, paymentPeriod, courseId, currency,courseStatus){
        return this.post("/api/createCourse",{
            courseId: courseId || null, name:courseName, studentLimit:studentLimit,minutesLesson:minutesLesson, minTeachingDay:minTeachingDay, coursePricePerLesson:coursePricePerLesson, labels:labels, paymentPeriod:paymentPeriod, locationId:locationId, currency:currency, status:courseStatus}).then((response)=>{
                return response.data
        });
    }
    static removeCourse(courseId){
        return this.post("/api/removeCourse",{id:courseId}).then((response)=>{
            return response.data
        });
    }
    static getNotifications(){
        return this.get(`/api/getNotifications`).then((response)=>{
            return response.data
        });
    }

    static readNotification(notificationId){
        return this.get(`/api/readNotification/${notificationId}`).then((response)=>{
            return response.data
        });
    }
    static getMessages=()=>{
        return this.get(`/api/getMessages`).then((response)=>{
            return response.data
        })
    }
    static sendMessage=(Id,message, childId, teacherId)=>{
        return this.post(`/api/sendMessage`, {Id:Id, message:message, childId:childId, teacherId:teacherId}).then((response)=>{
            return response.data
        })
    }
    static getMessageInfo=(Id)=>{
        return this.get(`/api/getMessageInfo/${Id}/${null}`).then((response)=>{
            return response.data
        })
    }

    static searchLabel=(keyword)=>{
        return this.post("/api/searchLabel", {keyword:keyword || null}).then((response)=>{
            return response.data
        });
    }

    static createLabel=(keyword)=>{
        return this.post("/api/createLabel", {keyword:keyword}).then((response)=>{
            return response.data
        });
    }

    static searchCourse=(teacher_email, courseName, keywords, min_lesson, min_t_days, course_price, country, zip, city, street, number, sortData, perPage, counter)=>{
        return this.post(`/api/searchCourse?perPage=${perPage||10}&page=${counter||1}`, {teacher_email:teacher_email,
            name:courseName, keywords:keywords, min_lesson:min_lesson, min_t_days:min_t_days, course_price:course_price,
            country:country, zip:zip, city:city, street:street, number:number, sortData:sortData, perPage:perPage, counter:counter}).then((response)=>{
            return response.data
        });
    }

    static getChildRequests=(childId)=>{
        return this.get(`/api/getChildRequests/${childId}`).then((response)=>{
            return response.data
        })
    }

    static getMessageControl=(childId, requestId)=>{
        return this.get(`/api/getMessageControl/${childId}/${requestId}`).then((response)=> {
            return response.data
        })
    }
    static createChild=(fname, lname, username,birthday,password)=>{
        return this.post(`/api/createChild`, {fname:fname, lname:lname, username:username, birthday:birthday, psw:password}).then((response)=> {
            return response.data
        })
    }
    static connectToChild=(username, password)=>{
        return this.post('/api/connectToChild', {username:username, psw:password}).then(response=>{
            return response.data
        })
    }
    static removeUserRole=(userId, roleId)=>{
        return this.post(`/api/removeUserRole/${userId}/${roleId}`).then((response)=>{
            return response.data
        })
    }
    static getUserRoles=(userId)=>{
        return this.post(`/api/getUserRoles/${userId}`).then((response)=>{
            return response.data
        })
    }
    static selectedUserData=(userId)=>{
        return this.get(`/api/selectedUserData/${userId}`).then((response)=>{
            return response.data;
        });
    }
    static detachChild=(childId)=>{
        return this.get(`/api/detachChild/${childId}`).then(response=>{
            return response.data
        })
    }

}

export default ServiceClient