var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'ideaflask',
    database : 'polling_app',
    debug    :  false
});

router.post('/', function(req, res, next) {
	var vote_value = req.body.vote
		user = req.body.user,
		io = req.app.get('socketio');

	pool.getConnection(function(err, connection){
	    if (err) {
	      connection.release();
	      return;
	    }
	    
	    var query = "insert into votes values('', '" + user + "','" + vote_value + "')";
	    connection.query(query, function(err, rows){
	        if(!err) {
			    var query = "select (SELECT count(*) FROM `votes` WHERE `vote` = 'yes') as `yes_counts`, (SELECT count(*) FROM `votes` WHERE `vote` = 'no') as `no_counts`,(select count(*) from `votes`) as `total`";
			    connection.query(query, function(err, rows){
			      	connection.release();
					if(!err) {
							var send_data = {
							'yes': 0,
							'no' : 0,
							'total': 0
						};
						for (var i = 0; i < rows.length; i++) {
							send_data.yes = rows[i].yes_counts;
							send_data.no = rows[i].no_counts;
							send_data.total = rows[i].total;
						};
					  	io.emit('counts', send_data);
					}
			    });
				res.setHeader('Content-Type', 'application/json');
			    res.send(JSON.stringify({ 'status' : true }));
	        }
	    });

	    connection.on('error', function(err) {
			res.json({"code" : 100, "status" : "Error in connection database"});
			return;
	    });
	});
});

module.exports = router;
