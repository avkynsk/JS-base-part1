/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    //делаем копию коллекции
    let copyCollection = doCopyCollection(collection);
    //проверка аргументов
    if(arguments[1] === undefined){
        return copyCollection;
    }
    //принимаеm команды
    let commads = [].slice.call(arguments, 1),
        selections = [],
        filters = {};
    commads.forEach(function(command){
        if(command[0] === 'select'){
            for(let i = 0; i < command[1].length; i++){
                selections.push(command[1][i]);
            }
        } else if(command[0] === 'filter') {
            //здесь принимаем аргументы filterIn
        }
    });

    copyCollection.forEach(function(element){
        let keys = Object.keys(element);
        for(let i = 0; i < keys.length; i++){
            let bool = false;
            for(let j = 0; j < selections.length; j++){
                if(keys[i] === selections[j]){
                    bool = true;
                }
            }
            if(bool == false){
                delete element[keys[i]];
            }
        }
    });

}

/**
 * @params {String[]}
 */
function select() {
    return ['select', [].slice.call(arguments)];
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return ['filterIn', property, values];
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
