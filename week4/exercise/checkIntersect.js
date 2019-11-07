// Встроенный в Node.JS модуль для проверок
var assert = require('assert');

// Подключаем свою функцию
var lib = require('./index.js');

var arr1 = [1, 2, 3];
var arr2 = [1, 3, 7];

var res = lib.intersectCollection(arr1, arr2);

assert.deepEqual(res, [1, 3]);