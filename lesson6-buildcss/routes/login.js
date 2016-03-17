var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var theSession = null;

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'ideaflask',
    database : 'polling_app',
    debug    :  false
});

/* GET login page. */
router.post('/', function(req, res, next) {
	var username = req.body.txtUsername,
		password = req.body.txtPassword;
	theSession = req.session;
		
	pool.getConnection(function(err, connection){
	    if (err) {
	      connection.release();
	      return;
	    }
	    var query = "select * from login where username = '" + username + "' and password = '" + password + "'";
	    connection.query(query, function(err, rows){
	    	connection.release();
	        if(!err) {
				if(rows.length > 0) {
					var user_id = null;
					for (var i = 0; i < rows.length; i++) {
						user_id = rows[i].login_id;
					};					
					theSession.username = username;
					theSession.user_id = user_id;
					res.redirect('/home');
				} else {
					res.render('index', { flag: 1 });
				}
	        }
	    });

	    connection.on('error', function(err) {
			res.json({"code" : 100, "status" : "Error in connection database"});
			return;
	    });
	});
});
module.exports = router;