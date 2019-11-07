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
            let keys = Object.keys(copyCollection[0]);
            let arrSelect = intersectCollection(command[1], keys);

            if(selectcall == 0){
                selections = arrSelect;
            } else {
                selections = intersectCollection(selections, arrSelect);
            }
            
            selectcall++;
        } else if(command[0] === 'filterIn') {
            let arrFilter = command[2];
            for(let key in filters){
                if(key == command[1]){
                    arrFilter = intersectCollection(filters[key], command[2]);
                    break;
                }
            }
            Object.defineProperty(filters, command[1], {
                writable: true,
                enumerable: true,
                configurable: true,                    
                value: arrFilter
            });
            
        }
    });

    if(selections.length == 0){
        for(let i = 0; i < Object.keys(copyCollection[0]).length; i++){
            selections.push(Object.keys(copyCollection[0])[i]);
        }
    }

    for(let key in filters){
        if(filters[key].length == 0){
            delete filters[key]
        }
    }
    

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

function intersectCollection(arr1, arr2){
    let result = [];

    arr1.forEach(function(element1){
        arr2.forEach(function(element2) {
           if(element1 === element2) {
               result.push(element2);
           }
        });
    });

    return result;
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
