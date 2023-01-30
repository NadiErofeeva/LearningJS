let num = 266219; // Создать переменную num со значением 266219

const arr = Array.from(String(num), Number);
let result = arr.reduce((acc, rec) => acc * rec);
console.log(result); // Вывести в консоль произведение (умножение) цифр этого числа

result **= 3; // Полученный результат возвести в степень 3
console.log(result);

console.log(String(result).slice(0,2)); // Вывести в консоль первые 2 цифры полученного числа

