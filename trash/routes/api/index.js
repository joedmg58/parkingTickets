const router        = require('express').Router();
const userRoute     = require('./userRoute');
const locationRoute = require('./locationRoute');
const ticketRoute   = require('./ticketRoute');
const loginRoute    = require('./loginRoute');

//api routes
router.use('/users', userRoute);                //using route /api/users
router.use('/locations', locationRoute);        //using route /api/locations
router.use('/tickets', ticketRoute);
router.use('/login', loginRoute);               //using route /api/login

module.exports = router;
