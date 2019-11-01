/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */

var phoneBook = []

//Добавляем
function add(name, phones){

    var phone = phones.split(',');
    var found = false;

    for(var i = 0; i < phoneBook.length; i++){
        if(phoneBook[i].name == name){
            for(var j = 0; j < phone.length; j++){
                phoneBook[i].phones.push(phone[j]);
            }
            found = true;
            break;
        }
    }

    if(!found){
        var contact = {};
        contact.name = name;
        contact.phones = phone;
        phoneBook.push(contact);
    }
    
}

//удаляем
function remove(phone){
    for(var i = 0; i < phoneBook.length; i++){
        var phoneCopy = phoneBook[i].phones.indexOf(phone);
        if(phoneCopy != -1){
            phoneBook[i].phones.splice(phoneCopy, 1);
            if(phoneBook[i].phones.length == 0){
                phoneBook.splice(i, 1);
            }
            return true;
        }
    }
    return false;
}

//выводим
function show(){
    var inBook = [];
    for(var i = 0; i < phoneBook.length; i++){
        inBook.push(phoneBook[i].name + ': ' + phoneBook[i].phones.join(', '));
    }
    //return inBook.length;
    inBook.sort();
    return inBook;
}

module.exports = function (command) {

    var keyword = command.split(' ')[0];

    switch(keyword){
        case 'ADD':
            var name = command.split(' ')[1];
            var phones = command.split(' ')[2];
            return add(name, phones);
        ;
        case 'REMOVE_PHONE':
                var phones = command.split(' ')[1];
            return remove(phones);
        ;
        case 'SHOW':
            return show();
        ;
    }
    
};
