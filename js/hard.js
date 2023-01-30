"use strict";
/*
let num = 266219; // Создать переменную num со значением 266219

const arr = Array.from(String(num), Number);
let result = arr.reduce((acc, rec) => acc * rec);
console.log(result); // Вывести в консоль произведение (умножение) цифр этого числа

result **= 3; // Полученный результат возвести в степень 3
console.log(result);

console.log(String(result).slice(0,2)); // Вывести в консоль первые 2 цифры полученного числа

*/


let lang = 'ru';
const weekdayRu = 'Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье';
const weekdayEn = 'Monday, Tuesday, Wednesday, Thursday, Saturday, Sunday';

const weekday = {
    'ru': weekdayRu,
    'en': weekdayEn
};

if (lang === 'ru') {
    console.log(weekdayRu);
} else if (lang === 'en') {
    console.log(weekdayEn);
} else {
    console.log('Нет значений');
}

switch (lang) {
    case 'ru':
        console.log(weekdayRu);
        break;
    case 'en':
        console.log(weekdayEn);
        break;
    default:
        console.log('Нет значений');
}

console.log(weekday[lang] || 'Нет значений');

/// Задание 2

let namePerson = 'Артем';

const result = namePerson === 'Артем' ?
    console.log('Директор') :
    namePerson === 'Александр' ?
        console.log('Преподаватель') :
        console.log('Студент');