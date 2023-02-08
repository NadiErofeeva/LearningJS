'use strict';


const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 20,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    service1: '',
    service2: '',


    asking: function () {
        appData.title = prompt('Как называется ваш проект?', 'Проект');
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'много, сложно');


        do {
            appData.screenPrice = parseFloat(prompt('Сколько будет стоить данная работа?').trim());
        } while (!this.isNumber(appData.screenPrice));

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },


    isNumber: function (num) {
        return !isNaN(num) && isFinite(num) && num !== null;
    },


    getAllServicePrices: function () {
        let sum = 0;

        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?', 'первый');
            } else if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?', 'Второй');
            }

            let x;
            do {
                x = parseFloat(prompt('Сколько это будет стоить?').trim());
            } while (!this.isNumber(x));
            sum += x;
        }
        return sum;
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

    getFullPrice() {
        return appData.screenPrice + appData.allServicePrices;
    },

    getTitle: function () {
        return appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
    },

    getServicePercentPrices: function () {
        return appData.getFullPrice() - (appData.getFullPrice() * (appData.rollback / 100));
    },

    start: function () {
        appData.asking();
        appData.logger();
    },

    logger: function () {
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.title = appData.getTitle();

        for (let key in appData) {
            console.log(key);
        }

    },


};


appData.start();






