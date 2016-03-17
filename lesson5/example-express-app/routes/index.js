var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var dataSend = {
		'title': 'Express',
		'name': 'Siddharth',
		'object': {
			'objname': 'objvalues'
		}
	};
  	res.render('index', dataSend);
});

module.exports = router;
