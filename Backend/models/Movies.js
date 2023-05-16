const mongoose = require('mongoose');
const MovieSchema = new mongoose.Schema({
    title: {
        type: 'String',
        required: true
    },

    description: {
        type: 'String',
        required: true
    },

    releaseDate: {
        type: 'Date',
        required: true
    },

    actors: [{
        type: 'String',
        required: true
    }],

    posterURL: {
        type: 'String',
        required: true
    },

    featured: {
        type: 'Boolean',
        required: true
    },

    bookings: [{
        type: mongoose.Types.ObjectId,
        ref: "Booking"
    }],
    
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'admin',
        required: true
    }
});

const Movies = mongoose.model('Movie', MovieSchema);
module.exports = Movies;