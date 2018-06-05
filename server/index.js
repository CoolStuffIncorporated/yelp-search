const chalk = require('chalk');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getRestaurants, getRestaurantDetails } = require('./apiHelpers');
const { saveRestaurantsGeneratedBySearch, saveFavoritesToDB, postFavoritesFromDB, deleteFavoritesFromDB, getFavoritesFromDB } = require('../database');

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
// app.get('/faves', (req, res) => {
//   // use database helper here
//   getFavoritesFromDB((err, res) => {
//     if (!err) {
//       console.log('res1', res);
//       res.send(res);
//     } else {
//       res.send(`ERROR: ${err}`);
//     }
//   });
// });


app.get('/faves', (req, res) => {
  // console.log('ANYTHING')
  getFavoritesFromDB((err, favoriteRestaurants) => {
    console.log('YAY SERVER', favoriteRestaurants);
    if (!err) {
      res.send(favoriteRestaurants);
    } else {
      console.error(`${err}`);
    }
  })
})


// input: an object containing Url and pic
// output: let user know item has been saved (save fave to db)
app.post('/faves', (req, res) => {
  console.log('req in post server', req);
  const data = req.body;
  postFavoritesFromDB(data, (faves, err) => {
    if (!err) {
      console.log('faves', faves);
      res.send(faves);
    } else {
      console.log(`${err}`);
    }
  });
});

// input: id of favorite restaurant 
// output: not really output, should remove fave from faveList
app.delete('/faves', (req, res) => {
  console.log(req.body)
  // use database helper here
  deleteFavoritesFromDB(req.query.id);
  console.log('deleted!');
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
  getRestaurantDetails(req.query.id)
  .then(data => res.send(data))
  .catch(err => res.send(err));
  // log(succ('Retrieved restaurant data and pics'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  log(succ('listening on port 3000!'));
});


// getRestaurants({term: 'tacos', loc: 10017})
// .then(restaurants => console.log('success'))
// .catch(err => console.log(err));