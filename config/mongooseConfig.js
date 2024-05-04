const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl)
.then(() => {
    console.log('Database connected!');
})
.catch((err) => {
    console.log('Error connecting to database : ', err);
})

module.exports = mongoose;