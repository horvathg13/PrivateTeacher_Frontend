import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import backend from "i18next-http-backend";
import i18next from "i18next";
import moment from "moment";
import 'moment/locale/hu';

const lng =localStorage.getItem('i18nextLng');
export const languageTransform=(lng)=>{
    switch (lng){
        case 'GB':return ['en-GB', moment.locale('en-GB')]
        case 'HU':return ['hu-HU', moment.locale('hu-HU')]
        case 'en-GB':return ['en-GB', moment.locale('en-GB')]
        case 'hu-HU':return ['hu-HU', moment.locale('hu-HU')]
        default: return ['hu-HU', moment.locale('hu-HU')]
    }
}
const ns = "translation"
i18next
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .use(backend)
    .init({
        debug:false,
        lng:lng,
        fallbackLng:'hu-HU',
        ns:"translation",
        backend: {
            loadPath:'/locales/{{lng}}/translation.json',
        },
        initImmediate:true,
    })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={"Loading..."}>
      <App />
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
