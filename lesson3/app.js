// Lesson 3:
// What are modules?
// What is Object Literal and Object Instance ?
// How to use modules?
// How to share data between modules ?

var user = require('./user');

var siddharth = new user();
var vinayak = new user();

siddharth.addMessage("Hello Every one");
vinayak.addMessage("Hello Sid");
siddharth.printMessage();