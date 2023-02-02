'use strict';

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = +prompt('Сколько будет стоить данная работа?');
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');
const rollback = 20;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.round(fullPrice - (fullPrice * (rollback / 100)));

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


const getAllServicePrices = function () {
    return servicePrice1 + servicePrice2;
};
const allServicePrices = getAllServicePrices();


function getFullPrice() {
    return screenPrice + allServicePrices;
}
fullPrice = getFullPrice();


const getTitle = function () {
    const newTitle = title.trim().toLowerCase();
    return newTitle[0].toUpperCase() + newTitle.substring(1);
};


const getServicePercentPrices = function () {
    return getFullPrice() - (getFullPrice() * (rollback / 100));
};

servicePercentPrice = getServicePercentPrices();



showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log('вывод строки с типами экранов ', screens);
console.log('сообщение о скидке пользователю ', getRollbackMessage(fullPrice));
console.log('стоимость за вычетом процента отката посреднику ', servicePercentPrice);