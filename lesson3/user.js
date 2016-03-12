var _message = [];

var user = function() {
	this.addMessage = function(message) {
		_message.push(message);
	};

	this.printMessage = function() {
		console.log(_message);
	}
};

module.exports = user;