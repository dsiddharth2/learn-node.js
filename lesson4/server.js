// Lesson 4:
// Learnt how to set up tern for sublime
// And created a basic server using node
// npm install tern-node-express
// npm install tern-node-extension

var http = require("http");

var server = http.createServer(function(request, response){
	response.setHeader('Content-Type', 'text/plain');
	response.statusCode = 200;
	response.write("Welcome to my page ..!!");
	response.end();
});
server.listen(8888);
console.log("Server Listening on Post 8888...");
console.log("Try : http://localhost:8888");
