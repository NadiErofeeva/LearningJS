"use strict";

const arr = ['524', '2854', '7', '444', '356', '24', '95'];

for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === '2' || arr[i][0] === '4') {
        console.log(arr[i]);
    }
}




let sieve = [];
let primes = [];

for (let i = 2; i <= 100; ++i) {
    if (!sieve[i]) {
        primes.push(i);
        for (let j = i << 1; j <= 100; j += i) {
            sieve[j] = true;
        }
    }
}

for(let i = 2; i < 100; ++i) {
    let count = 0;
    for(let j = 2; j <= i && count < 2; ++j){
        if(i % j === 0){
            ++count;
        }
    }

    if(count < 2) {
        console.log('Делители числа ' + i + ':' + ' число 1 и число ' + i);
    }
}


