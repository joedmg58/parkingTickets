/**
 *  Check authorization middleware
 * 
 *  It looks for an authorization JWT on a http request header, and if is valid its allowed to continue on the route.
 * 
 *  The header name will be Authorization and the value will be Bearer <space> token....
 * 
 *  2018. Joed Machado. 
 */

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //here we will call next() if verify succeed, other way we return error and dont call next()

    try {
        const token = req.headers.authorization.split(' ')[1]; 
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}