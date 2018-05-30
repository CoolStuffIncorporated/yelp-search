const axios = require('axios');
const request = require('request');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { API_TOKEN } = require('./env/config.example.js');

const getRestaurantsIds = (requestObj, callback) => {
  const { term } = requestObj;
  const { loc } = requestObj;

  const options = {
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
