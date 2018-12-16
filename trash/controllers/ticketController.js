const db = require("../models");

module.exports = {

    //return tickets of a given user ID
    findByUserId: function(req, res) {
        db.User
            .find({_id: req.params.userId}, {tickets: 1})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },

     //creates a new ticket for a given user id
     create: function(req, res) {
        db.User
            .findOneAndUpdate({ _id: req.params.userId }, {$push:{tickets: req.body}})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
      },

    //update a ticket for a given user id and a ticket index
    update: function(req, res) {
        const ticketIndex = '"tickets.'+ req.params.ticketIndex + '"'; 
        db.User
          .findOneAndUpdate({ _id: req.params.userId }, {$set:{ticketIndex: req.body.values}})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },

    remove: function(req, res) {
        res.json({"message": 'Nothing yet'});
    }

}