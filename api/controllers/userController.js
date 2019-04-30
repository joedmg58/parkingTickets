/**
 *  USER CONTROLLER
 */

const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');


//models
const User = require('../models/userModel');


module.exports = {

    signup: (req, res, next) => {

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
                            password: hash,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            phoneNo: req.body.phoneNo,
                            carPlate: req.body.carPlate,
                            userImage: req.file.path
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
        });

    },

    login: (req, res, next) => {

        console.log(req.body.email, req.body.password);
        
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
    },

    getAll: (req, res, next) => {

        User.find()
            .select('_id firstName lastName email phoneNo carPlate userImage')
            .then( users => {
                const response = {
                    count: users.length,
                    users: users.map( user => {
                        return {
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            phoneNo: user.phoneNo,
                            carPlate: user.carPlate,
                            userImage: user.userImage,
                            request: {
                                type: 'GET',
                                urlPath: '/user/' + user._id
                            }
                        }
                    })
                };

                res.status(200).json(response);

            })
            .catch();

    },

    getOne: (req, res, next) => {

        const id = req.params.userId;

        User.findById(id)
            .select('_id firstName lastName email phoneNo carPlate userImage')
            .exec()
            .then(user => {
                if (user) {
                    res.status(200).json({
                        user: user,
                        request: {
                            type: 'GET',
                            urlpath: '/user'
                        }
                    });
                } else {
                    res.status(404).json({message: 'User not found'});
                }
            })
            .catch(err => {
                res.status(500).json({error: err});
            });

    },

    updateOne: (req, res, next) => {

        const id = req.params.userId;

        User.update({_id:id}, { $set:{
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNo: req.body.phoneNo,
            carPlate: req.body.carPlate,
            userImage: req.body.userImage 
        }})
            .exec()
            .then( result => {
                console.log(result);
                res.status(200).json(result)
            })
            .catch( err => {
                console.log(err);
                res.status(500).json({error:err});
            });

    },

    deleteOne: (req, res, next) => {

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
    
    }

}