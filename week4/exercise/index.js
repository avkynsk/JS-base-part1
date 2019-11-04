/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    //делаем копию коллекции
    let copyCollection = doCopyCollection(collection);
}

/**
 * @params {String[]}
 */
function select() {

}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {

}

function doCopyCollection(arr){
    let newArray = arr.map(function(item){
        let newObject = {};
        let key = Object.keys(item);
        for(let i = 0; i < key.length; i++){
            newObject[key[i]] = item[key[i]];
        }
        return newObject;
    });
    return newArray;
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
