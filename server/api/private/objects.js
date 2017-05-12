const express = require('express');
const rally = require('rally');
const queryUtils = rally.util.query;

const objects = express.Router();

objects.get('/:type/:id', function(req,res){
  const restApi = rally({
    apiKey: req.user.accessToken
  });
  restApi.query({
    type: req.params.type, //the type to query
    start: 1, //the 1-based start index, defaults to 1
    limit: Infinity, //the maximum number of results to return- enables auto paging
    fetch: ['FormattedID', 'Name', 'Children'],
    query: queryUtils.where('FormattedID', '=', req.params.id)
  }, function(err,result){
    if(err){
      res.status(500).send(err);
    } else {
      res.status(200).send(result.Results);
    }
  });
});

objects.get('/:parentId/children/:childType', function(req,res){
  const restApi = rally({
    apiKey: req.user.accessToken
  });
  restApi.query({
    type: req.params.childType, //the type to query
    start: 1, //the 1-based start index, defaults to 1
    limit: 2, //the maximum number of results to return- enables auto paging
    fetch: ['FormattedID', 'Name', 'Children'],
    query: queryUtils.where('Parent.FormattedID', '=', req.params.parentId)
  }, function(err,result){
    if(err){
      res.status(500).send(err);
    } else {
      res.status(200).send(result.Results);
    }
  });
});

module.exports = objects;