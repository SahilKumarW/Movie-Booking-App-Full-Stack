const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: 'string',
        required: true
    },

    email: {
        type: 'string',
        required: true,
        unique: true
    },

    password: {
        type: 'string',
        required: true,
        minLength: 6
    },

    bookings: [{
        type: mongoose.Types.ObjectId,
        ref: 'Booking',
    }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;