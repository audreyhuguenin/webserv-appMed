var express = require('express');
var resourcesRouter = express.Router();

// SOAP 

// get all resources
resourcesRouter.get('/', function(req, res, next) {
  var resource = { name: 'Audrey', role: "student", id: 1 };
  res.send(resource);
});

// get resource by id
resourcesRouter.get('/:id', function(req, res, next) {
  var resource = { name: 'Audrey', role: "student", id: 1 };
  res.send(resource);
});

module.exports = resourcesRouter;
