var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;
//const mongoose = require('mongoose');
//const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: { type: String, requied: true},
    email: { type: String, requied: true},
    password: { type: String, requied: true},
    date: {type: Date, default: Date.now}
},{
    methods: {
        // (1)
        async encryptPassword(password) {
            const salt = await bcrypt.genSalt(10);
            const hash = bcrypt.hash( password, salt);
            return hash;
        },
        // (2)
        matchPassword(password) {
            return bcrypt.compare(password, this.password);
        }
    }
});

// (1)
// userSchema.methods.encryptPassword = async function(password) {
//     const salt = await bcrypt.genSalt(10);
//     const hash = bcrypt.hash( password, salt);
//     return hash;
// };

// (2)
// userSchema.methods.matchPassword = async function(password) {
//     return await bcrypt.compare(password, this.password);
// }

module.exports = mongoose.model('Users', userSchema);
