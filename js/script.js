'use strict';

let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 20;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;


const isNumber = function (num) {
    return !isNaN(num) && isFinite(num) && num !== null;
};

const asking = function () {
    title = prompt('Как называется ваш проект?', 'Проект');
    screens = prompt('Какие типы экранов нужно разработать?', 'много, сложно');

    /* screenPrice = +prompt('Сколько будет стоить данная работа?');

     while (!isNumber(screenPrice)) {
         screenPrice = prompt('Сколько будет стоить данная работа?');
     }*/

    do {
        screenPrice = parseFloat(prompt('Сколько будет стоить данная работа?').trim());
    } while (!isNumber(screenPrice));

    adaptive = confirm('Нужен ли адаптив на сайте?');
};


const getAllServicePrices = function () {
    let sum = 0;

    for(let i = 0; i < 2; i++) {

        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?', 'первый');
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?', 'Второй');
        }



        /*while (!isNumber(sum)) {
            sum += parseFloat(prompt('Сколько это будет стоить?').trim());
        }*/

        let x;
        do {
            x = parseFloat(prompt('Сколько это будет стоить?').trim());
        } while (!isNumber(x));
        sum += x;

    }
    return sum;
    // return servicePrice1 + servicePrice2;
};


const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
    if (price >= 30000) {
        return 'Даем скидку в 10%';
    } else if (price >= 15000 && price < 30000) {
        return 'Даем скидку в 5%';
    } else if (price< 15000 && price > 0) {
        return 'Скидка не предусмотрена';
    } else {
        console.log('Что то пошло не так');
    }
};


function getFullPrice() {
    return screenPrice + allServicePrices;
}


const getTitle = function () {
    return title.trim()[0].toUpperCase() + title.trim().substring(1).toLowerCase();
};


const getServicePercentPrices = function () {
    return getFullPrice() - (getFullPrice() * (rollback / 100));
};



asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log('allServicePrices', allServicePrices);

console.log(getRollbackMessage(fullPrice));

console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);

console.log('вывод строки с типами экранов ', screens.length);
console.log('сообщение о скидке пользователю ', getRollbackMessage(fullPrice));
console.log('стоимость за вычетом процента отката посреднику ', servicePercentPrice);
console.log('стоимость верстки экранов ' + screenPrice + ' рублей и Стоимость разработки сайта ' + fullPrice);

