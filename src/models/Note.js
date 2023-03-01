const mongoose = require('mongoose');
const {Schema} = mongoose;

const NoteSchema = new Schema({
    title: {type: String, Required: true},
    description: {type: String, Required: true},
    date: {type: Date, default: Date.now},
    user: {type: String, Required: true}
});

module.exports = mongoose.model('Notas', NoteSchema);