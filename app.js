const express 		= require('express');
const mongoose 		= require('mongoose');
const bodyParser	= require('body-parser');
const validUrl		= require('valid-url');
const shortid		= require('shortid');

const config		= require("./config/database");

const app = express();

// port number
const port = 3000;

// set static folder
app.use(express.static('public'));

// to parse application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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

// set up url schema
var userUrlSchema = mongoose.Schema({
	_id: { type: String, 'default': shortid.generate},
	original: String,
	created_at: {type: Date , default: Date.now }
});

var UserUrl = mongoose.model("UserUrl", userUrlSchema);

// index route
app.get('/', function(req, res) {
	// serve up homepage(index.html)
	res.send('HELP ME!');
});

app.get('/new/:url(*)', function(req,res) {
	let url = req.params.url;
	var shortUrl = "";

	// check for valid url
	if (validUrl.isUri(url)) {
		// check for duplicates
			// ADD THIS FUNCTIONALITY :D

		// create new entry
		let newUrl = new UserUrl({  original: url });

		// save the new link
		newUrl.save(function(err) {
			if (err) {
				console.log(err);
			}
		});

		shortUrl = `http://localhost:3000/${newUrl._id}`;

		res.send({"original_url":url, "short_url": shortUrl});
	} else {
		res.send({"error": "Enter a valid url. URL must be formated as follows: http(s)://(www.)domain.ext(/)(/path)"});
	}
});

// redirect user to original URL that was given
app.get('/:shortened_id', function(req, res) {
	// START HERE!!!
	// ADD FIND SHORTURL FROM DATABASE
	// REDIRECT TO ORIGINAL URL RELATED TO SHORTURL

	res.send({"original_url":url, "short_url": inserted});	
});


app.listen(port, function() {
	console.log(`App has started on port ${port}`);
});