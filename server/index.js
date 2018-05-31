const chalk = require('chalk');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getRestaurantsIds, getRestaurantDetails } = require('./apiHelpers');
const { save } = require('../database');

/* we should straighten out if we want API_KEY or API_TOKEN
we refer to both here and in */

let API_TOKEN;
try {
  API_TOKEN = require('./env/config.example.js').API_KEY;
} catch (err) {
  API_TOKEN = process.env.API_KEY;
}

const searchRequest = {
  term: 'Four Barrel Coffee',
  location: 'san francisco, ca',
};

// chalk logging
const log = console.log;
const succ = chalk.bold.green.bgWhite; // use to log success
const errc = chalk.bold.red.bgBlack; // UH OH
const warc = chalk.underline.orange; // log concerning but non-breaking
const infoc = chalk.blue.bgBlack; // log general information

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

// input: n/a
// output: an array of objects containing favorited restaurants (image and url associated with)
app.get('/faves', (req, res) => {
  // use database helper here
  
  res.send('received your request to get faves!');
});


// input: an object containing Url and pic
// output: let user know item has been saved (save fave to db)
app.post('/faves', (req, res) => {
  const data = req.body;
  // use database helper here
  save(data);
  log(succ('successfully added restaurant to faves!'));
  res.send('successfully added restaurant to faves!');
});

// input: id of favorite restaurant 
// output: not really output, should remove fave from faveList
app.delete('/faves', (req, res) => {
  // use database helper here
  log(succ('deleted restaurant from faves!'));
  res.send('deleted restaurant from faves!');
});

// input: array of objects, where each object reps a given restaurant
// output: an array with 50 restaurant objects, filtered by location and foodType
app.get('/restaurants', (req, res) => {
  const { term, loc } = req.body;
  // use API helper here to make a request to Yelp API to grab list of 50 restaurants by id
  // send back array of ids
  log(succ('Retrieved restaurant ids'));
  res.send('here\'s your list of restaurant ids');
});

// input: object representing a specific restaurant 
// output: id for the given restaurant 
app.get('/restaurant', (req, res) => {
  const { id } = req.body;
  // use another api helper here to make a request to API to grab details of selected restaurant
  // send back restaurant data
  log(succ('Retrieved restaurant data and pics'));
  res.send('here\'s your restaurant data with the pics too');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  log(succ('listening on port 3000!'));
});
