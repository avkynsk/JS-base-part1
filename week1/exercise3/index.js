/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */


module.exports = function (hours, minutes, interval) {
    Math.floor(minutes);
    Math.floor(interval);
    Math.floor(minutes);

    minutes = interval + minutes;

    do{
        if(minutes >= 60){
            minutes = minutes - 60;
            hours++;
            if(hours >=24){
                hours = 0;
            }
        }
    } while (minutes >= 60);


    if((0 <= minutes) && (minutes <=9)){
        minutes = '0' + minutes;
    }

    if((0 <= hours) && (hours <=9)){
        hours = '0' + hours;
    }

    return hours + ':' + minutes;
};
