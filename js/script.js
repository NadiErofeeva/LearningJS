'use strict';


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
            appData.title = prompt('Как называется ваш проект?', 'Калькулятор').trim();
        } while (this.isString(appData.title));

        for (let i = 0; i < 2; i++) {
            let name = '';
            let price = 0;
            do {
                name = prompt('Какие типы экранов нужно разработать?').trim();
            } while (this.isString(name));

            do {
                price = parseFloat(prompt('Сколько будет стоить данная работа?').trim());
            } while (!this.isNumber(price));

            appData.screens.push({id: i, name: name, price: price});
        }

            for (let i = 0; i < 2; i++) {
                let name ='';
                let price = 0;

                do {
                    name = prompt('Какой дополнительный тип услуги нужен?').trim();
                } while (this.isString(name));

                do {
                    price = parseFloat(prompt('Сколько это будет стоить?').trim());
                } while (!this.isNumber(price));

            appData.services[name] = +price;
        }

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },

    addPrice: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }

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
    },
};

appData.start();






