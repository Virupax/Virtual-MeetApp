var shortid = require('shortid'); //This package is used to generate Unique Alphanumeric Ids

class User{
/*  Class Properties
    _id
    _firstName
    _lastName
    _emailAddress
    _password
    _salt
    _address1
    _address2
    _city
    _state
    _zipCode
    _country
*/
    //Single parameterized constructor to build User Object from raw data
    constructor(userObj){
        this._id = userObj.id || userObj._id || shortid.generate(); //Use existing ids for old objects or generate new id for new object
        this._firstName = userObj.firstName || userObj._firstName;
        this._lastName = userObj.lastName || userObj._lastName;
        this._emailAddress = userObj.emailAddress || userObj._emailAddress;
        this._password = userObj.password || userObj._password;
        this._salt = userObj.salt || userObj._salt;
        this._address1 = userObj.address1 || userObj._address1;
        this._address2 =  userObj.address2 || userObj._address2;
        this._city =  userObj.city || userObj._city;
        this._state =  userObj.state || userObj._state;
        this._zipCode =  userObj.zipCode || userObj._zipCode;
        this._country =  userObj.country || userObj._country;
    }

    //Getter and Setter for all of the class properties
    get id(){
        return this._id;
    }
    set id(value){
        this._id = value;
    }

    get firstName(){
        return this._firstName;
    }
    set firstName(value){
        this._firstName = value;
    }

    get lastName(){
        return this._lastName;
    }
    set lastName(value){
        this._lastName = value;
    }

    get emailAddress(){
        return this._emailAddress;
    }
    set emailAddress(value){
        this._emailAddress = value;
    }

    get password(){
        return this._password;
    }
    set password(value){
        this._password = value;
    }

    get salt(){
        return this._salt;
    }
    set salt(value){
        this._salt = value;
    }

    get address1(){
        return this._address1;
    }
    set address1(value){
        this._address1 = value;
    }

    get address2(){
        return this._address2;
    }
    set address2(value){
        this._address2 = value;
    }
    
    get city(){
        return this._city;
    }
    set city(value){
        this._city = value;
    }

    get state(){
        return this._state;
    }
    set state(value){
        this._state = value;
    }

    get zipCode(){
        return this._zipCode;
    }
    set zipCode(value){
        this._zipCode = value;
    }

    get country(){
        return this._country;
    }
    set country(value){
        this._country = value;
    }

}

module.exports = User
