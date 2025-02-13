import React, {useContext, useEffect, useState} from 'react';
import EventHandler from "../EventHandler/eventhandler";
import {useLoaderData, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {ComponentTitleContext} from "../Context/UserContext";
import courseProfile from "../Course/courseProfile";

const StudentProfile = () => {

    /*DataLoader*/
    const childProfile=useLoaderData();

    /*Translation*/
    const {t}=useTranslation("translation",{keyPrefix:"child"});
    const {t:a}=useTranslation("translation",);

    /*Data*/
    const {setTitle,setBreadcrumbs}=useContext(ComponentTitleContext);
    const{courseId}=useParams();

    /*Event handle*/
    const [errors, setErrors]=useState([]);
    const [success, setSuccess]=useState(false);
    const [serverError, setServerError]=useState([]);
    const [active, setActive]=useState(false);

    /*Loader */
    const [loader, setLoader]=useState(true);

    useEffect(() => {
        if(childProfile){
            setLoader(false);
        }
    }, [childProfile]);

    useEffect(()=>{
        setBreadcrumbs([
            {
                "id":"1",
                "name":a('breadcrumbs.home'),
                "url":"/home",
                "icon":"IoIosArrowForward",

            },
            {
                "id":"2",
                "name":a('breadcrumbs.course'),
                "url":"/course/list",
                "icon":"IoIosArrowForward",
            },
            {
                "id":"3",
                "name":a('breadcrumbs.students'),
                "url":`/course/${courseId}/students`,
                "icon":"IoIosArrowForward",
                "end":true,
            },

        ])
    },[])
    return (
        <>
            <EventHandler
                success={success}
                errors={errors}
                serverError={serverError}
                closeErrorMessage={(data) => {
                    if (data === true) {
                        setErrors([]);
                    }
                }}
            />
            <div>
                {!loader ? (
                    <form className="FlexForm">
                        <div className="form-items">
                            <div className="form-title">
                                <h2>{t("title.parentInfos")}</h2>
                            </div>
                            {childProfile?.parent_info?.map((e, i) => (
                                <div key={i} className="form-collapse">
                                    <div className="form-children">
                                        <label>{t("form.name")}</label>
                                        <input
                                            type="text"
                                            readOnly
                                            value={e.first_name.concat(" ", e.last_name)}
                                        />
                                    </div>
                                    <div className="form-children">
                                        <label>{t("form.email")}</label>
                                        <input type="email" readOnly value={e.email} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="form-items">
                            <div className="form-title">
                                <h2>{t("title.childInfos")}</h2>
                            </div>
                            {childProfile.child_info ? (
                                <div className="form-collapse">
                                    <div className="form-children">
                                        <label>{t("form.name")}</label>
                                        <input
                                            type="text"
                                            readOnly
                                            value={childProfile?.child_info.first_name.concat(
                                                " ",
                                                childProfile?.child_info.last_name
                                            )}
                                        />
                                    </div>
                                    <div className="form-children">
                                        <label>{t("form.birthday")}</label>
                                        <input
                                            type="date"
                                            readOnly
                                            value={childProfile?.child_info.birthday}
                                        />
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <div className="form-items">
                            <div className="form-title">
                                <h2>{t('course-profile.titles.timetable')}</h2>
                            </div>
                            <div className="table-main-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>{t('course-profile.timetable.header.day')}</th>
                                            <th>{t('course-profile.timetable.header.from')}</th>
                                            <th>{t('course-profile.timetable.header.to')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {childProfile.teaching_days.length>0 ? childProfile.teaching_days.map((e,i) =>
                                        <tr key={i} className="disableSelection">
                                            <td>{a(`enums.${e.teaching_day}`)}</td>
                                            <td>{e.from.slice(0, 5)}</td>
                                            <td>{e.to.slice(0, 5)}</td>
                                        </tr>
                                    ):  <>
                                            <tr>
                                                <td colSpan={3} className="no-school">{a('empty-table')}</td>
                                            </tr>
                                        </>
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </form>
                ) : (
                    <span className="loader"></span>
                )}
            </div>
        </>

    );
};

export default StudentProfile;