// create web server with express
var http = require('http'); // import http module
var express = require('express'); // import express module
var app = express(); // create express object
var server = http.createServer(app); // create server with express object
var path = require('path'); // import path module
var bodyParser = require('body-parser'); // import body-parser module
var mongoose = require('mongoose'); // import mongoose module
var Comment = require('./models/comment'); // import comment model
var port = 3000; // set port number
