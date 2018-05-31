const axios = require('axios');
const request = require('request');
const yelp = require('yelp-fusion');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
// const { API_TOKEN } = require('./env/config.example.js');

// const apiKey = API_TOKEN;
const apiKey = 'YTl6Wm-0stpU35hXMsQ3Vgq8Ryz0bXwC05a1UnEZpWXcVdi5rUgvZceURzfW_TlRCTuCHa1aqgaJd2_B36kAzlczzv6tt9uelElqY0HgmLt8P87BOm1IzwT0PokNW3Yx';
const client = yelp.client(apiKey);

const getRestaurantsIds = (searchObj, callback) => {

  const searchRequest = {
    // term : searchObj.term,
    loc : searchObj.loc,
  };

  client.search(searchRequest).then(response => {
    // need to get all business, and use proper search term
    const firstResult = response.jsonBody.businesses;
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
  }).catch(e => {
    console.log(e);
  });

};

const getRestaurantDetails = (restaurantIdObj, callback) => {

  // need to modify this to get the business details somehow
  client.search(restaurantIdObj).then(response => {
    console.log(response.jsonBody.businesses);
  }).catch(e => {
    console.log(e);
  });
};

module.exports = {
  getRestaurantsIds: getRestaurantsIds,
  getRestaurantDetails: getRestaurantDetails,
};


// THIS WAS THE TESTING for ABOVE FUNCTIONS

const searchRequest = {
  term: 'tacos',
  loc : 94203,
};

getRestaurantsIds(searchRequest, (returnResponse) => {
  console.log('in the test', returnResponse);
});


// const searchRequest2 = {
//   term:'Four Barrel Coffee',
//   loc : 'san francisco, ca',
 //  loc : 94203,
// };

// getRestaurantDetails(searchRequest2, (returnResponse) => {
//   console.log('in the test', returnResponse);
// });
