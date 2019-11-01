/**
 * @param {Number} hours
 * @param {Number} minutes
 * @returns {Boolean}
 */
module.exports = function (hours, minutes) {
    if(((0 <= hours) && (hours <= 24)) && ((0 <= minutes) && (minutes <= 60))){
        return true;
    } else {
        return false;
    }
};
