import React, {useEffect, useLayoutEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import "../common.css";
import {useTranslation} from "react-i18next";
import allLocales from '@fullcalendar/core/locales-all';
import i18next from "i18next";
import {format, formatDate, formatISO, parse} from 'date-fns';
import SchoolYearDetails from "../../Schools/School/schoolYearDetails/schoolYearDetails";
import SchoolYearDetailsPopup from "../../Schools/School/schoolYearDetails/schoolYearDetailsPopup";
import TimeTablePopUp from "./timeTablePopUp";

const TimeTable = ({events,duration, min, max}) => {
    const {t}=useTranslation();
    /*const events = [
        { title: 'Event 1', start: '2024-07-03T10:00:00', end: '2024-06-30T12:00:00' },
        { title: 'Event 2', start: '2024-07-01T14:00:00', end: '2024-07-01T16:00:00' },
    ];*/

    const renderDayHeader = (arg) => {
        const dayNames = [t('enums.MONDAY'), t('enums.TUESDAY'), t('enums.WEDNESDAY'), t('enums.THURSDAY'), t('enums.FRIDAY'), t('enums.SATURDAY'), t('enums.SUNDAY')];
        return <div>{dayNames[arg.date.getUTCDay()]}</div>;
    };
    const languageCodeChanger=(locale)=>{
        switch(locale){
            case 'hu-HU': return 'hu'
            case 'en-GB': return 'en-gb'
            default: return 'hu'
        }
    }
    const [result,setResult] =useState([]);

    const dateManipulation=(date)=>{

        return date.map((item)=>{
            let manipulate=parse(`${item.day}`, 'EEEE', new Date());
            let year= parseInt(format(manipulate, 'yyyy'));
            let month= parseInt(format(manipulate, 'MM'));
            let day= parseInt(format(manipulate, 'dd'));
            const [startHour, startMinute, startSecond] = item.start.split(':');
            const [endHour, endMinute, endSecond] = item.end.split(':');

            let formattingStartTime=formatISO(new Date(year, month-1, day, startHour, startMinute, startSecond));
            let formattingEndTime=formatISO(new Date(year, month-1, day, endHour, endMinute, endSecond), );
            return {
                title: "Zongoraóra",
                start: formattingStartTime.split("+",1).toString(),
                end: formattingEndTime.split("+",1).toString(),
            };
        })
    }
    useLayoutEffect(() => {
        setResult(dateManipulation(events));
    }, [events]);


    return (
        <div>
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                events={result||null}
                eventClick={(eventClickInfo) => {
                    console.log('Event Title:', eventClickInfo.event.title);
                    console.log('Event Start:', eventClickInfo.event.start);
                    console.log('Event End:', eventClickInfo.event.end);
                    console.log('Event Extended Props:', eventClickInfo.event.extendedProps);
                }}
                select={(e)=> {
                    console.log(e);
                }}
                editable={true}
                selectable={true}
                slotDuration={duration||30}
                slotMinTime={min||8}
                slotMaxTime={max||16}
                headerToolbar={false}
                firstDay={1}
                showNonCurrentDates={false}
                dayHeaderContent={renderDayHeader}
                locales={allLocales}
                locale={languageCodeChanger(i18next.language)}
                height={"auto"}
            />
        </div>
    );
};

export default TimeTable;