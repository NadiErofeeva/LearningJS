"use strict";

const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

const date = new Date();
const numberDay = date.getDay();


week.forEach(function (e) {

    let italicStart = '';
    let italicEnd = '';

    let boldStart = '';
    let boldEnd = '';

    if (e === 'Суббота' || e === 'Воскресенье') {
        italicStart = '<i>';
        italicEnd = '</i>';
    }

    if (e === week[numberDay]) {
        boldStart = '<b>';
        boldEnd  = '</b>';
    }

    document.body.innerHTML += `${italicStart}${boldStart}${e}${boldEnd}${italicEnd}<br>`;
});