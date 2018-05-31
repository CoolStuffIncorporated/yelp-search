const mongoose = require('mongoose');
const chalk = require('chalk');
const mlab = 'mongodb://teamthor1:teamthor1@ds141320.mlab.com:41320/yelp-dev' //temp database

const log = console.log;
const succ = chalk.bold.green.bgWhite; // use to log success
const errc = chalk.bold.red.bgBlack; // UH OH
const warc = chalk.underline.orange; // log concerning but non-breaking
const infoc = chalk.blue.bgBlack; // log general information


let config;
try {
  config = require('../server/env/config.js').MONGO;
} catch (err) {
  config = process.env.MONGO;
}

// mongoose housekeeping
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO || mlab || 'mongodb://localhost');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  log(succ('Connected to Mongo database successfully'))
});

// if is_closed, don't store

const FavoritesSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  photos: [Array],
  display_phone: [String],
  location: [Object],
  price: [String],
  url: [String],
  image_url: [String],
  hours: [Array],
  rating: [Number],
  transactions: [Array],
  categories: [Array],
  // could also build a validator to forbid any entries where
  // "is_closed": true
});

const Favorites = mongoose.model('Favorites', FavoritesSchema);

const saveRestaurantsGeneratedBySearch = (restaurants) => { 
  return restaurants.forEach((restaurantObj) => {
    const restaurant = new Favorites(restaurantObj);
    log(succ(`Saved ${restaurant} to database`));
    return restaurant.save()
      .catch((err) => {
        console.log(err);
      });
  });
};

module.exports.saveRestaurantsGeneratedBySearch = saveRestaurantsGeneratedBySearch;
