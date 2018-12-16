const db = require("../models");

module.exports = {

    //return all user in a collection
    findAll: function(req, res) {
        db.User
            .find({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },

    //find a user with a given ID
    findById: function(req, res) {
        db.User
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },

    //find a user with a given e-mail and password 
    findByEmail: function(req, res) {
        db.User
            .find({email: req.body.email, password: req.body.password}, {role:1})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },

    //creates a new user
    create: function(req, res) {
        db.User
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },

    //update a user with a given ID  
    update: function(req, res) {
        db.User
          .findOneAndUpdate({ _id: req.params.id }, req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },

    //delete a user with a given ID  
    remove: function(req, res) {
        db.User
          .findById({ _id: req.params.id })
          .then(dbModel => dbModel.remove())
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      }

}