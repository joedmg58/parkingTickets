/**
 *  E X P R E S S  S E R V E R   A P P
 * 
 *  2018. Joed Machado
 * 
 */

const express       = require('express');
const app           = express();
const logger        = require('morgan');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose'); //mongodb://<dbuser>:<dbpassword>@ds135704.mlab.com:35704/ptrdb

const userRoutes    = require('./api/routes/users')

//Adding logger middleware
app.use(logger('dev'));

//A middleware to make the folder upload available for public (static route)
app.use('/uploads', express.static('public/uploads'));

//Another static route for testing, public content html code
app.use('/', express.static('public'));

//Adding body parser middleware;
app.use(bodyParser.urlencoded({extended: false})); //to parse url encoded
app.use(bodyParser.json()); //to parse json

//Handling CORS (Croos-Origin Resource Sharing). Its allow request from other origin, other server where the client recides
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");   // * means all origins, you can put only an origin or a few like http://thisorigin.com
    res.header(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-Width, Content-Type, Accept, Authorization" //you can put * here too
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next(); //for non blocking our requests
});

//Routes to handle request
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

//Handling any error route (should be in this order, after routes, after logger)
app.use((req, res, next) =>{
    const error = new Error('Resource not found or incorrect route' );
    error.status = 404;
    next(error);
});

//Handling any error on the application, for example database errors
app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});


/*
app.use((req, res, next) => {   //use invoke all middleware, al request pass through the stacks of functions defined in use
    res.status(200).json({
        message: 'It works!'
    });
});
*/

//Connect to MongoDB
mongoose.connect(
    'mongodb://' + 
    process.env.MONGO_DB_USR + 
    ':' + process.env.MONGO_DB_PWD  + 
    '@ds241658.mlab.com:41658/node-rest-shop', {useNewUrlParser: true}
    );

module.exports = app;