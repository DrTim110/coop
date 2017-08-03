const express = require('express');
const request = require('request');
const passport = require('passport');

var public = express.Router();

public.get('/login', passport.authenticate('rally') , function(req,res){
  res.status(9001).send();
});

public.get('/rally-callback', passport.authenticate('rally'),
  function(req, res){
    res.redirect('/');
  }
);

public.post('/login/refresh', function (req, res, next) {
  request({
    method: 'POST',
    url: 'https://rally1.rallydev.com/login/oauth2/token',
    jar: false,
    form: {
      refresh_token: req.user.refreshToken,
      grant_type: 'refresh_token',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.SERVER_URL + '/rally-callback'
    }
  }, function (err, response, body) {
    body = JSON.parse(body);
    req.user.accessToken = body.access_token;
    req.user.refreshToken = body.refresh_token;

    res.status(200).send(req.user);
  });
});

public.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = public;