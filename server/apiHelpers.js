const axios = require('axios');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { API_TOKEN } = require('./env/config.js').API_TOKEN; 

const getRestaurantsIds = (term, location, callback) => {
  // use API helper here to make a request to Yelp API to grab list of 50 restaurants by id
  // send back array of ids
  const options = {
    // need to incorpirate term && location into this url somehow
    url: `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`,
    headers: {
      'User-Agent': 'request',
      Authorization: API_TOKEN,
    },
  }
  axios.get('')
  .then(({data}) => {
    // console.log(response)
    callback(data);
  })
  .catch((err) => { 
    console.error(err);
  })
}

const getRestaurantDetails = (restaurantId, callback) => {
  // use another api helper here to make a request to API to grab details of selected restaurant
  // send back restaurant data
  const options = {
    url: `https://api.yelp.com/v3/businesses/${restaurantId}`,
    headers: {
      'User-Agent': 'request',
      Authorization: API_TOKEN,
    },
  }
  axios.get(options)
    .then(({data}) => {
      // console.log(response);
      callback(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  getRestaurantsIds: getRestaurantsIds,
  getRestaurantDetails: getRestaurantDetails,
};
