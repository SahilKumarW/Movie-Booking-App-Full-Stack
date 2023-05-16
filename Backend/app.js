const express = require('express');
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserRouter = require('./routes/user.routes');
const AdminRouter = require('./routes/admin.routes');
const MovieRouter = require('./routes/movie.routes');
const BookingRouter = require('./routes/booking.routes');

dotenv.config();

const PORT = process.env.PORT || 4500

const cors = require('cors');
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// Middleware
app.use(express.json());
app.use("/user", UserRouter); 
app.use("/admin", AdminRouter);
app.use("/movie", MovieRouter);
app.use("/booking", BookingRouter);


mongoose.connect(`${process.env.DATABASE}`)

app.listen(PORT, () => {
    console.log(`Database connected.`);
})