const express = require('express');
const objects = require('./objects.js');

var private = express.Router();

private.get('/test', function(req,res){
  res.status(200).send('true');
});

private.get('/user', function(req,res){
  res.status(200).send({
    FirstName: req.user.FirstName,
    LastName: req.user.LastName,
    user: req.user
  });
});

private.use('/object', objects);

module.exports = private;