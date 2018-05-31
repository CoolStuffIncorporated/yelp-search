const axios = require('axios');
const request = require('request');
const yelp = require('yelp-fusion');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { API_TOKEN } = require('./env/config.example.js');

const apiKey = API_TOKEN;
const client = yelp.client(apiKey);

const getRestaurantsIds = (searchObj, callback) => {

  const searchRequest = {
    term: searchObj.term,
    loc: searchObj.loc,
  };

  client.search(searchRequest)
    .then((response) => {
      const firstResult = response.jsonBody.businesses[0];
      const prettyJson = JSON.stringify(firstResult, null, 4);
      console.log(prettyJson);
    })
    .catch((e) => {
      console.log(e);
    });
};

const getRestaurantDetails = (restaurantIdObj, callback) => {
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
  getRestaurantsIds: getRestaurantsIds,
  getRestaurantDetails: getRestaurantDetails,
};
