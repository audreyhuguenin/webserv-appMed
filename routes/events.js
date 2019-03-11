require('dotenv/config');
var express = require('express');
var request = require('request');
var eventsRouter = express.Router();


// get all events
eventsRouter.get('/', function(req, res, next) {

let options = {
    url: process.env.API_EVENTS_URL + '',
    method: 'GET'
}

request(options, (err, response, body) => {
    if(!err && response.statusCode == 200)
      res.send("Nombre de pokémon existants: "+ JSON.parse(body).count);
        
});

});

// get event by id
eventsRouter.get('/:id', function(req, res, next) {

 let options = {
    url: process.env.API_EVENTS_URL + '/'+ req.params.id,
    method: 'GET'
}

request(options, (err, response, body) => {
    if(!err && response.statusCode == 200)
        res.send(JSON.parse(body).forms[0].name);
});
});

module.exports = eventsRouter;
