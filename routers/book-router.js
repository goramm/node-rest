'use strict';

var express = require('express'),
		Book = require('../models/Book'),
		bookController = require('../controllers/book-controller');


function bookRouter() {
	var router = express.Router();

	var controller = bookController(Book);

	router.route('/')
		.get(controller.getAll)
		.post(controller.post);

	router.use('/:bookId', controller.middleware);

	router.route('/:bookId')
		.get(controller.get)
		.put(controller.put)
		.patch(controller.patch)
		.delete(controller.deleteItem);

	return router;
}

module.exports = bookRouter;

