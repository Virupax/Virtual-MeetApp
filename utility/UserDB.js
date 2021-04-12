const db = require("../database/database");
const User = require("../models/user");
const authUtil = require("../utility/helpers/authUtil");

//Method to Validate user upon login
let getUser = async function(email, password){
	try{
		return new Promise(function(resolve, reject) {
			db.collection('users')
			.findOne({ _emailAddress : email })
			.then(function(result){
			 	if(result && result._password === authUtil.sha512(password, result._salt).passwordHash){
					resolve( result? new User(result) : null);
				}else{
					resolve("Either username or password are incorrect. Please try again.");
				}
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
	getUser : getUser
}