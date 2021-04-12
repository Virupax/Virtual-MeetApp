var userConnection = require("./userConnection");
var User = require("./user");
var userProfileRepositoryUtil = require("../utility/UserProfileDB");
var conncetionRepositoryUtil = require("../utility/connectionDB");

class userProfile{
/*  Class Properties
    _user
    _userConnections;
*/
    //Single parameterized constructor to build UserProfile Object from raw data
    constructor(userProfileObj){
        this._user = userProfileObj.user || userProfileObj._user || {};
        this._userConnections = userProfileObj.userConnections || userProfileObj._userConnections ||  [];    
    }

    //Getter and Setter for all of the class properties
    get user(){
        return this._user;
    }
    set user(value){
        this._user = new User(value);
    }

    get userConnections(){
        return this._userConnections;
    }
    set userConnections(value){
        if(Array.isArray(value)){
            this._userConnections = value;
        }else{
            this._userConnections.push(value);
        }
    }

    //Methods to manage User Profiles
    async addConnection(newUserConnection){
        try{
            if(!await userProfileRepositoryUtil.getByConnectionAndUserId(newUserConnection)){
                await userProfileRepositoryUtil.addRSVP(newUserConnection);
            }else{
                await this.updateConnection(newUserConnection);
        }
        }catch(err){
            console.error(err);
        }
    }

    async updateConnection(userConnection){
        try{
            await userProfileRepositoryUtil.updateRSVP(userConnection);
        }catch(err){
            console.error(err);
        }
    }

    async removeConnection(userConnection){
        try{
            await userProfileRepositoryUtil.deleteUserConnection(userConnection);
        }catch(err){
            console.error(err);
        }
    }
    
    async getUserConnections(){
        try{
            var userConnections =  await userProfileRepositoryUtil.getUserProfile(this.user._id);
            for(var userConnection in userConnections){
                userConnections[userConnection]._connection = await conncetionRepositoryUtil.getConnection(userConnections[userConnection]._connectionID);
            }
            return userConnections;
        }catch(err){
            console.error(err);
        }
    }

}

module.exports = userProfile
