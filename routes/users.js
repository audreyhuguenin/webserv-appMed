var express = require('express');
require('dotenv/config');

var router = express.Router();

var soap = require('soap');
  var url = process.env.NAV_API_URL;
  

        

/* GET users listing. */
router.get('/', function(req, res, next) {

  var args = {
    sCountryISOCode: 'CH'
  }

  soap.createClient(url, function(err, client) {
      
    client.CapitalCity(args, function(err, soapResult, body) {
      if(err) throw(err);
      console.log(soapResult);
      res.send(JSON.stringify(soapResult.CapitalCityResult));
});

if(err) throw new Error(err);
});

});

/* GET users listing. */
router.get('/listLanguages', function(req, res, next) {


  var args = { };

  soap.createClient(url, function(err, client) {
      
    client.ListOfLanguagesByCode(args, function(err, result, rawResponse, soapHeader, rawRequest) {
      if(err) throw(err);
      console.log(result.ListOfLanguagesByCodeResult.tLanguage[0]);
      //res.send(result);
});

if(err) throw new Error(err);
});

});

/* GET users listing. */
router.get('/:isoCode', function(req, res, next) {


  var args = {sCountryISOCode: req.params.isoCode};  

  soap.createClient(url, function(err, client) {
      
    client.FullCountryInfo(args, function(err, result, rawResponse, soapHeader, rawRequest) {
      if(err) throw(err);
      console.log(result);
      res.send(result);
});

if(err) throw new Error(err);
});

});


module.exports = router;
