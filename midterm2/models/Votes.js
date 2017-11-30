
var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    imageUrl: String,
    quantity: Number
});

ItemSchema.methods.incrementNumberOrdered = function (cb) {
    this.quantity += 1;
    this.save(cb);
};


mongoose.model('Item', ItemSchema);
