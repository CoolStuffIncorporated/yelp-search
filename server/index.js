const chalk = require('chalk');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getRestaurants, getRestaurantDetails } = require('./apiHelpers');
const { getFaves, deleteFave, addFave } = require('../database');

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

/* FAVES ROUTES LINK TO DATABASE */
app.get('/faves', (req, res) => {
  getFaves().then(faves => res.send(faves)).catch(err => res.sendStatus(404));
});

app.post('/faves', (req, res) => {
  addFave(req.body.fave)
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

app.delete('/faves', (req, res) => {
  deleteFave(req.body.id)
  .then(data => res.send(data))
  .catch(err => res.status(400).send(err));
});

// @params: req.query -> passed in from front end axios.get('/restaurants, {params: {term, loc}}) call
// @output: an array with 50 restaurant objects, associated with id, filtered by location and foodType
app.get('/restaurants', (req, res) => {
  const { term, loc } = req.query;
  getRestaurants({term, loc})
  .then(restaurants => res.send(restaurants))
  .catch(err => res.send(err));
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