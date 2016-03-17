var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var theSession = null

var pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'ideaflask',
    database : 'polling_app',
    debug    :  false
});

/* GET home page. */
router.get('/', function(req, res, next) {
	theSession = req.session;
	if(theSession.username) {
		pool.getConnection(function(error, connection) {
			if(error) {
				connection.release();
				console("Error while getting a connection");
				return;
			}

			var returnObject = {
				flag : 0,
				session: theSession,
				vote_flag: false
			};

			var query = "select * from votes where user_id = '" + theSession.user_id + "'";
			connection.query(query, function(err, rows) {
				connection.release();
				if(!err) {
					if(rows.length > 0) {
						returnObject.vote_flag = true;
						res.render('home', returnObject);
					} else {
						returnObject.vote_flag = false;
						res.render('home', returnObject);
					}
				}
			});
		    connection.on('error', function(err) {
				res.json({"code" : 100, "status" : "Error in connection database"});
				return;
		    });
		});
	} else {
		res.redirect('/');		
	}
});

module.exports = router;
