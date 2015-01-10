#!/usr/bin/env node
var debug = require('debug')('SMS_Service');
var app = require('./app');

// Start the server.
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
 	ip   = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
app.listen(port, ip);
