const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String, 
        required: true, 
        unique: true, 
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    },
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNo: {type: String, required: true, unique: true, match: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/},
    carPlate: {type: String, required: true, unique: true, match: /([a-z]|[A-Z]|[0-9]){6}/},
    userImage: {type: String, required: false}
});

module.exports = mongoose.model('Ticket', ticketSchema);