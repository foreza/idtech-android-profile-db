//Miles Bonner 06/02/2017

var express = require('express');
var app = express();
var bodayParser = require('body-parser');
var mongoose = require('mongoose');

// connect to Mongo DB here
// TODO: Set ENV variables, and allow mongo to fail gracefully
mongoose.connect('localhost/android-profile-db');

var Device = require("./app/models/devices");
var Profile = require("./app/models/devices");

// Configuring boday parser
app.use(bodayParser.urlencoded({ extended: true}));
app.use(bodayParser.json());


// Port for server is set here
var port = process.env.PORT || 8080;

// Routes start here
// ======================

// defining route for devices
const routes = require("./app/routes");

// Registering the api routes is done here
app.use('/', routes);

// Serve the files in the /views directory.
app.use(express.static('app/views'));

// ===========================================
// ROUTES ends here

// START SERVER HERE
// =============================

app.listen(port);
console.log("Server is currently running on port "+ port);
