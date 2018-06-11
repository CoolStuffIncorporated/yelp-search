const express = require('express');

// import chalk logging
const {
  log, succ, errc, warc, infoc,
} = require('../chalkpresets');

const router = express.Router();

// import db-helper methods for /faves route
const {
  getFaves, deleteFave, addFave, getOffset, updateOffset,
} = require('../database');

/* FAVES ROUTES LINK TO DATABASE */
router.get('/faves', (req, res) => {
  log(succ('Router successfully retrieved faves'));
  getFaves()
    .then(faves => res.send(faves))
    .catch((err) => res.sendStatus(404));
});

router.post('/faves', (req, res) => {
  log(succ(req.body));
  addFave(req.body.fave)
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

router.delete('/faves', (req, res) => {
  log(infoc(`Router received request to delete ${req.body.id}`));
  deleteFave(req.body.id)
    .then(data => res.send(data))
    .catch(err => res.status(400).send(err));
});


// import yelp-fusion api-helpers
const { getRestaurants, getRestaurantDetails } = require('./apiHelpers');

// @params: req.query -> passed in from front end
// axios.get('/restaurants, {params: {term, loc}}) call
// @output: an array with 50 restaurant objects,
// associated with id, filtered by location and foodType
router.get('/restaurants', (req, res) => {
  const { user, term, loc } = req.query;
  getOffset(user, term, loc).then(offset => {
    getRestaurants({ term, loc, offset })
      .then(restaurants => res.send({ restaurants, offset }))
      .catch(err => res.send(err));
  });
});

// input: id representing a specific restaurant
// output: an array of pics, description for given restaurant
router.get('/restaurant', (req, res) => {
  getRestaurantDetails(req.query.id)
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

router.put('/search', (req, res) => {
  const {
    user, term, loc, offset,
  } = req.body;
  updateOffset(user, term, loc, offset)
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

module.exports = router;
