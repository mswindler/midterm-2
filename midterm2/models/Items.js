var mongoose = require('mongoose');
var ItemSchema = new mongoose.Schema({
  name: String,
  quantity: {type: Number, default: 0},
  cost: Number,
});

ItemSchema.methods.upvote = function(cb) {
 this.quantity += 1;
 this.save(cb);
};

mongoose.model('Item', ItemSchema);
