const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model

const SessionSchema = new Schema({
    seshId: String
});

const Session = mongoose.model('session', SessionSchema);

module.exports = Session;