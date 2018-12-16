/**
 *  H T T P  S E R V E R 
 * 
 *  2018. Joed Machado
 * 
 */

const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app); //creates server

server.listen(port); //start server listening at port