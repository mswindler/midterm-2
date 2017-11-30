var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Item = mongoose.model('Item');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/admin.html', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});

router.get('/voter.html', function(req, res, next) {
  res.render('voter', { title: 'Express' });
});

router.get('/voting', function(req, res, next) {
  Item.find(function(err, votes) {
    if(err){ return next(err); }
    res.json(votes);
  });
});

router.post('/voting', function(req, res, next) {
  var vote = new Vote(req.body);
  vote.save(function(err, vote){
    if(err){ return next(err); }
    res.json(vote);
  });
});

router.param('vote', function(req, res, next, id) {
  var query = Vote.findById(id);
  query.exec(function (err, vote) {
    if(err) {return next(err); }
    if(!vote) {return next(new Error("I can't find that item")); }
    req.vote = vote;
    return next();
  });
});

router.get('/voting/:vote', function(req, res) {
  res.json(req.vote);
});

router.put('/voting/:vote/upvote', function(req, res, next) {
  req.vote.upvote(function(err, vote) {
    if(err) { return next(err) }
    res.json(vote);
  });
});

router.delete('/voting/:vote', function(req, res) {
  console.log("in Delete");
  req.vote.remove();
  res.json(req.vote);
});



module.exports = router;
