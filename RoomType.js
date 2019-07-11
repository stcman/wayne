const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model

const InventorySchema = new Schema({
    date: Number,
    avail: Number
});

const RoomTypeSchema = new Schema({
    name: String,
    roomType: String,
    description: String,
    price: Number,
    image: String,
    dates: [InventorySchema]
});

const RoomType = mongoose.model('roomtype', RoomTypeSchema);

module.exports = RoomType;