//Miles Bonner 06/02/2017

var express = require('express');
var app = express();
var bodayParser = require('body-parser');
var mongoose = require('mongoose');

// connect to Mongo DB here
mongoose.connect('localhost:27017');
var Device = require("./app/models/devices");
var Profile = require("./app/models/devices");

// Configuring boday parser
app.use(bodayParser.urlencoded({ extended: true}));
app.use(bodayParser.json());


// Port for server is set here
var port = process.env.PORT || 8080;


// Routes start here
// ======================
// TODO - move routes into separate file

var router = express.Router();

// defining route for devices

router.route('/devices')
    // creating a devices
    .post(function(request, response){

        var device = new Device();
        device.model = request.body.model;
        device.manufacture = request.body.manufacture;
        device.profiles = [];

        device.save(function(error){
            if (error){
                response.send(error);
            }

            response.json({message:"device created"});
        });
    })

    // get all devices
    .get(function(request, response){
        Device.find(function(error, devices){
            if(error){
                response.send(error);
            }
            response.json(devices);
        });
    });

// Registering the api routes is done here
app.use('/api', router);


// ===========================================
// ROUTES ends here

// START SERVER HERE
// =============================

app.listen(port);
console.log("Server is currently running on port "+ port);
