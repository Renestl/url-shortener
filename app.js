const express 		= require('express');
const mongoose 		= require('mongoose');
const validUrl		= require('valid-url');
const shortid		= require('shortid');

const app = express();

// port number
const port = 3000;

// set static folder
app.use(express.static('public'));

// index route
app.get('/', function(req, res) {
	// serve up homepage(index.html)
	res.send('Help');
});

// post url route
app.post('/new/shorten', function(req, res) {

});

// redirect user to original URL that was given
app.get('/:shortened_id', function(req, res) {

});



app.listen(port, function() {
	console.log(`App has started on port ${port}`);
});