const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Result = require('./models/models');
const routes = require('./routes/routes');

//bring in dotenv variables
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const URI = process.env.DB_URI;
//const URI = 'mongodb://localhost/kaplanFfl'
console.log(URI)

mongoose.Promise = global.Promise;

//open the connection to the database
const conn = mongoose.connect(URI, {
  useMongoClient: true,
  keepAlive: true
})

//easy debugging
mongoose.set('debug', true);

//add middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//handle events from DB opening
conn.on('error', console.error.bind(console, 'Connection error: '));
conn.once('open', function() {
	console.log('Connection to MongoDB is live. Database: ' + conn.name);
})

//pull in routes from routes.js
routes(app);


//start web server
app.listen(PORT, (req, res) => {
	console.log('Server live on port ' + PORT);
});

