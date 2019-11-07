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
        filters = {},
        selectcall = 0;
    commads.forEach(function(command){
        if(command[0] === 'select'){
            for(let i = 0; i < command[1].length; i++){
                if(selectcall == 0){
                    selections.push(command[1][i]);
                    
                } else {
                    if(selectcall > 1){
                        let arr = [];
                        for(let j = 0; j < selections.length; j++){
                            if(command[1][i] == selections[j]){
                                arr.push(command[1][i]);
                                break;
                            }
                        }
                        selections = arr.slice();
                        break;
                    }
                }
            }
            selectcall++;
        } else if(command[0] === 'filterIn') {
            let keys = Object.keys(filters);
            if(keys.length == 0){
                Object.defineProperty(filters, command[1], {
                    writable: true,
                    enumerable: true,
                    configurable: true,
                    value: command[2]
                });
            } else {
            for(let i = 0; i < keys.length; i++){
                if(keys[i] == command[1]){
                    for(let j = 0; j < keys[i].length; j++){
                        let bool = false;
                        for(let p = 0; p < command[2].length; p++){
                            if(filters[keys[i]][j] === command[2][p]){
                                bool = true;
                                let arr = [];
                                arr.push(command[2][p]);
                                Object.defineProperty(filters, command[1], {
                                    writable: true,
                                    enumerable: true,
                                    configurable: true,
                                    value: arr
                                });
                                break;
                            }
                        }
                        if(bool == false){
                            Object.defineProperty(filters, command[1], {
                                writable: true,
                                enumerable: true,
                                configurable: true,
                                value: []
                            });
                            break;
                        } else {
                            break;
                        }
                    }
                } else {
                    Object.defineProperty(filters, command[1], {
                        writable: true,
                        enumerable: true,
                        configurable: true,
                        value: command[2]
                    });
                }
            }
            }
        }
    });



    //filter
    copyCollection.forEach(function(element){
        let keys = Object.keys(element);
        let keyFilter = Object.keys(filters);
        for(let i = 0; i < keys.length; i++){
            let bool = true;
            for(let j = 0; j < keyFilter.length; j++){
                if(keys[i] == keyFilter[j]){
                    bool = false;
                    for(let p = 0; p < filters[keyFilter[j]].length; p++){
                        if(filters[keyFilter[j]][p] === element[keys[i]]){
                            bool = true;
                        }
                    }
                }
            }
            if(bool == false){
                for(let i = 0; i < keys.length; i++){
                    delete element[keys[i]];
                }
                break;
            }
        }
    });

    //здесь select
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

    //удаляем пустые объекты
    let fixCollection = copyCollection;
    copyCollection = fixCollection.filter(function(element){
        let keys = Object.keys(element);
        if(keys.length == 0){
            return false;
        }
        return true;
    });

    return copyCollection;
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
