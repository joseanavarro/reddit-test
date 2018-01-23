/**
 * Utility to convert date format
 * 
 */
exports.getCreationDate = function (inputDate) {

    var newDate = new Date();
    newDate.setTime(inputDate * 1000);
    return dateString = newDate.toLocaleString();
}