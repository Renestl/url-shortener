const express 		= require('express');
const mongoose 		= require('mongoose');
const validUrl		= require('valid-url');
const shortid		= require('shortid');

const config		= require("./config/database");

const app = express();

// port number
const port = 3000;

// set static folder
app.use(express.static('public'));

// Connect to database
mongoose.connect(config.database);

// on connection
mongoose.connection.on('connected', () => {
	console.log(`Connected to database ${config.database}`);
});

// on error
mongoose.connection.on('error', () => {
	console.log(`Database error: ${err}`);
});




// index route
app.get('/', function(req, res) {
	// serve up homepage(index.html)
	res.send('HELP ME!');
});

app.get('/new/:url(*)', function(req,res) {
	let url = req.params.url;

	// check for valid url
	if (validUrl.isUri(url)) {
		res.send(url);
	} else {
		res.send('Enter a valid url.');
	}
});

// post url route
app.post('/new/shorten', function(req, res) {
	res.send('Shorten it');
});

// redirect user to original URL that was given
app.get('/:shortened_id', function(req, res) {
	res.send('Easter egg');	
});



app.listen(port, function() {
	console.log(`App has started on port ${port}`);
});