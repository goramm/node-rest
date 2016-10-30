'use strict';

function permitGetParams(req, params){
	var query = {};
	params.forEach(function(param){
		if(req.query[param]){ 
			query[param] = req.query[param];
		}
	});
	return query;
}

module.exports = permitGetParams;