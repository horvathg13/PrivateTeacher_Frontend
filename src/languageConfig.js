import ServiceClient from "./ServiceClient";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";

export const languageConfig=()=>{
    return new Promise((resolve,reject)=>{
        let language= localStorage.getItem('i18nextLng');
        ServiceClient.get(`/lang/${language}`)
            .then((response)=>{
                if(response.status===200) {
                     i18n
                        .use(LanguageDetector)
                        .use(initReactI18next)
                        .init({
                            debug:false,
                            resources: response.data,
                            react:{
                                useSuspense:true
                            },
                            initImmediate:false,
                            preload:true

                        })

                    resolve(true)
                }else{
                    reject(false)
                }

            })
    })

}

export const ChangeLanguage=(selected, prev)=>{
    ServiceClient.get(`/lang/${selected}`)
        .then((response)=>{
            if(response.status===200) {
                i18n.init({
                    resources:response.data
                })
                i18n.changeLanguage(Object.keys(response.data).toString())

            }

        })
    return true
}