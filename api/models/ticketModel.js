const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: {type: Date, required: true},
    location: {type: String, required: true},
    amount: {type: Number, required: true},
    ticketImage: {type: String, required: false}
});

module.exports = mongoose.model('Ticket', ticketSchema);
