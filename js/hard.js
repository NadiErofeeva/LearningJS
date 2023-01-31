"use strict";

const nameCheck = function (name) {
    if (typeof name !== 'string') {
        return 'в качестве аргумента передана не строка';
    } else {
        let trimName = name.trim();
        let nameSlice = trimName.slice(0, 30);
        if(nameSlice.length < trimName.length) {
            nameSlice += '...';
            return nameSlice;
        }
        return trimName;
    }
};

console.log(nameCheck('  Идейные соображения высшего порядка, а также консультация'));