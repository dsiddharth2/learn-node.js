// Lesson 2:
// Non blocking I/O is awesome.

/**
 * Function to Submit the papers to clerk
 * @param  {[type]} rollNo [description]
 * @return {[type]}        [description]
 */
function submitPapers(rollNo) {
	console.log("Accepted Paper Request of Roll No " + rollNo);
	processPpapers(function() {
		console.log("Processing Done for : " + rollNo);
	});
}

function processPpapers(callOnceDone) {
	setTimeout(callOnceDone, 5000);
}

submitPapers(1);
submitPapers(2);
submitPapers(3);
submitPapers(4);
submitPapers(5);