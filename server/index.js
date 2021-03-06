const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');


// import chalk logging
const {
  log, succ, errc, warc, infoc,
} = require('./chalkpresets');

// EXPRESS SETUP
// const https = require('https'); uncomment for https
// const fs = require('fs'); uncomment for https
// be sure to also uncomment https.createServer at bottom of file

const app = express();

app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(compression())
  .use(morgan('tiny'))
  .use((express.static(path.join(__dirname, '/../client/dist'))));

/* FAVES ROUTES LINK TO DATABASE */
// import mongoose helper methods
const {
  getFaves, deleteFave, addFave, getOffset, updateOffset,
} = require('../database');

app.get('/faves', (req, res) => {
  getFaves().then(faves => res.send(faves)).catch(err => res.sendStatus(404));
});

app.post('/faves', (req, res) => {
  log(succ(req.body));
  addFave(req.body.fave)
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

app.delete('/faves', (req, res) => {
  deleteFave(req.body.id)
    .then(data => res.send(data))
    .catch(err => res.status(400).send(err));
});

// import yelp-fusion api helper methods
const { getRestaurants, getRestaurantDetails } = require('./apiHelpers');

// @params: req.query -> passed in from front end
// axios.get('/restaurants, {params: {term, loc}}) call
// @output: an array with 50 restaurant objects,
// associated with id, filtered by location and foodType
app.get('/restaurants', (req, res) => {
  const { user, term, loc } = req.query;
  getOffset(user, term, loc).then(offset => {
    getRestaurants({ term, loc, offset })
      .then(restaurants => res.send({restaurants, offset}))
      .catch(err => res.send(err));
  });
});


// input: id representing a specific restaurant
// output: an array of pics, description for given restaurant
app.get('/restaurant', (req, res) => {
  getRestaurantDetails(req.query.id)
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

app.put('/search', (req, res) => {
  const {user, term, loc, offset} = req.body;
  updateOffset(user, term, loc, offset)
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  log(succ(`Port ${port} is lit fam 🔥 🔥 🔥`));
});

// uncomment for https
// key and cert files available on Google Drive
// placein env folder
// https.createServer({
//   key: fs.readFileSync(path.join(__dirname, './env/server.key')),
//   cert: fs.readFileSync(path.join(__dirname, './env/server.cert')),
// }, app)
//   .listen(3000, () => {
//     console.log(`Port ${port} is lit fam 🔥 🔥 🔥`);
//   });

module.exports = app;

// rose test case
// getRestaurants({term: 'tacos', loc: 10017})
// .then(restaurants => console.log('success'))
// .catch(err => console.log(err));
