const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        set: function (email) {
            return email.toLowerCase();
        }
    },
    Phone: {
        type: Number
    },
    password: {
        type: String
    }

},{timestamps: true});

const users = mongoose.model('users',userSchema);
module.exports = users;