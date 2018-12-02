const db = require("../models");

module.exports = {

    //return tickets of a given user ID
    findTicketsByUserId: function(req, res) {
        dbUser
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    }

}