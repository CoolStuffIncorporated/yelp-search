const axios = require('axios');
const request = require('request');
const yelp = require('yelp-fusion');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { API_TOKEN } = require('./env/config.js');

let apiKey;
try {
  apiKey = require('./env/config.js').API_TOKEN;
} catch(err) {
  apiKey = process.env.TOKEN;
}


const client = yelp.client(apiKey);

// make call businesses/search using yelp-fusion.search
const getRestaurants = (searchObj) => { //@params: searchObj(type: obj, example: {term: 'tacos', loc: 10017})
  const searchRequest = {
    term: searchObj.term,
    location: searchObj.loc,
  };
  return client.search(searchRequest)
  .then(data => data.jsonBody.businesses)  //@output: a promise with an array of the businesses
};

const getRestaurantDetails = (restaurantIdObj) => {
  client.search(restaurantIdObj)
    .then((response) => {
      const firstResult = response.jsonBody.businesses[0];
      const prettyJson = JSON.stringify(firstResult, null, 4);
      console.log(prettyJson);
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = {
  getRestaurants: getRestaurants,
  getRestaurantDetails: getRestaurantDetails,
};


/* TEST CALLS */
getRestaurants({term: 'tacos', loc: 10017})
.then(businesses => console.log(businesses))  // shows an array of the businesses

////// teammates' removed code, saved below just in case
    // .then((response) => {
    //   const firstResult = response.jsonBody.businesses[0];
    //   const prettyJson = JSON.stringify(firstResult, null, 4);
    //   console.log(prettyJson);
    // })
    // .then(data => console.log(data.jsonBody))
    // .catch((e) => {
    //   console.log(e);
    // });