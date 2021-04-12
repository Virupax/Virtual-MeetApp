let db = require("../database/database");

//Get Service returns array of userConnection Objects matching userID
let getUserProfile = async function(userID){
	try{
		return new Promise(function(resolve, reject) {
			db.collection('userConnections')
            .find({ _userID : userID })
            .toArray()
			.then(function(result){
				resolve(result);
			})
			.catch(function(error){
				reject(error);
			});
		});		
	}catch(err){
		console.error(err);
	}
	return null;	
}

//Get Service to check if userConnection exists for connection & user
let getByConnectionAndUserId = async function(userConnection){
	try{
		return new Promise(function(resolve, reject) {
			db.collection('userConnections')
            .findOne({ _connectionID : userConnection.connectionID, _userID : userConnection.userID })
			.then(function(result){
				resolve(result);
			})
			.catch(function(error){
				reject(error);
			});
		});		
	}catch(err){
		console.error(err);
	}
	return null;	
}

//Service to Adds new userConnection in userConnections collection
let addRSVP = async function(userConnection){
	try{
		return new Promise(function(resolve, reject) {
			db.collection('userConnections')
            .insertOne(userConnection)
 			.then(function(result){
				resolve(result);
			})
			.catch(function(error){
				reject(error);
			});
		});		
	}catch(err){
		console.error(err);
	}
}

//Service Updates one existing entry of userConnection
let updateRSVP = async function(userConnection){
	try{
		return new Promise(function(resolve, reject) {
			db.collection('userConnections')
            .findOneAndUpdate({ _connectionID : userConnection.connectionID, _userID : userConnection.userID }, { $set : { _rsvp : userConnection.rsvp, _dateAndTime : userConnection._dateAndTime }})
 			.then(function(result){
				resolve(result);
			})
			.catch(function(error){
				reject(error);
			});
		});		
	}catch(err){
		console.error(err);
	}
}

//Service Deletes one matching userConnection
let deleteUserConnection = async function(userConnection){
	try{
		return new Promise(function(resolve, reject) {
			db.collection('userConnections')
            .findOneAndDelete({ _connectionID : userConnection.connectionID, _userID : userConnection.userID })
 			.then(function(result){
				resolve(result);
			})
			.catch(function(error){
				reject(error);
			});
		});		
	}catch(err){
		console.error(err);
	}
}

//Service Adds new connection from create new connection post
let addConnection = async function(connection){
	try{
		return new Promise(function(resolve, reject) {
			db.collection('connections')
			.insertOne(connection)
			.then( async function(result){
				resolve(result);
			})
			.catch(function(error){
				reject(error);
			});
		});		
	}catch(err){
		console.error(err);
	}
	return null;	
}

module.exports = {
	getUserProfile : getUserProfile,
	getByConnectionAndUserId : getByConnectionAndUserId,
	addRSVP : addRSVP,
	updateRSVP : updateRSVP,
	deleteUserConnection : deleteUserConnection,
	addConnection : addConnection

}