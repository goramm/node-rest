'use strict';

var should = require('should'),
		sinon = require('sinon'),
		bookController = require('../controllers/book-controller'),
		Http = require('../const').Http;


describe('Book Controller Tests', function() {
	describe('Post', function(){
		it('should not allow an empty title on post', function(){
			var Book = function(book){ this.save = function(){}};

			var req = {
				body: {
					author: 'Goran Milovanovic'
				}
			};

			var res = {
				status: sinon.spy(),
				send: sinon.spy()
			};

			var controller = bookController(Book);

			controller.post(req, res);

			res.status.calledWith(Http.BAD_REQUEST).should.equal(true, 'Bad status ' + res.status.args[0]);
			res.send.calledWith({
				status: Http.BAD_REQUEST,
				error: {
					title: 'Title is required.'
				}
			}).should.equal(true);
		});
	});
});