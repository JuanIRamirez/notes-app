const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: { type: String, requied: true},
    email: { type: String, requied: true},
    password: { type: String, requied: true},
    date: {type: Date, default: Date.now}
});

userSchema.methods.encryptPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash( password, salt);
    return hash;
};

// userSchema.methods.findSimilarTypes = function(password) {
//     return mongoose.model('Animal').find({ type: this.type }, password);
//   };

// userSchema.method({ encryptPassword: async function(password) {
//         const salt = await bcrypt.genSalt(10);
//         const hash = bcrypt.hash(password, salt);
//         return hash;
//     }}) 

userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('Users', userSchema);