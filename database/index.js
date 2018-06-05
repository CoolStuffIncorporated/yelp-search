const mongoose = require('mongoose');
const chalk = require('chalk');
const mlabAlon = 'mongodb://teamthor1:teamthor1@ds141320.mlab.com:41320/yelp-dev' //temp database
const mlab = 'mongodb://rose:rose00@ds141320.mlab.com:41320/yelptemp'

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
  id: { type: String, required: true },
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

const getFavoritesFromDB = (callback) => {
  Favorites.find({}, (err, favorites) => {
    callback(err, favorites);
  });
};

// input: id of the fave to delete
// output: n/a
const deleteFavoritesFromDB = (id) => {
  Favorites.findOneAndRemove({ id: id }, (err) => {
    if (!err) {
      console.log('deleted successfully!')
    } else {
      console.log('error, not deleted! Try again.')
    }
  });
};

// input: object containing fave url and pics
// output: let user know has been saved
const postFavoritesFromDB = (data, callback) => {
  console.log('data within db post', data);
  Favorites.create(data)
    .then((obj) => { callback(obj); })
    .catch((err) => { console.log(`error ${err}`); });
}; 

// should return a promisified array of 
const getFavoritedRestaurants = () => {
  Favorites.find({}, (err, res) => {
    if (!err) {
      res.exec();
    } else {
      console.log(`${err}`);
    }
  });
};

module.exports.getFavoritesFromDB = getFavoritesFromDB;
module.exports.postFavoritesFromDB = postFavoritesFromDB;
module.exports.deleteFavoritesFromDB = deleteFavoritesFromDB;
module.exports.getFavoritedRestaurants = getFavoritedRestaurants;
