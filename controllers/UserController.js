const express = require('express');
const { check, validationResult } = require('express-validator');
const Connection = require('../models/connection');
const UserConnection = require('../models/userConnection');
const UserProfile = require('../models/userProfile');
const User = require('../models/user');
const UserRepositoryUtil = require('../utility/UserDB');
const userProfileRepositoryUtil = require('../utility/UserProfileDB');
const ERRORMESSAGES = { REQUIRED : 'is required' ,APLHANUMERIC : 'must be alphanumeric with spaces', MINIMUM : 'should have minimum 3 Characters' }

var router = express.Router();

router.get('/login', function(request, response){
	if(request.session.userSession === undefined){
		response.render('login');
	}else{
		response.redirect('/savedConnections'); // If session availble redirect to dashboard
	}
});

router.get('/logout', function(request, response){
	request.session.destroy();	//Destroy session object and redirect to home
	response.redirect('/');
});

router.post('/login', 
	[
		check('email')
		.not().isEmpty().withMessage('Username is required')
		.bail()
		.isEmail().normalizeEmail().withMessage('Username must be a email'),
		check('password')
		.isLength({ min: 5 }).withMessage('Password must be minimum 5 characters')
	] ,async function(request, response){
	
	let errors = validationResult(request);
	if (!errors.isEmpty()) {
		return response.render( 'login', { errors: errors.array() });
	}else{
		//Validate user
		var user = await UserRepositoryUtil.getUser(request.body.email, request.body.password);
		if(user instanceof User){
			//Create new user profile object
			var userProfile = new UserProfile({ user : user});
			userProfile._userConnections = await userProfile.getUserConnections();

			//Set User Session
			request.session.userSession = userProfile;
			response.redirect('/savedConnections');
		}else{
			errors.errors.push({ msg : user});
			return response.render( 'login', { errors: errors.array() });
		}

	}
});

//Both GET and POST for savedConnections will be handled here
//validates userSession and processes requested operation
router.all('/savedConnections',
[
	check('connectionID')
	.exists()
	.bail()
	.escape().trim(),

	check('rsvp')
	.exists()
	.bail()
	.isIn(['Join','☆'])

],
async function(request, response){
	if(request.session.userSession){
	
		var userProfile = new UserProfile({ user : request.session.userSession._user});
	
		if(request.method === "POST"){
			const errors = validationResult(request);
			if (errors.isEmpty()) {
				var userConnection = new UserConnection(request.body.connectionID, userProfile.user._id , request.body.rsvp);
				switch(request.body._method){
					case "POST" :	await userProfile.addConnection(userConnection);
									break;
					case "PUT"	:	await userProfile.updateConnection(userConnection);
									break;
					case "DELETE" : await userProfile.removeConnection(userConnection);
									break;
				}
				request.session.userSession = userProfile;	//Update session
			}
		}
		userProfile._userConnections = await userProfile.getUserConnections();
		response.render('savedConnections', { userSession : userProfile });	
	}else{
		response.redirect('/login');
	}
});


//Get Route for create new connection page which requires login 
router.get('/newConnection', async function(request, response){
	if(request.session.userSession){
		response.render('newConnection', { userSession : request.session.userSession }); //userSession variable used to change header and navigation options
	}else{
		response.redirect('/login');
	}
});

//Post Route for create new connection which also signs up the creator by default
router.post('/newConnection',
	[ 
		check('category')
		.not().isEmpty().withMessage(ERRORMESSAGES.REQUIRED)
		.bail()
		.matches(/^[\w\-\s]+$/).withMessage(ERRORMESSAGES.APLHANUMERIC),
		
		check('subCategory')
		.not().isEmpty().withMessage(ERRORMESSAGES.REQUIRED)
		.bail()
		.matches(/^[\w\-\s]+$/).withMessage(ERRORMESSAGES.APLHANUMERIC),

		check('name')
		.isLength({ min: 3, max: 255 }).withMessage(ERRORMESSAGES.MINIMUM)
		.bail()
		.matches(/^[\w\-\s]+$/).withMessage(ERRORMESSAGES.APLHANUMERIC),

		check('detail')
		.isLength({ min: 3, max: 255 }).withMessage(ERRORMESSAGES.MINIMUM)
		.bail()
		.matches(/^[\w\-\s]+$/).withMessage(ERRORMESSAGES.APLHANUMERIC),

		check('location')
		.isLength({ min: 3, max: 255 }).withMessage(ERRORMESSAGES.MINIMUM)
		.bail()
		.matches(/^[\w\-\s]+$/).withMessage(ERRORMESSAGES.APLHANUMERIC),

		check('dateAndTime')
		.not().isEmpty().withMessage(ERRORMESSAGES.REQUIRED)
		.bail()
		.isISO8601().toDate()		
		.custom((value) => {
			if(value){
				let now = new Date();
				if (value.getTime() < now.getTime()) {
					throw new Error('Deadline cannot be today or past date');
				}else if(parseInt((value.getTime() - now.getTime())/(24*3600*1000)) <= 0){
					throw new Error('Minimum of 24 hours gap is required before deadline');
				}	
			}
			return true;
		})


	],
	async function(request, response){
	if(request.session.userSession){
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.render( 'newConnection', { errors: errors.array() });
		}else{
			var connection = new Connection(request.body);
			await userProfileRepositoryUtil.addConnection(connection);
			await userProfileRepositoryUtil.addRSVP(new UserConnection(connection._id, request.session.userSession._user._id, "Join"));		
			response.redirect('/savedConnections');	
		}
	}else{
		response.redirect('/login');
	}
});


module.exports = router //Export the router to use in app.js