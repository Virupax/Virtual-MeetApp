var express = require('express');

var router = express.Router();

router.get('/', function(request, response){
	response.render('index', {userSession : request.session.userSession });
});

router.get('/index', function(request, response){
	response.render('index', { userSession : request.session.userSession });
});

router.get('/about', function(request, response){
	response.render('about', { userSession : request.session.userSession });
});

router.get('/contact', function(request, response){
	response.render('contact', { userSession : request.session.userSession });
});

// router.get('/*', function(request, response){
// 	response.render('404');
// });

module.exports = router //Export the router to use in app.js