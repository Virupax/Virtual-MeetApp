var shortid = require('shortid'); //This package is used to generate Unique Alphanumeric Ids

class Connection{
/*  Class Properties
    _ID;
    _name;
    _category;
    _subCategory;
    _detials;
    _dateAndTime;
    _loaction;    
*/
    //Single parameterized constructor to build Connection Object from raw data
    constructor(connectionObj){
        this._id = connectionObj.id || connectionObj._id || shortid.generate(); //Use existing ids for old objects or generate new id for new object
        this._name = connectionObj.name || connectionObj._name;
        this._category = connectionObj.category || connectionObj._category;
        this._subCategory = connectionObj.subCategory || connectionObj._subCategory;
        this._detials = connectionObj.detials || connectionObj._detials;
        this._dateAndTime =  connectionObj.dateAndTime || connectionObj._dateAndTime;
        this._location =  connectionObj.location || connectionObj._location;
    }

    //Getter and Setter for all of the class properties
    get id(){
        return this._id;
    }
    set id(value){
        this._id = value;
    }

    get name(){
        return this._name;
    }
    set name(value){
        this._name = value;
    }

    get subCategory(){
        return this._subCategory;
    }
    set subCategory(value){
        this._subCategory = value;
    }

    get category(){
        return this._category;
    }
    set category(value){
        this._category = value;
    }

    get detials(){
        return this._detials;
    }
    set detials(value){
        this._detials = value;
    }
    
    get dateAndTime(){
        return this._dateAndTime;
    }
    set dateAndTime(value){
        this._dateAndTime = new Date(value);
    }

    get location(){
        return this._dateAndTime;
    }
    set location(value){
        this._location = value;
    }

}

module.exports = Connection
