'use strict';

var permitGetParams = require('../permit'),
		Http = require('../const').Http;

var bookController = function(Book) {

	var getAll = function(req, res){
		var query = permitGetParams(req, ['title', 'genre', 'author', 'read']);
		Book.find(query, function(err, books){
			if(err) {
				res.status(Http.INTERNAL_SERVER_ERROR).send(err);
			} else if(books) {
				res.json(books);
			}
		});
	};

	var get = function(req, res){
		res.json(req.book);
	};


	var post = function(req, res){
		var book = new Book(req.body);

		if(!req.body.title) {
			res.status(Http.BAD_REQUEST);
			res.send({
				status: Http.BAD_REQUEST,
				error: {
					title: 'Title is required.'
				}
			});
		} else {
			book.save();
			res.status(Http.CREATED);
			res.send(book);
		}

	};

	var saveBook = function (req, res){
		if(req.body.id) {
			delete req.body.id;
		}
		for(var attr in req.body){
			req.book[attr] = req.body[attr];
		}
		req.book.save(function(err){
			if(err) {
				res.status(Http.INTERNAL_SERVER_ERROR).send(err);
			} else {
				res.json(req.book);
			}
		});
	};
	
	var put = function(req, res){
		saveBook(req, res);
	};

	var patch = function(req, res){
		saveBook(req, res);
	};

	var deleteItem = function(req, res){
			req.book.remove(function(err){
				if(err) {
					res.status(Http.INTERNAL_SERVER_ERROR).send(err);
				} else {
					res.status(Http.NO_CONTENT).send('Book removed!!!');
				}
		});
	};

	var middleware = function(req, res, next){
		Book.findById(req.params.bookId, function(err, book){
			if(err) {
				res.status(Http.INTERNAL_SERVER_ERROR).send(err);
			} else if(book) {
					req.book = book;
					next();
			} else {
				return res.status(Http.NOT_FOUND).send('Book not found!!!');
			}
		});
	};
	
	return {
		getAll: getAll,
		get: get,
		post: post,
		put: put,
		patch: patch,
		deleteItem: deleteItem,
		middleware: middleware
	};
};

module.exports = bookController;