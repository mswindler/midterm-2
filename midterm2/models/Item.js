
var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    imageUrl: String,
    numberOrdered: Number,
});

ItemSchema.methods.incrementNumberOrdered = function (cb) {
    this.numberOrdered++;
    this.save(cb);
};


mongoose.model('Item', ItemSchema);
