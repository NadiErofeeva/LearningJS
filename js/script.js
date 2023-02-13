'use strict';

const titleCalculator = document.getElementsByTagName('h1')[0].textContent;

const handlerBtnStart = document.getElementsByClassName('handler_btn')[0];
const handlerBtnReset = document.getElementsByClassName('handler_btn')[1];

const screenBtn = document.querySelector('.screen-btn');

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const rollbackInputRange = document.querySelector('.rollback input[type="range"]');
const rollbackRangevalue = document.querySelector('.rollback span.range-value');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let blocksScreen = document.querySelectorAll('.screen');


const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    init: function () {
        appData.addTitle();
        handlerBtnStart.addEventListener('click', appData.start);
        screenBtn.addEventListener('click', appData.addScreenBlock);
        document.querySelector('.screen select').addEventListener('change', appData.checkedScreenBlockSelects);
        document.querySelector('.screen input').addEventListener('input', appData.checkedScreenBlockSelects);

        rollbackInputRange.addEventListener('input', appData.rollbackItem);
        appData.checkedScreenBlockSelects();
    },

    addTitle: function (){
        document.title = titleCalculator;
    },

    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrice();
        appData.showResult();
        /*

        appData.logger();*/

    },

    rollbackItem: function () {
        appData.rollback = rollbackInputRange.value;
        rollbackRangevalue.textContent = appData.rollback + '%';

    },

    showResult: function () {
        total.value = appData.screenPrice;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
    },

    addScreens: function () {
        let blocksScreen = document.querySelectorAll('.screen');
        appData.screens = [];
        blocksScreen.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            });

        });

    },
//delete
    isString: function (str) {
        return parseInt(str);
    },

    addServices: function () {
        otherItemsPercent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if(check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
                console.log(appData.servicesPercent);
            }

        });

        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if(check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }

        });

    },

    addScreenBlock: function() {
        let blocksScreen = document.querySelectorAll('.screen');
        const cloneScreen = blocksScreen[0].cloneNode(true);
        cloneScreen.querySelector('.main-controls__input input').value = '';
        blocksScreen[blocksScreen.length - 1].after(cloneScreen);

        blocksScreen = document.querySelectorAll('.screen');

        blocksScreen[blocksScreen.length - 1]
            .querySelector('input')
            .addEventListener('input', appData.checkedScreenBlockSelects);
        blocksScreen[blocksScreen.length - 1]
            .querySelector('select')
            .addEventListener('change', appData.checkedScreenBlockSelects);

        appData.checkedScreenBlockSelects();


    },

    checkedScreenBlockSelects: function () {
        let checkedSelect = document.querySelectorAll('.screen .main-controls__select select');
        let checkedInput = document.querySelectorAll('.screen .main-controls__input input');
        let blocked = false; // Заблокировать кнопку?
        checkedSelect.forEach((e) => {
            if (e.value === '') {
                console.log('Кнопка заблокирована');
                blocked = true;
            }
        });

        checkedInput.forEach((e) => {
            if (e.value === '') {
                console.log('Кнопка заблокирована');
                blocked = true;
            }
        });


        handlerBtnStart.disabled = blocked;
    },


    addPrice: function () {
        appData.screenPrice = 0;
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }

        appData.servicePricesNumber = 0;
        for(let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }

        appData.servicePricesPercent = 0;
        for(let key in appData.servicesPercent) {
            appData.servicePricesPercent += (appData.screenPrice * (appData.servicesPercent[key] / 100));
        }

        appData.fullPrice =  +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;

        totalCountRollback.value = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));

        let totalCountResult = 0;
        appData.screens.forEach((e) => {
            console.log(e.count);
            totalCountResult += Number(e.count);
        });
        totalCount.value = totalCountResult;

    },


    logger: function () {

        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);

        console.log(appData.services);
    },
};

appData.init();






