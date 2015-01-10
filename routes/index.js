var express       = require('express');
var router        = express.Router();
var plivo         = require('plivo');
var pjson         = require('../package.json');

//
// Plivo SMS API Construct
//
var SMSApi = plivo.RestAPI({
  authId: process.env.PGP_PLIVO_AUTH_ID,
  authToken: process.env.PGP_PLIVO_AUTH_TOKEN,
});

//  
// Root Routes
//

// GET Front
router.get('/', function(req, res) {

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ 
      id: 'SMSService',
      author: 'Louis Borsu',
      version: pjson.version
  }));
  
});

// POST SMS Message Sending
router.post('/sendmessage', function(req, res) {

  res.setHeader('Content-Type', 'application/json');

  if (typeof req.body.destination === 'undefined' || req.body.destination === '') {
    console.log('Destination not defined');
    res.end(JSON.stringify({ 
        succes: false,
        response: 'Destination not defined'
    }));
  } else if (typeof req.body.source === 'undefined' || req.body.source === '') {
    console.log('Source not defined');
    res.end(JSON.stringify({ 
        succes: false,
        response: 'Source not defined'
    }));
  } else if (typeof req.body.message === 'undefined' || req.body.message === '') {
    console.log('Message not defined');
    res.end(JSON.stringify({ 
        succes: false,
        response: 'Message not defined'
    }));
  } else {

    var params = {
      src: req.body.source,
      dst: req.body.destination,
      text: req.body.message,
    };

    SMSApi.send_message(params, function(status, response) {
      if (status >= 200 && status < 300) {
        console.log('Successfully send SMS to ' + params.dst);
        res.end(JSON.stringify({ 
          succes: true,
          response: response
        }));

      } else {
        console.log('FAILED to send SMS to ' + params.dst);
        res.end(JSON.stringify({ 
          succes: false,
          status: status,
          response: response
        }));
      }
    });
  } 
});



module.exports = router;
