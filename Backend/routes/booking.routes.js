const express = require('express');
const BookingRouter = express.Router();

const { Booking, deleteBooking } = require('../controller/booking-controller');

BookingRouter.post("/", Booking);
BookingRouter.delete('/:id', deleteBooking);
 
module.exports = BookingRouter; 