var express = require('express');
var Entry = require('../models/entry');
var router = express.Router();
// var Entry = require('../models/entry');

router.route('/')
  .get(function(req, res) {
    Entry.find(function(err, entries) {
      if (err) return res.status(500).send(err);
      res.send(entries);
    });
  })
  .post(function(req, res) {
    Entry.create(req.body, function(err, entry) {
      if (err) return res.status(500).send(err);
      res.send(entry);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Entry.findById(req.params.id, function(err, entry) {
      if (err) return res.status(500).send(err);
      res.send(entry);
    });
  })
  .put(function(req, res) {
    Entry.findByIdAndUpdate(req.params.id, req.body.entry, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  })
  .delete(function(req, res) {
    Entry.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
      // make secure
    });
  });


module.exports = router;