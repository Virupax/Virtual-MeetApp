var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var helmet =require('helmet');

var mainController = require('./controllers/MainController');
var connectionController = require('./controllers/ConnectionController');
var userController = require('./controllers/UserController');

var app = new express();

app.set('view engine', 'ejs')
app.use(helmet());
app.use('/assets', express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'secretKey', saveUninitialized: true, resave: true,}));

app.use('/', connectionController); //All the requests related to connections i.e connections, newConnection, etc. to be routed to connection router
app.use('/', mainController); //Remaining requests like index, about, contact etc. to be routed to index router 
app.use('/', userController); //User specific requests to login, logout, profile, add to connections, etc. to be routed to user controller

app.listen(8084,function(){
    console.log('Server started and listening at port 8084!!!');
});