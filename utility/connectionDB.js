let db = require("../database/database");
let Connection = require("../models/connection");

//Get Method to read connections collection and return dump
let  getConnectionsDump = async function(){
	try{
		return new Promise(function(resolve, reject) {
			db.collection('connections')
			.find()
			.toArray()
			.then(function(result){
					resolve(result);
			})
			.catch(function(error){
				reject(error);
			});
		});
	}catch(err){	
		reject(err);
	}
}

//Get Method to read dump and process all connections data to render in view template
let getConnections = async function(){
	var connections = {};
	try{
		var data = await getConnectionsDump();
		for(item in data){
			if(connections[data[item]._category] === undefined){
				connections[data[item]._category] = {};
			}
			if(connections[data[item]._category][data[item]._subCategory] === undefined){
				connections[data[item]._category][data[item]._subCategory] = [];
			}
			connections[data[item]._category][data[item]._subCategory].push(new Connection(data[item]));
		}
		return connections;
	}catch(err){
		console.error(err);
	}
}

//Get Method to read dump and return connection object matching the request connectionID
let getConnection = async function(connectionID){
	try{
		return new Promise(function(resolve, reject) {
			db.collection('connections')
			.findOne({ _id : connectionID })
			.then(function(result){
				resolve( result? new Connection(result) : null);
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
	getConnection : getConnection,
	getConnections : getConnections
}