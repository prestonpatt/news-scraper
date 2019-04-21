var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// Initialize Express
var app = express();

//Set Middleware
// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

//Require routes
require("./routes/routes")(app);

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Set Handlebars.
app.engine('handlebars', exphbs({defaultLayout: 'main', extname: '.handlebars', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'handlebars');

// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local news-scraper database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news-scraper";

mongoose.connect(MONGODB_URI);


// Start the server
app.listen(PORT, function () {
    console.log("App running on http://localhost:" + PORT);
});