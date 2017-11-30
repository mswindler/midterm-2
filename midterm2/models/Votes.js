var mongoose = require('mongoose');
var VoteSchema = new mongoose.Schema({
  name: String,
  quantity: {type: Number, default: 0},
  cost: Number,
});

VoteSchema.methods.upvote = function(cb) {
 this.quantity += 1;
 this.save(cb);
};

mongoose.model('Vote', VoteSchema);
