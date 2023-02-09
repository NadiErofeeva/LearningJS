'use strict';

const titleCalculator = document.getElementsByTagName('h1')[0].textContent;
console.dir(titleCalculator);

const handlerBtnStart = document.getElementsByClassName('handler_btn')[0];
const handlerBtnReset = document.getElementsByClassName('handler_btn')[1];

console.dir(handlerBtnStart);
console.dir(handlerBtnReset);

const screenBtn = document.querySelector('.screen-btn');
console.dir(screenBtn);

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
console.dir(otherItemsPercent);
console.dir(otherItemsNumber);

const rollbackInputRange = document.querySelector('.rollback input[type="range"]');
console.dir(rollbackInputRange);

const rollbackRangevalue = document.querySelector('.rollback span.range-value');
console.dir(rollbackRangevalue);

const totalInput = document.getElementsByClassName('total-input');
const arrTotalInput = [];

for (let i = totalInput.length - 1; i >= 0; i--) {
    arrTotalInput.push(totalInput[i]);
}
console.log(arrTotalInput);

let blocksScreen = document.querySelectorAll('.screen');
console.log(blocksScreen);


const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {},

    start: function () {
        appData.asking();
        appData.addPrice();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();

        appData.logger();
    },

    isNumber: function (num) {
        return !isNaN(num) && isFinite(num) && num !== null;
    },

    isString: function (str) {
        return parseInt(str);
    },


    asking: function () {
        do {
            appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки').trim();
        } while (this.isString(appData.title));

        for (let i = 0; i < 2; i++) {
            let name = '';
            let price = 0;
            do {
                name = prompt('Какие типы экранов нужно разработать?', 'простые').trim();
            } while (this.isString(name));

            do {
                price = parseFloat(prompt('Сколько будет стоить данная работа?', '10000').trim());
            } while (!this.isNumber(price));

            appData.screens.push({id: i, name: name, price: price});
        }

            for (let i = 0; i < 2; i++) {
                let name = '';
                let price = 0;

                do {
                    name = prompt('Какой дополнительный тип услуги нужен?', 'верстка').trim();
                } while (this.isString(name));

                do {
                    price = parseFloat(prompt('Сколько это будет стоить?', '1000').trim());
                } while (!this.isNumber(price));


                if (Object.keys(appData.services).indexOf(name) === -1) {
                    appData.services[name] = +price;
                } else {
                    appData.services[name + i] = +price;
                }
        }

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },

    addPrice: function () {
       /* for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }*/

        appData.screenPrice = appData.screens.reduce((acc, operation) => {
           return operation.price += +operation.price;
        }, 0);

        for(let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },

    getFullPrice: function () {
        appData.fullPrice =  +appData.screenPrice + appData.allServicePrices;
    },

    getServicePercentPrices: function () {
        appData.servicePercentPrice =  appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },

    getTitle: function () {
        appData.title =  appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
    },

    getRollbackMessage: function (price) {
        if (price >= 30000) {
            return 'Даем скидку в 10%';
        } else if (price >= 15000 && price < 30000) {
            return 'Даем скидку в 5%';
        } else if (price < 15000 && price > 0) {
            return 'Скидка не предусмотрена';
        } else {
            console.log('Что то пошло не так');
        }
    },

    logger: function () {

        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);

        console.log(appData.services);
    },
};

appData.start();






