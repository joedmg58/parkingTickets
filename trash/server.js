// server.js

// DEPENDENCIES MODULES
//==============================================
var mongoose = require('mongoose'); //MongoDB ORM
var bodyParser = require('body-parser');

// BASE SETUP
// ==============================================

var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;

// MIDDLEWARES
// ==============================================

//route middleware that will happen on every request
var router = express.Router();
router.use( function(req, res, next) {
    console.log(req.method, ' - ', req.url);
    next();
});
app.use(router);

//Body parsers
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); //JSON

// ROUTES
// ==============================================

const routes = require('./routes');
app.use(routes);


// START THE SERVER
// ==============================================
var server = app.listen(port, 'localhost', function() {
    const addr = server.address();
    console.log( new Date().toISOString() + ": Parking Tickets API Server started at: http://%s:%s", addr.address, addr.port);
});

// CONNECT TO MONGODB
// ==============================================
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/parkingTickets",
    { useNewUrlParser: true }
);
  
// mongoose connection
var mongooseConnection = mongoose.connection;
  
// Get the default connection
mongooseConnection.on(
    "error",
    console.error.bind(console, "MongoDB - connection error:")
);
  
mongooseConnection.once("open", function() {
    console.log("MongoDB - Successfully Connected to Database.");
});