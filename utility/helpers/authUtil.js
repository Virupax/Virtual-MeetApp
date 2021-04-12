'use strict';
var crypto = require('crypto');

/**
 * generates random string of characters
 * @function
 * @param {number} length - Length of the random string.
 */

var generateRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex') .slice(0,length);   
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); 
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function encryptPassword(userpassword) {
    var salt = generateRandomString(16); 
    var encryptedPassword = sha512(userpassword, salt);
    return encryptedPassword;
}

module.exports = {
    encryptPassword : encryptPassword,
    sha512 : sha512
}