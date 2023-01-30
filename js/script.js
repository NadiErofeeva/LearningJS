'use strict';
let title = 'LearningJS';
let screens = 'Простые, Сложные, Интерактивные';
let screenPrice = 10;
let rollback = 20;
let fullPrice = 10000;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log('Стоимость верстки экранов ' + screenPrice + ' рублей');
console.log('Стоимость разработки сайта ' + fullPrice + ' рублей');

screens = screens.toLowerCase();
console.log(screens.split(', '));
console.log('Процент отката посреднику за работу ' + (fullPrice * (rollback / 100)));


title = prompt('Как называется ваш проект?');

screens = prompt('Какие типы экранов нужно разработать?');

screenPrice = +prompt('Сколько будет стоить данная работа?');

adaptive = confirm('Нужен ли адаптив на сайте?');

const service1 = prompt('Какой дополнительный тип услуги нужен?');

const servicePrice1 = +prompt('Сколько это будет стоить?');

const service2 = prompt('Какой дополнительный тип услуги нужен?');

const servicePrice2 = +prompt('Сколько это будет стоить?');

fullPrice = screenPrice + servicePrice1 + servicePrice2;


const servicePercentPrice = Math.round(fullPrice - (fullPrice * (rollback / 100)));
console.log(servicePercentPrice);

if (fullPrice >= 30000) {
    console.log('Даем скидку в 10%');
} else if (fullPrice >= 15000 && fullPrice < 30000) {
    console.log('Даем скидку в 5%');
} else if (fullPrice < 15000 && fullPrice > 0) {
    console.log('Скидка не предусмотрена');
} else {
    console.log('Что то пошло не так');
}