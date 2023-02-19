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
    init: function() {
        this.addTitle();
        handlerBtnStart.addEventListener('click', this.start.bind(this));
        handlerBtnReset.addEventListener('click', this.reset.bind(this));
        screenBtn.addEventListener('click', this.addScreenBlock.bind(this));
        document.querySelector('.screen select')
            .addEventListener('change', this.checkedScreenBlockSelects.bind(this));
        document.querySelector('.screen input')
            .addEventListener('input', this.checkedScreenBlockSelects.bind(this));

        rollbackInputRange.addEventListener('input', this.rollbackItem.bind(this));
        this.checkedScreenBlockSelects.bind(this);

    },

    addTitle: function (){
        document.title = titleCalculator;
    },

    start: function() {
        this.addScreens();
        this.addServices();
        this.addPrice();
        this.showResult();
        this.blockScreen();
        this.deleteBlockScreen();
        /*

        appData.logger();*/

    },

    reset: function () {
        this.resetMainControls();
        this.resetBlockScreen();
        this.resetInputAll();
    },


    blockScreen: function (disabled = true) {
        document.querySelectorAll('.screen input[type="text"]')
            .forEach((e) => {
                e.disabled = disabled;
            });
        document.querySelectorAll('.screen select')
            .forEach((e) => {
                e.disabled = disabled;
            });
    },

    deleteBlockScreen: function () {
        document.getElementById('start').style.display = 'none';
        document.getElementById('reset').style.display = 'block';
    },


    resetMainControls: function () {
        this.blockScreen(false);
    },

    resetBlockScreen: function () {
        document.getElementById('start').style.display = 'block';
        document.getElementById('reset').style.display = 'none';
    },

    resetInputAll: function () {
        document.querySelectorAll('.screen input[type="text"]')
            .forEach((e) => {
            e.value = '';
        });
        document.querySelectorAll('.screen select')
            .forEach((e) => {
            e.value = '';
        });

        this.screens.splice(1, this.screens.length - 1);

        let i = 0;
        document.querySelectorAll('.screen')
            .forEach((e) => {
                if (i !== 0) {
                    e.remove();
                }
                i++;
            });
        document.querySelectorAll('.element input[type=checkbox]').forEach((e) => {
            e.checked = false;
        });


        rollbackRangevalue.textContent = 0 + '%';


        total.value = 0;
        totalCount.value = 0;
        totalCountOther.value = 0;
        fullTotalCount.value = 0;
        totalCountRollback.value = 0;

    },

    rollbackItem: function() {
        this.rollback = rollbackInputRange.value;
        rollbackRangevalue.textContent = this.rollback + '%';

    },

    showResult: function() {
        total.value = this.screenPrice;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.fullPrice;
    },

    addScreens: function() {
        let blocksScreen = document.querySelectorAll('.screen');
        this.screens = [];
        blocksScreen.forEach( (screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            this.screens.push({
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

    addServices: function() {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if(check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
                console.log(this.servicesPercent);
            }

        });

        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if(check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
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
            .addEventListener('input', this.checkedScreenBlockSelects);
        blocksScreen[blocksScreen.length - 1]
            .querySelector('select')
            .addEventListener('change', this.checkedScreenBlockSelects);

        this.checkedScreenBlockSelects();


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


    addPrice: function() {
        this.screenPrice = 0;
        for (let screen of this.screens) {
            this.screenPrice += +screen.price;
        }

        this.servicePricesNumber = 0;
        for(let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }

        this.servicePricesPercent = 0;
        for(let key in this.servicesPercent) {
            this.servicePricesPercent += (this.screenPrice * (this.servicesPercent[key] / 100));
        }

        this.fullPrice =  +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

        console.log(this.rollback);
        totalCountRollback.value = this.fullPrice - (this.fullPrice * (this.rollback / 100));

        let totalCountResult = 0;
        this.screens.forEach((e) => {
            console.log(e.count);
            totalCountResult += Number(e.count);
        });
        totalCount.value = totalCountResult;

    },


    logger: function () {

        console.log(this.fullPrice);
        console.log(this.servicePercentPrice);
        console.log(this.screens);

        console.log(this.services);
    },
};

appData.init();
