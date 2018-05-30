const axios = require('axios');
const request = require('request');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { API_TOKEN } = require('./env/config.example.js');

const getRestaurantsIds = (requestObj, callback) => {
  // use API helper here to make a request to Yelp API to grab list of 50 restaurants by id
  // send back array of ids
  const { term } = requestObj;
  const { loc } = requestObj;

  const options = {
    // need to incorpirate term && location into this url somehow
    url: `https://api.yelp.com/v3/businesses/search?term=${term}&location=${loc}`,
    headers: {
      'User-Agent': 'request',
      Authorization: API_TOKEN,
    },
  };
  request.get(options, (error, response, body) => {
    if (error) {
      console.error(error);
    } else {
      callback(JSON.parse(body.business));
    }
  });
  // axios.get(options)
  //   .then((response) => {
  //     console.log(response.business);
  //     callback(response.businesses);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
};

const getRestaurantDetails = (restaurantId, callback) => {
  // use another api helper here to make a request to API to grab details of selected restaurant
  // send back restaurant data
  const options = {
    url: `https://api.yelp.com/v3/businesses/${restaurantId}`,
    headers: {
      'User-Agent': 'request',
      Authorization: API_TOKEN,
    },
  };
  request.get(options, (error, response, body) => {
    if (error) {
      console.error(error);
    } else {
      console.log(body);
      callback(JSON.parse(body));
    }
  });
  // axios.get(options)
  //   .then((restaurant) => {
  //     console.log(restaurant);
  //     callback(restaurant);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
};

module.exports = {
  getRestaurantsIds: getRestaurantsIds,
  getRestaurantDetails: getRestaurantDetails,
};
