'use strict';

var express = require('express'),
		mongoose = require('mongoose'),
		bodyParser = require('body-parser'),
		bookRouter = require('./routers/book-router');

mongoose.connect('mongodb://localhost/bookAPI');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/books', bookRouter());

app.get('/', function(req, res){
	res.send('Welcome to Book API...');
});

app.listen(port, function(){
	console.log('Server is running on port ' + port);
});