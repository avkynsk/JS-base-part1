/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
    var newDate = new Date(date);
    
    return{
        add(number, type) {       

            if(isNaN(number) || number < 0){
                throw new TypeError('Передано неверное значение');
            }
            
            switch(type){
                case 'years':
                        newDate.setFullYear(newDate.getFullYear() + number);
                        break;
                case 'months':
                        newDate.setMonth(newDate.getMonth() + number);
                        break;
                case 'days':
                        newDate.setDate(newDate.getDate() + number);
                        break;
                case 'hours':
                        newDate.setHours(newDate.getHours() + number);
                        break;
                case 'minutes':
                        newDate.setMinutes(newDate.getMinutes() + number);
                        break;
                default:
                    throw new TypeError('Передано неверное значение');
            }

            return this;
        },

        subtract(number, type) {
            
            if(isNaN(number) || number < 0){
                throw new TypeError('Передано неверное значение');
            }

            switch(type){
                case 'years':
                        newDate.setFullYear(newDate.getFullYear() - number);
                        break;
                case 'months':
                        newDate.setMonth(newDate.getMonth() - number);
                        break;
                case 'days':
                        newDate.setDate(newDate.getDate() - number);
                        break;
                case 'hours':
                        newDate.setHours(newDate.getHours() - number);
                        break;
                case 'minutes':
                        newDate.setMinutes(newDate.getMinutes() - number);
                        break;
                default:
                    throw new TypeError('Передано неверное значение');
            }

            return this;
        },

        get value() {
            return newDate.getFullYear() + '-' + zero(newDate.getMonth() + 1) 
                 + '-' + zero(newDate.getDate()) + ' ' + zero(newDate.getHours())
                 + ':' + zero(newDate.getMinutes());
        }
    };
};

function zero(number) {
    if(number < 10){
        number = '0' + number;
    }
    return number;
};
