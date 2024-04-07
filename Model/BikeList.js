// models/Bike.js
const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
    userid:String,
    brand: String,
    model: String,
    price: Number,
    imgs: String,
    location: String,
    shopName: String,
    phonenumber:Number
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;
