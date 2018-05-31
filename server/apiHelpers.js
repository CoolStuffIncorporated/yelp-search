const axios = require('axios');
const request = require('request');
const yelp = require('yelp-fusion');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { API_TOKEN } = require('./env/config.js');
const chalk = require('chalk');

let apiKey;
try {
  apiKey = require('./env/config.js').API_TOKEN;
} catch (err) {
  apiKey = process.env.TOKEN;
}


const client = yelp.client(apiKey);

// make call businesses/search using yelp-fusion.search
// https://www.yelp.com/developers/documentation/v3/business_search
const getRestaurants = (searchObj) => {
  // @params: searchObj(type: obj, example: {term: 'tacos', loc: 10017})
  const searchRequest = {
    term: searchObj.term,
    location: searchObj.loc,
  };
  return client.search(searchRequest)
    .then(data => data.jsonBody.businesses)
  // @output: a promise with an array of the businesses
    .catch((err) => {
      console.log(chalk.bold.red('Encoutered error requesting restaurants from Yelp', err));
    });
};

// make call to businesses/{id} using yelp-fusion.business
// https://www.yelp.com/developers/documentation/v3/business
const getRestaurantDetails = restaurantId => client.business(restaurantId).then((data) => {
  console.log(chalk.green('Retrieved', (data.body)));
  return data.body;
}).catch((err) => {
  console.log(chalk.bold.red('Encountered error requesting restaurant details from Yelp', err));
});

module.exports = {
  getRestaurants: getRestaurants,
  getRestaurantDetails: getRestaurantDetails,
};


/* TEST CALLS */
// getRestaurants({term: 'tacos', loc: 10017})
// .then(businesses => console.log(businesses))  // shows an array of the businesses

// //// teammates' removed code, saved below just in case
// .then((response) => {
//   const firstResult = response.jsonBody.businesses[0];
//   const prettyJson = JSON.stringify(firstResult, null, 4);
//   console.log(prettyJson);
// })
// .then(data => console.log(data.jsonBody))
// .catch((e) => {
//   console.log(e);
// });

// const getRestaurantDetails = (restaurantIdObj) => {
//   client.search(restaurantIdObj)
//     .then((response) => {
//       const firstResult = response.jsonBody.businesses[0];
//       const prettyJson = JSON.stringify(firstResult, null, 4);
//       console.log(prettyJson);
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };


// const testId = 'SULHf6nGQ8sK0UpG1XU30w';
// // getRestaurantDetails(testId).then(data => console.log(data));
// // console.log(getRestaurantDetails(testId));
// getRestaurantDetails(testId)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));
