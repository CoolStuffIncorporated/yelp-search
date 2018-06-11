const yelp = require('yelp-fusion');
const { API_TOKEN } = require('./env/config.js');
const chalk = require('chalk');

let apiKey;
try {
  apiKey = require('./env/config.js').API_TOKEN;
} catch (err) {
  apiKey = process.env.TOKEN;
}


const client = yelp.client(apiKey);
// https://api.yelp.com/v3/businesses/search?term=burgers&location=10017&radius=20000&limit=50&open_now=true
// make call businesses/search using yelp-fusion.search
// https://www.yelp.com/developers/documentation/v3/business_search
const getRestaurants = (searchObj) => {
  // @params: searchObj(type: obj, example: {term: 'tacos', loc: 10017})
  const searchRequest = {
    term: searchObj.term,
    location: searchObj.loc,
    offset: searchObj.offset,
    limit: 50,
    open_now: true
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
  // console.log(chalk.green('Retrieved', (data.body)));
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
