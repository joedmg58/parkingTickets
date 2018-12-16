const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');

const User      = require('../models/userModel');
const checkAuth = require('../middleware/check-auth'); //middleware to check token and allow access

//Register new user
router.post('/signup', (req, res, next) => {

    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                res.status(409).json({
                    message: 'Email already exist'
                });
            } else {
                bcrypt.hash( req.body.password, 10, (err, hash) => { //10 is the number of round to salt the password, ramdomly added strings
                    if(err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
            
                        user.save()
                            .then( user => {
                                res.status(201).json({
                                    message: 'User created succefully',
                                    createdUser: {
                                        id: user._id
                                    }
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            });
                    }
                } );
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

//Login an existing user
router.post('/login', (req, res, next) => {

    console.log(req.body.email, ' - ', req.body.password);

    User.findOne({email: req.body.email})   //findOne return no object if no existing user, find return an empty array
        .exec()
        .then(user => {
            if ( (!user) || (user.length < 1) ) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    }); 
                } 

                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: '1h'
                    });

                    return res.status(200).json({
                        message: 'Auth granted',
                        token: token
                    });
                }

                res.status(401).json({
                    message: 'Auth failed'
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


//Delete an existing user
router.delete('/:userId', checkAuth, (req, res, next) => {

    User.deleteOne({_id: req.params.userId})
        .exec()
        .then(user => {
            res.status(200).json({
                message: 'User deleted succesfully'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});

module.exports = router;