var express = require('express');
var User = require('../models/user');
var Entry = require('../models/entry');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err) return res.status(500).send(err);
      res.send(users);
    });
  })
  .post(function(req, res) {
    User.create(req.body, function(err, user) {
      if (err) return res.status(500).send(err);
      res.send(user);
    });
  });

router.get('/:name', function(req, res) {
  console.log(req.params);
  User.findOne({username: req.params.name}, function(err, user) {
    if (err) return res.status(500).send(err);
    res.send(user);
  });
});

router.get('/:name/entries', function(req, res) {
  console.log(req.params);
  Entry.find({user: req.params.name}, function(err, entries) {
    if (err) return res.status(500).send(err);
    res.send(entries);
  });
});

module.exports = router;