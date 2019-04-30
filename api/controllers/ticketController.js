/**
 *  TICKET CONTROLLER
 */

const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');


//models
const Ticket = require('../models/ticketModel');
const User   = require('../models/userModel');


module.exports = {

    create: (req, res, next) => {

        User.findById(req.body.userId)
            .exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'User not found',
                    });
                }
    
                const ticket = new Ticket ({
                    _id: mongoose.Types.ObjectId(),
                    userId: user.id,
                    date: req.body.date,
                    location: req.body.location,
                    amount: req.body.amount,
                    ticketImage: req.body.ticketImage
                });
    
            return ticket
                .save()
                .then( result => {
                    res.status(201).json({
                        message: 'Ticket saved succesfully',
                        createdTicket: {
                            _id: result._id,
                            userId: result.userId,
                            date: result.date,
                            location: result.location,
                            amount: result.amount,
                            ticketImage: result.ticketImage,
                            request: {
                                type: 'GET',
                                urlpath: '/tickets' 
                            }
                        }
                    })
                })
                .catch( err => {
                    console.log(err);
                    res.status(500).json({error: err});
                });    
    
            })

    },

    getAll: (req, res, next) => {

        Ticket.find()
              .select('_id userId date location amount ticketImage')
              .exec()
              .then( tickets => {
                  const response = {
                      count: tickets.length,
                      tickets: tickets.map( ticket => {
                          return {
                              _id: ticket._id,
                              userId: ticket.userId,
                              date: ticket.date,
                              location: ticket.location,
                              amount: ticket.amount,
                              ticketImage: ticket.ticketImage,
                              request: {
                                  type: 'GET',
                                  urlpath: '/tickets/' + ticket._id
                              }
                          }
                      })
                  };
                  res.status(200).json(response);
              })
              .catch( err => {
                  res.status(500).json({error: err});
              });

    },

    getOne: (req, res, next) => {

        const id = req.params.id;

        Ticket.findById({_id: id})
              .select('_id userId date location amount ticketImage')
              .then( ticket => {
                if (ticket) {
                    res.status(200).json({
                        ticket: ticket,
                        request: {
                            type: 'GET',
                            urlpath: '/tickets'
                        }
                    });
                } else {
                    res.status(404).json({message: 'Ticket not found'});
                }
              })
              .catch( err => {
                res.status(500).json({error: err});  
              });

    },

    getAllOfUser: (req, res, next) => {

        const userId = req.params.userId;

        User.findById(userId)
            .exec()
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'User not found',
                    });
                }

                return Ticket.find({userId: userId})
                             .select('_id userId date location amount ticketImage')
                             .exec()
                             .then( tickets => {
                                const response = {
                                    count: tickets.length,
                                    tickets: tickets.map( ticket => {
                                        return {
                                            _id: ticket._id,
                                            userId: ticket.userId,
                                            date: ticket.date,
                                            location: ticket.location,
                                            amount: ticket.amount,
                                            ticketImage: ticket.ticketImage,
                                            request: {
                                                type: 'GET',
                                                urlpath: '/tickets'
                                            }
                                        }
                                    })
                                };
                                res.status(200).json(response);
                             })
                             .catch( err => {
                                 res.status(500).json({error: err});
                             });
                })


    },

    update: (req, res, next) => {

    },

    delete: (req, res, next) => {

    }

}