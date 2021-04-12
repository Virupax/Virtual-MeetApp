var shortid = require('shortid'); //This package is used to generate Unique Alphanumeric Ids
var Connection = require("./connection");

class userConnection{
/*  Class Properties
    _ID;
    _connection;
    _rspv
    _dateAndTime
*/
    //Single parameterized constructor to build Connection Object from raw data
    constructor(connectionID, userID, rsvp){
        this._id = shortid.generate(); //generate new id for new object
        this._connectionID = connectionID;
        this._userID = userID;
        this._rsvp = rsvp;
        this._dateAndTime =  new Date();
    }

    //Getter and Setter for all of the class properties
    get id(){
        return this._id;
    }
    set id(value){
        this._id = value;
    }

    get connectionID(){
        return this._connectionID;
    }
    set connectionID(value){
        this._connectionID = value;
    }

    get userID(){
        return this._userID;
    }
    set userID(value){
        this._userID = value;
    }

    get rsvp(){
        return this._rsvp;
    }
    set rsvp(value){
        this._rsvp = value;
    }

    get dateAndTime(){
        return this._dateAndTime;
    }
    set dateAndTime(value){
        this._dateAndTime = value;
    }

}

module.exports = userConnection
