const express 		= require('express');
const mongoose 		= require('mongoose');
const bodyParser	= require('body-parser');
const validUrl		= require('valid-url');
const shortid		= require('shortid');
const dotenv		= require('dotenv');

const config		= require("./config/database");

const app = express();

// port number
const port = process.env.PORT || 3000;

let host = "https://sheltered-beyond-45384.herokuapp.com/";
dotenv.config(config.database);
var dbUrl = process.env.MONGOLAB_URI;

// set static folder
app.use(express.static('public'));

// to parse application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Connect to database
// mongoose.connect(config.database);
mongoose.connect(dbUrl);

// on connection
mongoose.connection.on('connected', () => {
	console.log(`Connected to database`);
});

// on error
mongoose.connection.on('error', (err) => {
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
	res.send(`HELP ME!`);
});

app.get('/new/:url(*)', function(req,res) {
	let url = req.params.url;
	let shortUrl = "";


	// check for valid url
	if (validUrl.isUri(url)) {
		// check for duplicates
		UserUrl.findOne({ original: url }, function(err, doc) {
			if(doc) {
					let alreadyShort = `${host}${doc._id}`;
				res.send({"original_url":url, "short_url": alreadyShort});
			} else {
				// create new entry
				let newUrl = new UserUrl({  original: url });

				// save the new link
				newUrl.save(function(err) {
					if (err) {
						console.log(err);
					}
				});

				shortUrl = `${host}${newUrl._id}`;

				res.send({"original_url":url, "short_url": shortUrl});
			}
		});
	
	} else {
		res.send({"error": "Enter a valid url. URL must be formated as follows: http(s)://(www.)domain.ext(/)(/path)"});
	}
});

// redirect user to original URL that was given
app.get('/:shortened_id', function(req, res) {
	let shortened_id = req.params.shortened_id;

	// ADD FIND SHORTURL FROM DATABASE
	UserUrl.findOne({ _id: shortened_id }, function(err, doc) {
	// REDIRECT TO ORIGINAL URL RELATED TO SHORTURL		
		if(doc) {
			res.redirect(doc.original);
		} else {
			res.redirect(`${host}`);
		}
	});
});

// catch all
app.get("/*", function(req, res) {
	res.redirect(`${host}`);
});


app.listen(port, function() {
	console.log(`App has started on port ${port}`);
});