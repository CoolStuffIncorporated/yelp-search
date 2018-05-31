const chalk = require('chalk');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getRestaurants, getRestaurantDetails } = require('./apiHelpers');
// const { saveFavoritesToDB, getFavoritesFromDB, deleteFavoritesFromDB } = require('../database/databaseHelpers');
// const { saveRestaurantsGeneratedBySearch } = require('../database');
// those two imports above were crashing the build, so I've commented them out for now because I can't go into the files if someone else is working on it
// TODO: Fix your file paths and imports

/* we should straighten out if we want API_KEY or API_TOKEN
we refer to both here and in */

// let API_TOKEN;
// try {
//   API_TOKEN = require('./env/config.js').API_KEY;
// } catch (err) {
//   API_TOKEN = process.env.API_KEY;
// }

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
  const favoriteRestaurants = getFavoritesFromDB();
  res.send(favoriteRestaurants);
});


// input: an object containing Url and pic
// output: let user know item has been saved (save fave to db)
app.post('/faves', (req, res) => {
  const data = req.body;
  // use database helper here
  const saveRestaurantsPromise = saveRestaurantsGeneratedBySearch(data);
  saveRestaurantsPromise.then((savedRestaurants) => {
    res.send('successfully added restaurant to faves!');
  })
    .catch((err) => { console.log(err); });
  // log(succ('successfully added restaurant to faves!'));
  // res.send('successfully added restaurant to faves!');
});

// input: id of favorite restaurant 
// output: not really output, should remove fave from faveList
app.delete('/faves', (req, res) => {
  // use database helper here
  deleteFavoritesFromDB(id);
  log(succ('deleted restaurant from faves!'));
  res.send('deleted restaurant from faves!');
});

// @params: req.query -> passed in from front end axios.get('/restaurants, {params: {term, loc}}) call
// @output: an array with 50 restaurant objects, associated with id, filtered by location and foodType
app.get('/restaurants', (req, res) => {
  const { term, loc } = req.query;
  getRestaurants({term, loc})   // use API helper here to make a request to Yelp API to grab list of 50 restaurants
  // getRestaurants({term: 'tacos', loc: 10017})
  .then(restaurants => res.send(restaurants))
  .catch(err => res.send(err));
  // log(succ('Retrieved restaurant ids')); sorry about your chalk, Charlie!
});

// input: id representing a specific restaurant 
// output: an array of pics, description for given restaurant  
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


getRestaurants({term: 'tacos', loc: 10017})
.then(restaurants => console.log(restaurants))
.catch(err => console.log(err));